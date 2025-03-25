package com.example.eventsystem.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {
    @NotBlank(message = "Фио обязательное поле")
    private String fullName;

    @NotBlank(message = "Логин обязательное поле")
    private String username;

    @NotBlank(message = "Пароль обязательное поле")
    private String password;

    private String role = "USER"; // По умолчанию USER
}