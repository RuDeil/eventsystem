package com.example.eventsystem.repository;

import com.example.eventsystem.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    boolean existsByUsername(String username);
}


//Методы:
//
//findByUsername - поиск пользователя по логину
//
//existsByUsername - проверка существования пользователя