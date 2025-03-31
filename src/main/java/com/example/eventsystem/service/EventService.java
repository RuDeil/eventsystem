package com.example.eventsystem.service;

import com.example.eventsystem.dto.EventDTO;
import com.example.eventsystem.exception.ResourceNotFoundException;
import com.example.eventsystem.model.Event;
import com.example.eventsystem.model.User;
import com.example.eventsystem.repository.EventRepository;
import com.example.eventsystem.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EventService {
    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    public List<EventDTO> getAllOpenEvents() {
        User user = getCurrentUser();
        return eventRepository.findByStatus("OPEN").stream()
                .map(event -> convertToDto(event, user)) // isRegistered=false по умолчанию
                .collect(Collectors.toList());
    }

    public List<EventDTO> getAllEvents() {
        User user = getCurrentUser();
        return eventRepository.findAll().stream()
                .map(event -> convertToDto(event, user)) // Для админа isRegistered=false
                .collect(Collectors.toList());
    }

    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    // Метод для получения мероприятий пользователя
    public List<EventDTO> getMyEvents() {
        User user = getCurrentUser();
        return eventRepository.findByParticipantsContaining(user).stream()
                .map(event -> convertToDto(event, user))
                .collect(Collectors.toList());
    }

    // Метод для созданных мероприятий
    public List<EventDTO> getCreatedEvents() {
        User user = getCurrentUser();
        return eventRepository.findByCreatedBy(user).stream()
                .map(event -> convertToDto(event, user))
                .collect(Collectors.toList());
    }


    @Transactional
    public EventDTO createEvent(Event event, User user) {
        event.setCreatedBy(user);
        Event savedEvent = eventRepository.save(event);
        return convertToDto(savedEvent, user);
    }

    public EventDTO updateEvent(Long id, Event eventDetails) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found"));

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!event.getCreatedBy().getId().equals(user.getId()) && !user.getRole().equals("ADMIN")) {
            throw new RuntimeException("You are not authorized to update this event");
        }

        event.setEventDate(eventDetails.getEventDate());
        event.setLocation(eventDetails.getLocation());
        event.setFormat(eventDetails.getFormat());
        event.setSpeakers(eventDetails.getSpeakers());
        event.setStatus(eventDetails.getStatus());

        Event updatedEvent = eventRepository.save(event);

        return new EventDTO(
                updatedEvent.getId(),
                updatedEvent.getEventDate(),
                updatedEvent.getLocation(),
                updatedEvent.getFormat(),
                updatedEvent.getSpeakers(),
                updatedEvent.getStatus(),
                updatedEvent.getCreatedBy(),
                updatedEvent.getCreatedAt(),
                updatedEvent.getParticipants().contains(user));
    }

    @Transactional
    public EventDTO registerForEvent(Long eventId) {
        User user = getCurrentUser();
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found"));

        if (event.getParticipants().contains(user)) {
            throw new RuntimeException("User already registered");
        }

        event.getParticipants().add(user);
        Event updatedEvent = eventRepository.save(event);

        return convertToDto(updatedEvent, user);
    }

    @Transactional
    public void unregisterFromEvent(Long eventId) {
        User user = getCurrentUser();
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found"));

        if (!event.getParticipants().contains(user)) {
            throw new RuntimeException("You are not registered for this event");
        }

        event.getParticipants().remove(user);
        eventRepository.save(event);
    }
    private EventDTO convertToDto(Event event, User currentUser) {
        boolean isRegistered = event.getParticipants().contains(currentUser);
        return new EventDTO(
                event.getId(),
                event.getEventDate(),
                event.getLocation(),
                event.getFormat(),
                event.getSpeakers(),
                event.getStatus(),
                event.getCreatedBy(),
                event.getCreatedAt(),
                isRegistered
        );
    }
}

//Основная бизнес-логика:
//
//getAllEvents():
//
//Для ADMIN: возвращает все мероприятия
//
//Для USER: только OPEN мероприятия
//
//getMyEvents(): мероприятия, на которые зарегистрирован текущий пользователь
//
//getCreatedEvents(): мероприятия, созданные текущим пользователем
//
//createEvent(): создание нового мероприятия (требует ADMIN)
//
//updateEvent(): обновление мероприятия (только создатель или ADMIN)
//
//registerForEvent(): регистрация на OPEN мероприятие
//
//unregisterFromEvent(): отмена регистрации