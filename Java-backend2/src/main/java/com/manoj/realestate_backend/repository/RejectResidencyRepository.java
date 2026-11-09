
package com.manoj.realestate_backend.repository;

import com.manoj.realestate_backend.model.RejectResidency;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface RejectResidencyRepository
        extends MongoRepository<RejectResidency, String> {

    List<RejectResidency> findAllByOrderByCreatedAtDesc();

    List<RejectResidency> findByUserEmail(String userEmail);

    Optional<RejectResidency> findByAddressAndUserEmail(
            String address,
            String userEmail
    );
}
