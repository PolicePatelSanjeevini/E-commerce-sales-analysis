package com.ecommerce.service.impl;

import com.ecommerce.dto.ProductDto;
import com.ecommerce.dto.TopProductDto;
import com.ecommerce.entity.Product;
import com.ecommerce.repository.ProductRepository;
import com.ecommerce.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    @Transactional(readOnly = true)
    public List<TopProductDto> getTopProducts(int limit) {
        List<Object[]> rawList = productRepository.findTopProductsNative(limit);
        List<TopProductDto> result = new ArrayList<>();

        for (Object[] row : rawList) {
            Integer productId = ((Number) row[0]).intValue();
            String productName = (String) row[1];
            String categoryName = (String) row[2];
            BigDecimal price = row[3] != null ? new BigDecimal(row[3].toString()) : BigDecimal.ZERO;
            Long unitsSold = row[4] != null ? ((Number) row[4]).longValue() : 0L;
            BigDecimal totalRevenue = row[5] != null ? new BigDecimal(row[5].toString()) : BigDecimal.ZERO;
            Integer rank = row[6] != null ? ((Number) row[6]).intValue() : 1;

            result.add(TopProductDto.builder()
                    .productId(productId)
                    .productName(productName)
                    .categoryName(categoryName)
                    .price(price)
                    .unitsSold(unitsSold)
                    .totalRevenue(totalRevenue)
                    .revenueRank(rank)
                    .build());
        }
        return result;
    }

    @Override
    @Transactional(readOnly = true)
    public List<TopProductDto> getLowPerformingProducts() {
        List<Object[]> rawList = productRepository.findLowPerformingProductsNative();
        List<TopProductDto> result = new ArrayList<>();

        int rank = 1;
        for (Object[] row : rawList) {
            Integer productId = ((Number) row[0]).intValue();
            String productName = (String) row[1];
            String categoryName = (String) row[2];
            BigDecimal price = row[3] != null ? new BigDecimal(row[3].toString()) : BigDecimal.ZERO;
            Long unitsSold = row[5] != null ? ((Number) row[5]).longValue() : 0L;
            BigDecimal totalRevenue = row[6] != null ? new BigDecimal(row[6].toString()) : BigDecimal.ZERO;

            result.add(TopProductDto.builder()
                    .productId(productId)
                    .productName(productName)
                    .categoryName(categoryName)
                    .price(price)
                    .unitsSold(unitsSold)
                    .totalRevenue(totalRevenue)
                    .revenueRank(rank++)
                    .build());
        }
        return result;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ProductDto> getProducts(String search, Pageable pageable) {
        Page<Product> page;
        if (search != null && !search.trim().isEmpty()) {
            page = productRepository.findByProductNameContainingIgnoreCase(search.trim(), pageable);
        } else {
            page = productRepository.findAll(pageable);
        }

        return page.map(p -> ProductDto.builder()
                .productId(p.getProductId())
                .productName(p.getProductName())
                .categoryId(p.getCategory().getCategoryId())
                .categoryName(p.getCategory().getCategoryName())
                .price(p.getPrice())
                .stockQuantity(p.getStockQuantity())
                .createdAt(p.getCreatedAt())
                .build());
    }
}
