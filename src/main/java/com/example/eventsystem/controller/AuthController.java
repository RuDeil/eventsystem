package com.example.eventsystem.controller;

import com.example.eventsystem.dto.AuthRequest;
import com.example.eventsystem.dto.AuthResponse;
import com.example.eventsystem.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest authRequest) {
        return ResponseEntity.ok(authService.login(authRequest));
    }
}

//Эндпоинты:
//
//POST /api/auth/login - аутентификация, возвращает JWT токен