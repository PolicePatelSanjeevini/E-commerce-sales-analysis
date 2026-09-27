package com.ecommerce.service;

import com.ecommerce.dto.CustomerDto;
import com.ecommerce.dto.CustomerSpendingDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CustomerService {
    List<CustomerSpendingDto> getTopCustomers(int limit);
    List<CustomerSpendingDto> getRepeatCustomers();
    Page<CustomerDto> getCustomers(String search, Pageable pageable);
}
