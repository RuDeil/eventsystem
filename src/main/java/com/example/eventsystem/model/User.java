package com.example.eventsystem.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;


//id - уникальный идентификатор
//
//full_name - полное имя
//
//username - уникальный логин
//
//password - хэшированный пароль
//
//role - роль (USER или ADMIN)
//
//registeredEvents - множество мероприятий, на которые зарегистрирован пользователь (связь ManyToMany)

@Entity
@Table(name = "users")
@NoArgsConstructor
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "full_name")
    private String fullName;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role = "USER";

    @ManyToMany
    @JoinTable(
            name = "event_registrations",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "event_id")
    )
    private Set<Event> registeredEvents = new HashSet<>();
}

