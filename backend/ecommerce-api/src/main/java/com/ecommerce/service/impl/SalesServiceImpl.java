package com.ecommerce.service.impl;

import com.ecommerce.dto.CategoryRevenueDto;
import com.ecommerce.dto.MonthlyRevenueDto;
import com.ecommerce.repository.OrderRepository;
import com.ecommerce.service.SalesService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SalesServiceImpl implements SalesService {

    private final OrderRepository orderRepository;

    @Override
    @Transactional(readOnly = true)
    public List<MonthlyRevenueDto> getMonthlySales() {
        List<Object[]> rawList = orderRepository.findMonthlySalesNative();
        List<MonthlyRevenueDto> result = new ArrayList<>();

        for (Object[] row : rawList) {
            String monthYear = (String) row[0];
            Long orderCount = row[1] != null ? ((Number) row[1]).longValue() : 0L;
            BigDecimal revenue = row[2] != null ? new BigDecimal(row[2].toString()) : BigDecimal.ZERO;
            BigDecimal avgOrderValue = row[3] != null ? new BigDecimal(row[3].toString()) : BigDecimal.ZERO;
            Double momGrowth = row[5] != null ? ((Number) row[5]).doubleValue() : null;

            result.add(MonthlyRevenueDto.builder()
                    .monthYear(monthYear)
                    .orderCount(orderCount)
                    .revenue(revenue)
                    .avgOrderValue(avgOrderValue)
                    .momGrowthPercentage(momGrowth)
                    .build());
        }
        return result;
    }

    @Override
    @Transactional(readOnly = true)
    public List<CategoryRevenueDto> getCategoryRevenue() {
        List<Object[]> rawList = orderRepository.findCategoryRevenueNative();
        List<CategoryRevenueDto> result = new ArrayList<>();

        BigDecimal totalOverallRevenue = rawList.stream()
                .map(r -> r[4] != null ? new BigDecimal(r[4].toString()) : BigDecimal.ZERO)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        for (Object[] row : rawList) {
            Integer categoryId = ((Number) row[0]).intValue();
            String categoryName = (String) row[1];
            Long totalProducts = ((Number) row[2]).longValue();
            Long totalUnitsSold = ((Number) row[3]).longValue();
            BigDecimal categoryRevenue = row[4] != null ? new BigDecimal(row[4].toString()) : BigDecimal.ZERO;

            double share = 0.0;
            if (totalOverallRevenue.compareTo(BigDecimal.ZERO) > 0) {
                share = categoryRevenue.multiply(BigDecimal.valueOf(100))
                        .divide(totalOverallRevenue, 2, RoundingMode.HALF_UP)
                        .doubleValue();
            }

            result.add(CategoryRevenueDto.builder()
                    .categoryId(categoryId)
                    .categoryName(categoryName)
                    .totalProducts(totalProducts)
                    .totalUnitsSold(totalUnitsSold)
                    .categoryRevenue(categoryRevenue)
                    .revenueSharePercentage(share)
                    .build());
        }
        return result;
    }
}
