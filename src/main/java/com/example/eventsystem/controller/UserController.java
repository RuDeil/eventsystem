package com.example.eventsystem.controller;

import com.example.eventsystem.dto.RegisterRequest;
import com.example.eventsystem.model.User;
import com.example.eventsystem.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
// Метод для регистрации юзеров.
    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(userService.registerUser(request));
    }
// Метод для создания админа - закрыт Токеном, тк как только админ может создавать админа. TODO: как заргеать первого админа?
    @PostMapping("/admin/register")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> registerAdmin(@Valid @RequestBody RegisterRequest request) {
        request.setRole("ADMIN");
        return ResponseEntity.ok(userService.registerUser(request));
    }
}