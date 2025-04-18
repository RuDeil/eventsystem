package com.example.eventsystem.service;

import com.example.eventsystem.dto.EventDTO;
import com.example.eventsystem.exception.ResourceNotFoundException;
import com.example.eventsystem.model.Event;
import com.example.eventsystem.model.User;
import com.example.eventsystem.repository.EventRepository;
import com.example.eventsystem.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EventService {
    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    // Получение текущего пользователя
    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    // Основные методы получения событий
    public List<EventDTO> getAllOpenEvents() {
        User user = getCurrentUser();
        return eventRepository.findByStatus("OPEN").stream()
                .map(event -> convertToDto(event, user))
                .collect(Collectors.toList());
    }

    public List<EventDTO> getAllEvents() {
        User user = getCurrentUser();
        return eventRepository.findAll().stream()
                .map(event -> convertToDto(event, user))
                .collect(Collectors.toList());
    }

    public List<EventDTO> getMyEvents() {
        User user = getCurrentUser();
        return eventRepository.findByParticipantsContaining(user).stream()
                .map(event -> convertToDto(event, user))
                .collect(Collectors.toList());
    }

    public List<EventDTO> getCreatedEvents() {
        User user = getCurrentUser();
        return eventRepository.findByCreatedBy(user).stream()
                .map(event -> convertToDto(event, user))
                .collect(Collectors.toList());
    }

    // Создание события
    @Transactional
    public EventDTO createEvent(EventDTO eventDTO, User user) {
        Event event = new Event();
        event.setTitle(eventDTO.getTitle());
        event.setDescription(eventDTO.getDescription());
        event.setStartTime(eventDTO.getStartTime());
        event.setEndTime(eventDTO.getEndTime());
        event.setCategory(eventDTO.getCategory());
        event.setLocation(eventDTO.getLocation());
        event.setFormat(eventDTO.getFormat());
        event.setOnlineLink(eventDTO.getOnlineLink());
        event.setMaxParticipants(eventDTO.getMaxParticipants());
        event.setIsCancellable(eventDTO.getIsCancellable());
        event.setSpeakers(eventDTO.getSpeakers());
        event.setStatus(eventDTO.getStatus());
        event.setCreatedBy(user);

        event.updateStatusBasedOnDate();
        Event savedEvent = eventRepository.save(event);

        return convertToDto(savedEvent, user);
    }

    // Обновление события
    @Transactional
    public EventDTO updateEvent(Long id, Event eventDTO) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found"));

        User user = getCurrentUser();
        if (!event.getCreatedBy().getId().equals(user.getId()) && !user.getRole().equals("ADMIN")) {
            throw new RuntimeException("You are not authorized to update this event");
        }

        event.setTitle(eventDTO.getTitle());
        event.setDescription(eventDTO.getDescription());
        event.setCategory(eventDTO.getCategory());
        event.setStartTime(eventDTO.getStartTime());
        event.setEndTime(eventDTO.getEndTime());
        event.setLocation(eventDTO.getLocation());
        event.setFormat(eventDTO.getFormat());
        event.setOnlineLink(eventDTO.getOnlineLink());
        event.setMaxParticipants(eventDTO.getMaxParticipants());
        event.setIsCancellable(eventDTO.getIsCancellable());
        event.setSpeakers(eventDTO.getSpeakers());
        event.setStatus(eventDTO.getStatus());

        Event updatedEvent = eventRepository.save(event);
        return convertToDto(updatedEvent, user);
    }

    // Регистрация/отмена регистрации
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

    // Автоматическое обновление статусов
    @Scheduled(cron = "0 * * * * *")
    public void updateEventsStatuses() {
        List<Event> events = eventRepository.findByStatusIn(List.of("OPEN", "ACTIVE"));
        events.forEach(event -> {
            String oldStatus = event.getStatus();
            event.updateStatusBasedOnDate();
            if (!oldStatus.equals(event.getStatus())) {
                eventRepository.save(event);
            }
        });
    }

    // Преобразование Entity в DTO
    private EventDTO convertToDto(Event event, User currentUser) {
        return new EventDTO(
                event.getId(),
                event.getTitle(),
                event.getDescription(),
                event.getCategory(),
                event.getStartTime(),
                event.getEndTime(),
                event.getLocation(),
                event.getFormat(),
                event.getOnlineLink(),
                event.getMaxParticipants(),
                event.getIsCancellable(),
                event.getSpeakers(),
                event.getStatus(),
                event.getCreatedBy(),
                event.getCreatedAt(),
                event.getParticipants().contains(currentUser)
        );
    }
}