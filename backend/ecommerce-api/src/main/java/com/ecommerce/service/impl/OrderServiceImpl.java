package com.ecommerce.service.impl;

import com.ecommerce.dto.OrderDto;
import com.ecommerce.dto.OrderStatusDto;
import com.ecommerce.dto.PaymentMethodDto;
import com.ecommerce.entity.Order;
import com.ecommerce.entity.Payment;
import com.ecommerce.repository.OrderRepository;
import com.ecommerce.repository.PaymentRepository;
import com.ecommerce.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final PaymentRepository paymentRepository;

    @Override
    @Transactional(readOnly = true)
    public List<OrderStatusDto> getOrderStatusDistribution() {
        List<Object[]> rawList = orderRepository.findOrderStatusDistributionNative();
        List<OrderStatusDto> result = new ArrayList<>();

        for (Object[] row : rawList) {
            String status = (String) row[0];
            Long count = row[1] != null ? ((Number) row[1]).longValue() : 0L;
            BigDecimal totalAmount = row[2] != null ? new BigDecimal(row[2].toString()) : BigDecimal.ZERO;
            Double percentage = row[3] != null ? ((Number) row[3]).doubleValue() : 0.0;

            result.add(OrderStatusDto.builder()
                    .status(status)
                    .orderCount(count)
                    .totalAmount(totalAmount)
                    .percentage(percentage)
                    .build());
        }
        return result;
    }

    @Override
    @Transactional(readOnly = true)
    public List<PaymentMethodDto> getPaymentMethodAnalysis() {
        List<Object[]> rawList = paymentRepository.findPaymentMethodAnalysisNative();
        List<PaymentMethodDto> result = new ArrayList<>();

        for (Object[] row : rawList) {
            String method = (String) row[0];
            Long totalTx = row[1] != null ? ((Number) row[1]).longValue() : 0L;
            BigDecimal revenue = row[2] != null ? new BigDecimal(row[2].toString()) : BigDecimal.ZERO;
            Long successCount = row[3] != null ? ((Number) row[3]).longValue() : 0L;
            Long failedCount = row[4] != null ? ((Number) row[4]).longValue() : 0L;
            Long refundedCount = row[5] != null ? ((Number) row[5]).longValue() : 0L;
            Double successRate = row[6] != null ? ((Number) row[6]).doubleValue() : 0.0;

            result.add(PaymentMethodDto.builder()
                    .paymentMethod(method)
                    .totalTransactions(totalTx)
                    .successfulRevenue(revenue)
                    .successfulCount(successCount)
                    .failedCount(failedCount)
                    .refundedCount(refundedCount)
                    .successRatePercentage(successRate)
                    .build());
        }
        return result;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<OrderDto> getOrders(String status, Pageable pageable) {
        Page<Order> page;
        if (status != null && !status.trim().isEmpty() && !status.equalsIgnoreCase("ALL")) {
            page = orderRepository.findByStatus(status.trim().toUpperCase(), pageable);
        } else {
            page = orderRepository.findAll(pageable);
        }

        return page.map(o -> {
            Optional<Payment> pOpt = paymentRepository.findByOrderOrderId(o.getOrderId());
            String payMethod = pOpt.map(Payment::getPaymentMethod).orElse("N/A");
            String payStatus = pOpt.map(Payment::getPaymentStatus).orElse("N/A");

            return OrderDto.builder()
                    .orderId(o.getOrderId())
                    .customerId(o.getCustomer().getCustomerId())
                    .customerName(o.getCustomer().getFirstName() + " " + o.getCustomer().getLastName())
                    .customerEmail(o.getCustomer().getEmail())
                    .orderDate(o.getOrderDate())
                    .status(o.getStatus())
                    .totalAmount(o.getTotalAmount())
                    .paymentMethod(payMethod)
                    .paymentStatus(payStatus)
                    .build();
        });
    }
}
