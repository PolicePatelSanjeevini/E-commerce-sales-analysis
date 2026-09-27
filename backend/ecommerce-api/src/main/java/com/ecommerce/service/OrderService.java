package com.ecommerce.service;

import com.ecommerce.dto.OrderDto;
import com.ecommerce.dto.OrderStatusDto;
import com.ecommerce.dto.PaymentMethodDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface OrderService {
    List<OrderStatusDto> getOrderStatusDistribution();
    List<PaymentMethodDto> getPaymentMethodAnalysis();
    Page<OrderDto> getOrders(String status, Pageable pageable);
}
