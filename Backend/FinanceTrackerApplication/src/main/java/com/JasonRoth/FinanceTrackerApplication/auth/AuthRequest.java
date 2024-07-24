package com.JasonRoth.FinanceTrackerApplication.auth;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthRequest {
    private String firstName;
    private String lastName;
    private String username;
    private String password;


}
