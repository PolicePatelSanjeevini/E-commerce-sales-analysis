package com.ecommerce.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDto {

    private Integer orderId;
    private Integer customerId;
    private String customerName;
    private String customerEmail;
    private LocalDateTime orderDate;
    private String status;
    private BigDecimal totalAmount;
    private String paymentMethod;
    private String paymentStatus;
}
