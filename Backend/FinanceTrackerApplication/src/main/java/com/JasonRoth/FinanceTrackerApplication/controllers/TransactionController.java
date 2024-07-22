package com.JasonRoth.FinanceTrackerApplication.controllers;

import com.JasonRoth.FinanceTrackerApplication.models.Category;
import com.JasonRoth.FinanceTrackerApplication.models.Transaction;
import com.JasonRoth.FinanceTrackerApplication.models.User;
import com.JasonRoth.FinanceTrackerApplication.services.CategoryService;
import com.JasonRoth.FinanceTrackerApplication.services.TransactionService;
import com.JasonRoth.FinanceTrackerApplication.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
public class TransactionController {

    @Autowired
    TransactionService transactionService;

    @Autowired
    UserService userService;

    @Autowired
    CategoryService categoryService;

    @GetMapping("/")
    public List<Transaction> getTransactions() {
        return transactionService.findAllTransactionByUserId(getCurrentUserId());
    }

    @PostMapping("/")
    public Transaction createTransaction(@RequestBody Transaction transaction) {
        System.out.println("Attempting to create transaction");
        transaction.setUserId(getCurrentUserId());
        if(categoryService.findCategoryByName(transaction.getCategoryId()) == null){
            Category category = new Category();
            category.setName(transaction.getCategoryId());
            categoryService.createCategory(category);
        }
        transaction.setCategoryId(categoryService.findCategoryByName(transaction.getCategoryId()).getId());
        return transactionService.createTransaction(transaction);
    }

    private String getCurrentUserId(){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        String username = ((UserDetails)principal).getUsername();
        User user = userService.findByUsername(username).orElse(null);
        assert user != null;
        return user.getId();
    }
}
