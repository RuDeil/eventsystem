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
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EventService {
    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    public List<EventDTO> getAllEvents() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (user.getRole().equals("ADMIN")) {
            return eventRepository.findAll().stream()
                    .map(event -> new EventDTO(
                            event.getId(),
                            event.getEventDate(),
                            event.getLocation(),
                            event.getFormat(),
                            event.getSpeakers(),
                            event.getStatus(),
                            event.getCreatedBy(),
                            event.getCreatedAt()))
                    .collect(Collectors.toList());
        } else {
            return eventRepository.findByStatus("OPEN").stream()
                    .map(event -> new EventDTO(
                            event.getId(),
                            event.getEventDate(),
                            event.getLocation(),
                            event.getFormat(),
                            event.getSpeakers(),
                            event.getStatus(),
                            event.getCreatedBy(),
                            event.getCreatedAt()))
                    .collect(Collectors.toList());
        }
    }

    public List<EventDTO> getMyEvents() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return eventRepository.findByRegisteredUsers(user).stream()
                .map(event -> new EventDTO(
                        event.getId(),
                        event.getEventDate(),
                        event.getLocation(),
                        event.getFormat(),
                        event.getSpeakers(),
                        event.getStatus(),
                        event.getCreatedBy(),
                        event.getCreatedAt()))
                .collect(Collectors.toList());
    }

    public List<EventDTO> getCreatedEvents() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return eventRepository.findByCreatedBy(user).stream()
                .map(event -> new EventDTO(
                        event.getId(),
                        event.getEventDate(),
                        event.getLocation(),
                        event.getFormat(),
                        event.getSpeakers(),
                        event.getStatus(),
                        event.getCreatedBy(),
                        event.getCreatedAt()))
                .collect(Collectors.toList());
    }

    public EventDTO createEvent(Event event) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        event.setCreatedBy(user);
        Event savedEvent = eventRepository.save(event);

        return new EventDTO(
                savedEvent.getId(),
                savedEvent.getEventDate(),
                savedEvent.getLocation(),
                savedEvent.getFormat(),
                savedEvent.getSpeakers(),
                savedEvent.getStatus(),
                savedEvent.getCreatedBy(),
                savedEvent.getCreatedAt());
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
                updatedEvent.getCreatedAt());
    }

    @Transactional
    public void registerForEvent(Long eventId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found"));

        if (!event.getStatus().equals("OPEN")) {
            throw new RuntimeException("Event is not open for registration");
        }

        if (event.getRegisteredUsers().contains(user)) {
            throw new RuntimeException("You are already registered for this event");
        }

        event.getRegisteredUsers().add(user);
        user.getRegisteredEvents().add(event);

        eventRepository.save(event);
        userRepository.save(user);
    }

    @Transactional
    public void unregisterFromEvent(Long eventId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found"));

        if (!event.getRegisteredUsers().contains(user)) {
            throw new RuntimeException("You are not registered for this event");
        }

        event.getRegisteredUsers().remove(user);
        user.getRegisteredEvents().remove(event);

        eventRepository.save(event);
        userRepository.save(user);
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