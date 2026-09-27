package com.ecommerce.service;

import com.ecommerce.dto.SqlQueryResultDto;

import java.util.List;

public interface SqlAnalysisService {
    List<SqlQueryResultDto> getAllSqlAnalysisQueries();
    SqlQueryResultDto executeAnalysisQuery(String queryId);
}
