package com.JasonRoth.FinanceTrackerApplication.services;

import com.JasonRoth.FinanceTrackerApplication.models.Transaction;
import com.JasonRoth.FinanceTrackerApplication.repositories.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {
    @Autowired
    TransactionRepository transactionRepository;

    public Transaction createTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    public List<Transaction> findAllTransactionByUserId(String userId) {
        return transactionRepository.findByUserId(userId);
    }

    public Transaction getTransactionById(String id) {
        return transactionRepository.findById(id).orElse(null);
    }

    public Transaction updateTransaction(String id, Transaction transaction) {
        transactionRepository.deleteById(id);
        return transactionRepository.save(transaction);
    }

    public void deleteTransaction(String id) {
        transactionRepository.deleteById(id);
    }
}
