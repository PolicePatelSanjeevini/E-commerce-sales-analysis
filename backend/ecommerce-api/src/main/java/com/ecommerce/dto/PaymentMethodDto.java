package com.ecommerce.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentMethodDto {

    private String paymentMethod;
    private Long totalTransactions;
    private BigDecimal successfulRevenue;
    private Long successfulCount;
    private Long failedCount;
    private Long refundedCount;
    private Double successRatePercentage;
}
