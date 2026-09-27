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
public class TopProductDto {

    private Integer productId;
    private String productName;
    private String categoryName;
    private BigDecimal price;
    private Long unitsSold;
    private BigDecimal totalRevenue;
    private Integer revenueRank;
}
