
package com.manoj.realestate_backend.repository;

import com.manoj.realestate_backend.model.AdminResidency;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface AdminResidencyRepository
        extends MongoRepository<AdminResidency, String> {

    List<AdminResidency> findAllByOrderByCreatedAtDesc();

    List<AdminResidency> findByUserEmail(String userEmail);

    Optional<AdminResidency> findByAddressAndUserEmail(
            String address,
            String userEmail
    );
}
