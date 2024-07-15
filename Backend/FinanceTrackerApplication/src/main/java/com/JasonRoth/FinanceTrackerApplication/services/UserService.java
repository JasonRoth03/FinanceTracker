package com.JasonRoth.FinanceTrackerApplication.services;

import com.JasonRoth.FinanceTrackerApplication.models.User;
import com.JasonRoth.FinanceTrackerApplication.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;


    public User save(User user) {
        return userRepository.save(user);
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Optional<User> findById(String id) {
        return userRepository.findById(id);
    }

    public void delete(User user) {
        userRepository.delete(user);
    }

    public User update(String id, User user) {
        userRepository.deleteById(id);
        return userRepository.save(user);
    }
}
