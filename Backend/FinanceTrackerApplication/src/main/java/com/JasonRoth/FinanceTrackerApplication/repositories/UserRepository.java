package com.JasonRoth.FinanceTrackerApplication.repositories;

import com.JasonRoth.FinanceTrackerApplication.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username);
}
