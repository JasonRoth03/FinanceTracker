package com.JasonRoth.FinanceTrackerApplication.repositories;

import com.JasonRoth.FinanceTrackerApplication.models.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CategoryRepository extends MongoRepository<Category, String> {
}
