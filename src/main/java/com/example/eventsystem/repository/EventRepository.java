package com.example.eventsystem.repository;

import com.example.eventsystem.model.Event;
import com.example.eventsystem.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByStatus(String status);
    List<Event> findByCreatedBy(User user);
    List<Event> findByParticipantsContaining(User user);
    List<Event> findAll();
    List<Event> findByStatusIn(List<String> statuses);
}

//Методы:
//
//findByStatus - поиск мероприятий по статусу
//
//findByCreatedBy - поиск мероприятий по создателю
//
//findByRegisteredUsers - поиск мероприятий, на которые зарегистрирован пользователь