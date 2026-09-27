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
public class CustomerSpendingDto {

    private Integer customerId;
    private String customerName;
    private String email;
    private String city;
    private String state;
    private Long totalOrders;
    private BigDecimal totalSpent;
    private Integer spendingRank;
}
