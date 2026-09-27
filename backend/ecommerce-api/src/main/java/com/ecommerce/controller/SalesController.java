package com.ecommerce.controller;

import com.ecommerce.dto.ApiResponse;
import com.ecommerce.dto.CategoryRevenueDto;
import com.ecommerce.dto.MonthlyRevenueDto;
import com.ecommerce.service.SalesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sales")
@RequiredArgsConstructor
public class SalesController {

    private final SalesService salesService;

    @GetMapping("/monthly")
    public ResponseEntity<ApiResponse<List<MonthlyRevenueDto>>> getMonthlySales() {
        List<MonthlyRevenueDto> list = salesService.getMonthlySales();
        return ResponseEntity.ok(ApiResponse.success(list, "Monthly sales data retrieved successfully"));
    }

    @GetMapping("/category")
    public ResponseEntity<ApiResponse<List<CategoryRevenueDto>>> getCategoryRevenue() {
        List<CategoryRevenueDto> list = salesService.getCategoryRevenue();
        return ResponseEntity.ok(ApiResponse.success(list, "Category revenue analysis retrieved successfully"));
    }
}
