package com.ecommerce.controller;

import com.ecommerce.dto.ApiResponse;
import com.ecommerce.dto.ProductDto;
import com.ecommerce.dto.TopProductDto;
import com.ecommerce.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping("/top")
    public ResponseEntity<ApiResponse<List<TopProductDto>>> getTopProducts(
            @RequestParam(defaultValue = "10") int limit) {
        List<TopProductDto> list = productService.getTopProducts(limit);
        return ResponseEntity.ok(ApiResponse.success(list, "Top-performing products retrieved successfully"));
    }

    @GetMapping("/low-performing")
    public ResponseEntity<ApiResponse<List<TopProductDto>>> getLowPerformingProducts() {
        List<TopProductDto> list = productService.getLowPerformingProducts();
        return ResponseEntity.ok(ApiResponse.success(list, "Low-performing products retrieved successfully"));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<ProductDto>>> getProducts(
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "productId") String sortBy,
            @RequestParam(defaultValue = "ASC") String sortDir) {

        Sort sort = sortDir.equalsIgnoreCase("DESC") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Page<ProductDto> productPage = productService.getProducts(search, PageRequest.of(page, size, sort));
        return ResponseEntity.ok(ApiResponse.success(productPage, "Product catalog retrieved successfully"));
    }
}
