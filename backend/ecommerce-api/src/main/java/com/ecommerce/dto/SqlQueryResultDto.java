package com.ecommerce.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SqlQueryResultDto {

    private String id;
    private String title;
    private String category;
    private String description;
    private String sqlQuery;
    private List<String> columns;
    private List<Map<String, Object>> rows;
    private Long executionTimeMs;
}
