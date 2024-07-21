package com.JasonRoth.FinanceTrackerApplication.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ApiController {

    @GetMapping("/secure")
    public ResponseEntity<String> secure() {
        //Accessible only with valid jwt token
        return ResponseEntity.ok("secure endpoint accessed successfully");
    }
}
