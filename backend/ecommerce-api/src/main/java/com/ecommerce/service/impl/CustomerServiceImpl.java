package com.ecommerce.service.impl;

import com.ecommerce.dto.CustomerDto;
import com.ecommerce.dto.CustomerSpendingDto;
import com.ecommerce.entity.Customer;
import com.ecommerce.repository.CustomerRepository;
import com.ecommerce.service.CustomerService;
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
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;

    @Override
    @Transactional(readOnly = true)
    public List<CustomerSpendingDto> getTopCustomers(int limit) {
        List<Object[]> rawList = customerRepository.findTopSpendingCustomersNative(limit);
        List<CustomerSpendingDto> result = new ArrayList<>();

        for (Object[] row : rawList) {
            Integer customerId = ((Number) row[0]).intValue();
            String customerName = (String) row[1];
            String email = (String) row[2];
            String city = (String) row[3];
            String state = (String) row[4];
            Long totalOrders = row[5] != null ? ((Number) row[5]).longValue() : 0L;
            BigDecimal totalSpent = row[6] != null ? new BigDecimal(row[6].toString()) : BigDecimal.ZERO;
            Integer rank = row[7] != null ? ((Number) row[7]).intValue() : 1;

            result.add(CustomerSpendingDto.builder()
                    .customerId(customerId)
                    .customerName(customerName)
                    .email(email)
                    .city(city)
                    .state(state)
                    .totalOrders(totalOrders)
                    .totalSpent(totalSpent)
                    .spendingRank(rank)
                    .build());
        }
        return result;
    }

    @Override
    @Transactional(readOnly = true)
    public List<CustomerSpendingDto> getRepeatCustomers() {
        List<Object[]> rawList = customerRepository.findRepeatCustomersNative();
        List<CustomerSpendingDto> result = new ArrayList<>();

        int rank = 1;
        for (Object[] row : rawList) {
            Integer customerId = ((Number) row[0]).intValue();
            String customerName = (String) row[1];
            String email = (String) row[2];
            String city = (String) row[3];
            String state = (String) row[4];
            Long totalOrders = row[5] != null ? ((Number) row[5]).longValue() : 0L;
            BigDecimal totalSpent = row[6] != null ? new BigDecimal(row[6].toString()) : BigDecimal.ZERO;

            result.add(CustomerSpendingDto.builder()
                    .customerId(customerId)
                    .customerName(customerName)
                    .email(email)
                    .city(city)
                    .state(state)
                    .totalOrders(totalOrders)
                    .totalSpent(totalSpent)
                    .spendingRank(rank++)
                    .build());
        }
        return result;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<CustomerDto> getCustomers(String search, Pageable pageable) {
        Page<Customer> page;
        if (search != null && !search.trim().isEmpty()) {
            String q = search.trim();
            page = customerRepository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
                    q, q, q, pageable);
        } else {
            page = customerRepository.findAll(pageable);
        }

        return page.map(c -> CustomerDto.builder()
                .customerId(c.getCustomerId())
                .firstName(c.getFirstName())
                .lastName(c.getLastName())
                .email(c.getEmail())
                .phone(c.getPhone())
                .city(c.getCity())
                .state(c.getState())
                .createdAt(c.getCreatedAt())
                .build());
    }
}
