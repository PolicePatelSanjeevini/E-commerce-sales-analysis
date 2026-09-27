package com.ecommerce.controller;

import com.ecommerce.dto.ApiResponse;
import com.ecommerce.dto.CustomerDto;
import com.ecommerce.dto.CustomerSpendingDto;
import com.ecommerce.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    @GetMapping("/top")
    public ResponseEntity<ApiResponse<List<CustomerSpendingDto>>> getTopCustomers(
            @RequestParam(defaultValue = "10") int limit) {
        List<CustomerSpendingDto> list = customerService.getTopCustomers(limit);
        return ResponseEntity.ok(ApiResponse.success(list, "Top spending customers retrieved successfully"));
    }

    @GetMapping("/repeat")
    public ResponseEntity<ApiResponse<List<CustomerSpendingDto>>> getRepeatCustomers() {
        List<CustomerSpendingDto> list = customerService.getRepeatCustomers();
        return ResponseEntity.ok(ApiResponse.success(list, "Repeat customer analytics retrieved successfully"));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<CustomerDto>>> getCustomers(
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "customerId") String sortBy,
            @RequestParam(defaultValue = "ASC") String sortDir) {

        Sort sort = sortDir.equalsIgnoreCase("DESC") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Page<CustomerDto> customerPage = customerService.getCustomers(search, PageRequest.of(page, size, sort));
        return ResponseEntity.ok(ApiResponse.success(customerPage, "Customer directory retrieved successfully"));
    }
}
