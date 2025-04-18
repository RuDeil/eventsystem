package com.example.eventsystem.dto;

import com.example.eventsystem.model.User;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class EventDTO {
    private Long id;
    private String title;
    private String description;
    @NotBlank(message = "Категория обязательна")
    private String category; // CONFERENCE, WORKSHOP и т.д.
    private LocalDateTime startTime;  // Переименовано (было eventDate)
    private LocalDateTime endTime;    // Добавлено
    private String location;
    private String format;
    private String onlineLink;        // Добавлено
    private Integer maxParticipants;  // Добавлено
    private Boolean isCancellable;    // Добавлено
    private List<String> speakers;
    private String status;
    private Long createdBy;
    private LocalDateTime createdAt;
    private boolean isRegistered;


    public EventDTO(
            Long id,
            String title,
            String description,          // Добавлено
            String category,            // Добавлено
            LocalDateTime startTime,    // Переименовано (было eventDate)
            LocalDateTime endTime,      // Добавлено
            String location,
            String format,
            String onlineLink,          // Добавлено
            Integer maxParticipants,    // Добавлено
            Boolean isCancellable,      // Добавлено
            List<String> speakers,
            String status,
            User createdBy,
            LocalDateTime createdAt,
            boolean isRegistered
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.startTime = startTime;
        this.endTime = endTime;
        this.location = location;
        this.format = format;
        this.onlineLink = onlineLink;
        this.maxParticipants = maxParticipants;
        this.isCancellable = isCancellable;
        this.speakers = speakers;
        this.status = status;
        this.createdBy = createdBy != null ? createdBy.getId() : null;
        this.createdAt = createdAt;
        this.isRegistered = isRegistered;
    }
}