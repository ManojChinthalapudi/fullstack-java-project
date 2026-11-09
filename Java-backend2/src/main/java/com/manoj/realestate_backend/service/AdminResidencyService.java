
package com.manoj.realestate_backend.service;

import com.manoj.realestate_backend.model.AdminResidency;
import com.manoj.realestate_backend.repository.AdminResidencyRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.List;

@Service
public class AdminResidencyService {

    private final AdminResidencyRepository repository;

    public AdminResidencyService(AdminResidencyRepository repository) {
        this.repository = repository;
    }

    public List<AdminResidency> getAllAdminResidencies() {
        return repository.findAllByOrderByCreatedAtDesc();
    }

    public AdminResidency getAdminResidencyById(String id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Admin residency not found"
                ));
    }

    public AdminResidency createAdminResidency(
            AdminResidency residency) {

        boolean alreadyExists = repository
                .findByAddressAndUserEmail(
                        residency.getAddress(),
                        residency.getUserEmail()
                )
                .isPresent();

        if (alreadyExists) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Admin residency already exists for this user and address"
            );
        }

        if (residency.getImage() == null ||
                residency.getImage().isBlank()) {
            residency.setImage("/logo1.png");
        }

        Instant now = Instant.now();
        residency.setCreatedAt(now);
        residency.setUpdatedAt(now);

        return repository.save(residency);
    }
}
