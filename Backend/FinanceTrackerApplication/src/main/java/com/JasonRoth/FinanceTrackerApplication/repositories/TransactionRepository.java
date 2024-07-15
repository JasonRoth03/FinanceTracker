package com.JasonRoth.FinanceTrackerApplication.repositories;

import com.JasonRoth.FinanceTrackerApplication.models.Transaction;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface TransactionRepository extends MongoRepository<Transaction, String> {
    List<Transaction> findByUserId(String userId);
}
