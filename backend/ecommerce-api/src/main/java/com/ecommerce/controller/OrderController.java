package com.ecommerce.controller;

import com.ecommerce.dto.ApiResponse;
import com.ecommerce.dto.OrderDto;
import com.ecommerce.dto.OrderStatusDto;
import com.ecommerce.dto.PaymentMethodDto;
import com.ecommerce.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @GetMapping("/status")
    public ResponseEntity<ApiResponse<List<OrderStatusDto>>> getOrderStatusDistribution() {
        List<OrderStatusDto> list = orderService.getOrderStatusDistribution();
        return ResponseEntity.ok(ApiResponse.success(list, "Order status distribution retrieved successfully"));
    }

    @GetMapping("/payments/methods")
    public ResponseEntity<ApiResponse<List<PaymentMethodDto>>> getPaymentMethodAnalysis() {
        List<PaymentMethodDto> list = orderService.getPaymentMethodAnalysis();
        return ResponseEntity.ok(ApiResponse.success(list, "Payment method analysis retrieved successfully"));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<OrderDto>>> getOrders(
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "orderId") String sortBy,
            @RequestParam(defaultValue = "DESC") String sortDir) {

        Sort sort = sortDir.equalsIgnoreCase("DESC") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Page<OrderDto> orderPage = orderService.getOrders(status, PageRequest.of(page, size, sort));
        return ResponseEntity.ok(ApiResponse.success(orderPage, "Order transactions retrieved successfully"));
    }
}
