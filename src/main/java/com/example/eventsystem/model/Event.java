package com.example.eventsystem.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

//Сущность мероприятия:
//
//id - уникальный идентификатор
//
//event_date - дата и время проведения
//
//location - место проведения
//
//format - формат (ONLINE/OFFLINE)
//
//speakers - список спикеров (массив текста)
//
//status - статус (OPEN/STARTED/ARCHIVED)
//
//createdBy - создатель мероприятия (связь ManyToOne)
//
//createdAt - дата создания
//
//registeredUsers - множество зарегистрированных пользователей (связь ManyToMany)

@Entity
@Table(name = "events")
@NoArgsConstructor
@Getter
@Setter
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false) // Обязательное поле
    private String title; // Добавляем название мероприятия

    @Column(name = "event_date", nullable = false)
    private LocalDateTime eventDate;

    private String location;

    @Column(nullable = false)
    private String format;

    @Column(columnDefinition = "text[]")
    private List<String> speakers;

    @Column(nullable = false)
    private String status = "OPEN";

    @ManyToOne
    @JoinColumn(name = "created_by", nullable = false)
    private User createdBy;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    @ManyToMany
    @JoinTable(
            name = "event_participants",
            joinColumns = @JoinColumn(name = "event_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<User> participants = new HashSet<>();
    public Set<User> getRegisteredUsers() {
        return participants;
    }

    public void setRegisteredUsers(Set<User> users) {
        this.participants = users;
    }
    public void setEventDate(LocalDateTime eventDate) {
        this.eventDate = eventDate;
        updateStatusBasedOnDate(); // Автоматически обновляем статус
    }

    public void updateStatusBasedOnDate() {
        if (this.eventDate == null) {
            this.status = "DRAFT";
            return;
        }

        LocalDateTime now = LocalDateTime.now();
        if (this.eventDate.isAfter(now)) {
            this.status = "OPEN"; // Предстоящее
        } else if (this.eventDate.isBefore(now)) {
            this.status = "COMPLETED"; // Завершенное
        } else {
            this.status = "ACTIVE"; // Идет прямо сейчас
        }
    }
}