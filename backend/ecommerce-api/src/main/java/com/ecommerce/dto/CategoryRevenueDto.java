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
public class CategoryRevenueDto {

    private Integer categoryId;
    private String categoryName;
    private Long totalProducts;
    private Long totalUnitsSold;
    private BigDecimal categoryRevenue;
    private Double revenueSharePercentage;
}
