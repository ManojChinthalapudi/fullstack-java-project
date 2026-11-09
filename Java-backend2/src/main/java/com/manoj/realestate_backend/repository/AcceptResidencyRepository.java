
package com.manoj.realestate_backend.repository;

import com.manoj.realestate_backend.model.AcceptResidency;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface AcceptResidencyRepository
        extends MongoRepository<AcceptResidency, String> {

    List<AcceptResidency> findAllByOrderByCreatedAtDesc();

    List<AcceptResidency> findByUserEmail(String userEmail);

    Optional<AcceptResidency> findByAddressAndUserEmail(
            String address,
            String userEmail
    );
}
