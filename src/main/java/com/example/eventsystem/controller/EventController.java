package com.example.eventsystem.controller;

import com.example.eventsystem.dto.EventDTO;
import com.example.eventsystem.model.Event;
import com.example.eventsystem.service.EventService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {
    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    public ResponseEntity<List<EventDTO>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    @GetMapping("/my")
    public ResponseEntity<List<EventDTO>> getMyEvents() {
        return ResponseEntity.ok(eventService.getMyEvents());
    }

    @GetMapping("/created")
    public ResponseEntity<List<EventDTO>> getCreatedEvents() {
        return ResponseEntity.ok(eventService.getCreatedEvents());
    }

    @PostMapping
    public ResponseEntity<EventDTO> createEvent(@RequestBody Event event) {
        return ResponseEntity.ok(eventService.createEvent(event));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EventDTO> updateEvent(@PathVariable Long id, @RequestBody Event event) {
        return ResponseEntity.ok(eventService.updateEvent(id, event));
    }

    @PostMapping("/{eventId}/register")
    public ResponseEntity<Void> registerForEvent(@PathVariable Long eventId) {
        eventService.registerForEvent(eventId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{eventId}/unregister")
    public ResponseEntity<Void> unregisterFromEvent(@PathVariable Long eventId) {
        eventService.unregisterFromEvent(eventId);
        return ResponseEntity.ok().build();
    }
}

//Эндпоинты:
//
//GET /api/events - получение мероприятий (в зависимости от роли)
//
//GET /api/events/my - мероприятия пользователя
//
//GET /api/events/created - созданные мероприятия
//
//POST /api/events - создание мероприятия
//
//PUT /api/events/{id} - обновление мероприятия
//
//POST /api/events/{eventId}/register - регистрация
//
//POST /api/events/{eventId}/unregister - отмена регистрации