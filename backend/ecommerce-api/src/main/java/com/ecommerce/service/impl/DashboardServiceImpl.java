package com.ecommerce.service.impl;

import com.ecommerce.dto.KpiSummaryDto;
import com.ecommerce.repository.OrderRepository;
import com.ecommerce.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final OrderRepository orderRepository;

    @Override
    @Transactional(readOnly = true)
    public KpiSummaryDto getKpiSummary() {
        Object[] raw = orderRepository.findKpiSummaryNative();
        if (raw == null || raw.length == 0 || raw[0] == null) {
            return KpiSummaryDto.builder()
                    .totalRevenue(BigDecimal.ZERO)
                    .totalOrders(0L)
                    .totalCustomers(0L)
                    .totalProductsSold(0L)
                    .averageOrderValue(BigDecimal.ZERO)
                    .build();
        }

        Object[] row = (Object[]) raw[0];
        BigDecimal totalRevenue = row[0] != null ? new BigDecimal(row[0].toString()) : BigDecimal.ZERO;
        Long totalOrders = row[1] != null ? ((Number) row[1]).longValue() : 0L;
        BigDecimal avgOrderValue = row[2] != null ? new BigDecimal(row[2].toString()) : BigDecimal.ZERO;
        Long totalCustomers = row[3] != null ? ((Number) row[3]).longValue() : 0L;
        Long totalProductsSold = row[4] != null ? ((Number) row[4]).longValue() : 0L;

        return KpiSummaryDto.builder()
                .totalRevenue(totalRevenue)
                .totalOrders(totalOrders)
                .totalCustomers(totalCustomers)
                .totalProductsSold(totalProductsSold)
                .averageOrderValue(avgOrderValue)
                .build();
    }
}
