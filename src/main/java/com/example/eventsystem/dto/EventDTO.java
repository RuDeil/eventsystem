package com.example.eventsystem.dto;

import com.example.eventsystem.model.User;
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
    private LocalDateTime eventDate;
    private String location;
    private String format;
    private List<String> speakers;
    private String status;
    private Long createdBy;
    private LocalDateTime createdAt;
    private boolean isRegistered;

    public EventDTO(Long id, String title, LocalDateTime eventDate, String location, String format,
                    List<String> speakers, String status, User createdBy, LocalDateTime createdAt, boolean isRegistered) {
        this.id = id;
        this.title = title;
        this.eventDate = eventDate;
        this.location = location;
        this.format = format;
        this.speakers = speakers;
        this.status = status;
        this.createdBy = createdBy.getId();
        this.createdAt = createdAt;
        this.isRegistered = isRegistered;
    }
}