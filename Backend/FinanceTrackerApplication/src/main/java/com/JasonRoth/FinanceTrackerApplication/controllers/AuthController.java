package com.JasonRoth.FinanceTrackerApplication.controllers;

import com.JasonRoth.FinanceTrackerApplication.auth.AuthRequest;
import com.JasonRoth.FinanceTrackerApplication.auth.AuthResponse;
import com.JasonRoth.FinanceTrackerApplication.config.CustomUserDetailsService;
import com.JasonRoth.FinanceTrackerApplication.config.JwtUtils;
import com.JasonRoth.FinanceTrackerApplication.models.User;
import com.JasonRoth.FinanceTrackerApplication.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest){
        try{
            System.out.println("Attempting to authenticate user: " + authRequest.getUsername());
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
            System.out.println("Authentication successful for user: " + authRequest.getUsername());
            UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getUsername());
            System.out.println("Loaded User Details: " + userDetails.getUsername());
            String token = JwtUtils.generateToken((userDetails.getUsername()));
            System.out.println("Generated JWT token: " + token);

            return ResponseEntity.ok(new AuthResponse(token));
        }catch(AuthenticationException e){
            return ResponseEntity.status(401).body("Authentication failed");
        }

    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthRequest authRequest){
        //Register the user
       try{
           userDetailsService.loadUserByUsername(authRequest.getUsername());
           //no exception so username is currently in use
           return ResponseEntity.status(401).body("Username already exists");

       }catch(Exception e){
           //throws exception when username was not found i.e. username is valid
           User user = new User();
           user.setUsername(authRequest.getUsername());
           user.setPassword(passwordEncoder.encode(authRequest.getPassword()));
           //Save user to database
           userRepository.save(user);

           return ResponseEntity.ok("User registered successfully");
       }
    }
}
