package com.manoj.realestate_backend.repository;

import com.manoj.realestate_backend.model.Residency;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ResidencyRepository
        extends MongoRepository<Residency, String> {

    List<Residency> findByUserEmail(String userEmail);

    Optional<Residency> findByAddressAndUserEmail(
            String address,
            String userEmail
    );

    List<Residency> findAllByOrderByCreatedAtDesc();
}
