package com.JasonRoth.FinanceTrackerApplication.config;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component

public class JwtConstants {

    @Value("${jwt.secret-key}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expirationTime;

    public static String SECRET;
    public static long EXPIRATION_TIME;

    @PostConstruct
    public void init() {
        SECRET = this.secret;
        EXPIRATION_TIME = this.expirationTime;
    }
}
