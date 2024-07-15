package com.JasonRoth.FinanceTrackerApplication.services;

import com.JasonRoth.FinanceTrackerApplication.models.Category;
import com.JasonRoth.FinanceTrackerApplication.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category getCategoryById(String id) {
        return categoryRepository.findById(id).orElse(null);
    }
    public void deleteCategoryById(String id) {
        categoryRepository.deleteById(id);
    }

}
