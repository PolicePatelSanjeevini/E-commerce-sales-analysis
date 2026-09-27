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
public class OrderStatusDto {

    private String status;
    private Long orderCount;
    private BigDecimal totalAmount;
    private Double percentage;
}
