package com.ecommerce.service;

import com.ecommerce.dto.ProductDto;
import com.ecommerce.dto.TopProductDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductService {
    List<TopProductDto> getTopProducts(int limit);
    List<TopProductDto> getLowPerformingProducts();
    Page<ProductDto> getProducts(String search, Pageable pageable);
}
