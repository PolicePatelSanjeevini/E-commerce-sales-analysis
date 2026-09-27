package com.ecommerce.controller;

import com.ecommerce.dto.ApiResponse;
import com.ecommerce.dto.SqlQueryResultDto;
import com.ecommerce.service.SqlAnalysisService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sql-analysis")
@RequiredArgsConstructor
public class SqlAnalysisController {

    private final SqlAnalysisService sqlAnalysisService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<SqlQueryResultDto>>> getAllQueries() {
        List<SqlQueryResultDto> list = sqlAnalysisService.getAllSqlAnalysisQueries();
        return ResponseEntity.ok(ApiResponse.success(list, "SQL analysis query suite executed successfully"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<SqlQueryResultDto>> getQueryById(@PathVariable String id) {
        SqlQueryResultDto result = sqlAnalysisService.executeAnalysisQuery(id);
        return ResponseEntity.ok(ApiResponse.success(result, "SQL query execution result retrieved successfully"));
    }
}
