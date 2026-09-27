package com.ecommerce.controller;

import com.ecommerce.dto.ApiResponse;
import com.ecommerce.dto.KpiSummaryDto;
import com.ecommerce.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping
    public ResponseEntity<ApiResponse<KpiSummaryDto>> getDashboardKpis() {
        KpiSummaryDto kpiSummary = dashboardService.getKpiSummary();
        return ResponseEntity.ok(ApiResponse.success(kpiSummary, "Dashboard KPI summary retrieved successfully"));
    }
}
