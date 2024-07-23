package com.JasonRoth.FinanceTrackerApplication.controllers;

import com.JasonRoth.FinanceTrackerApplication.models.User;
import com.JasonRoth.FinanceTrackerApplication.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @GetMapping("/")
    public String getCurrentUsername() {
        return getCurrentUser();
    }


    private String getCurrentUser(){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ((UserDetails)principal).getUsername();
    }
}
