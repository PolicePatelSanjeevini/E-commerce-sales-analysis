package com.ecommerce.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerDto {

    private Integer customerId;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String city;
    private String state;
    private LocalDateTime createdAt;
}
