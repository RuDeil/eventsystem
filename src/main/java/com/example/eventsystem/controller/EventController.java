package com.example.eventsystem.controller;

import com.example.eventsystem.dto.EventDTO;
import com.example.eventsystem.exception.ResourceNotFoundException;
import com.example.eventsystem.model.Event;
import com.example.eventsystem.model.User;
import com.example.eventsystem.repository.EventRepository;
import com.example.eventsystem.repository.UserRepository;
import com.example.eventsystem.service.EventService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventController {
    private final EventService eventService;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;
    @GetMapping
    public ResponseEntity<List<EventDTO>> getAllEvents() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (user.getRole().equals("ADMIN")) {
            return ResponseEntity.ok(eventService.getAllEvents());
        } else {
            return ResponseEntity.ok(eventService.getAllOpenEvents());
        }
    }

    @GetMapping("/my")
    public ResponseEntity<List<EventDTO>> getMyEvents() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return ResponseEntity.ok(eventService.getMyEvents());
    }

    @GetMapping("/created")
    public ResponseEntity<List<EventDTO>> getCreatedEvents() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return ResponseEntity.ok(eventService.getCreatedEvents());
    }



    @PostMapping
    public ResponseEntity<EventDTO> createEvent(@RequestBody @Valid Event event) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return ResponseEntity.ok(eventService.createEvent(event, user));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EventDTO> updateEvent(@PathVariable Long id, @RequestBody Event event) {
        return ResponseEntity.ok(eventService.updateEvent(id, event));
    }

    @PostMapping("/{eventId}/register")
    public ResponseEntity<EventDTO> registerForEvent(@PathVariable Long eventId) {
        return ResponseEntity.ok(eventService.registerForEvent(eventId));
    }

    @PostMapping("/{eventId}/unregister")
    public ResponseEntity<Void> unregisterFromEvent(@PathVariable Long eventId) {
        eventService.unregisterFromEvent(eventId);
        return ResponseEntity.ok().build();
    }
}