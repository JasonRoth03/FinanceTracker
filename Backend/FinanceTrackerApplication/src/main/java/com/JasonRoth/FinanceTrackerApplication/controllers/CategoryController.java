package com.JasonRoth.FinanceTrackerApplication.controllers;

import com.JasonRoth.FinanceTrackerApplication.models.Category;
import com.JasonRoth.FinanceTrackerApplication.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/category")
public class CategoryController {
    @Autowired
    CategoryService categoryService;

    @GetMapping("/")
    public List<Category> getAllCategories(){
        return categoryService.getAllCategories();

    }
    @GetMapping("/{id}")
    public String getCategoryById(@PathVariable String id) {
        return categoryService.getCategoryById(id).getName();
    }
}
