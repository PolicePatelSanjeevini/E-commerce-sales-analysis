package com.ecommerce.service;

import com.ecommerce.dto.CategoryRevenueDto;
import com.ecommerce.dto.MonthlyRevenueDto;

import java.util.List;

public interface SalesService {
    List<MonthlyRevenueDto> getMonthlySales();
    List<CategoryRevenueDto> getCategoryRevenue();
}
