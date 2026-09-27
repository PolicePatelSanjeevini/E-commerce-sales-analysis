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
public class ProductDto {

    private Integer productId;
    private String productName;
    private Integer categoryId;
    private String categoryName;
    private BigDecimal price;
    private Integer stockQuantity;
    private LocalDateTime createdAt;
}
