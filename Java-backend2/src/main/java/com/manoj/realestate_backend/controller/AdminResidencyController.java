
package com.manoj.realestate_backend.controller;

import com.manoj.realestate_backend.model.AdminResidency;
import com.manoj.realestate_backend.service.AdminResidencyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/residency")
public class AdminResidencyController {

    private final AdminResidencyService service;

    public AdminResidencyController(AdminResidencyService service) {
        this.service = service;
    }

    @PostMapping("/adminCreate")
    public ResponseEntity<?> createAdminResidency(
            @RequestBody Map<String, AdminResidency> request) {

        AdminResidency residency = request.get("data");

        if (residency == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Missing residency data"));
        }

        AdminResidency saved = service.createAdminResidency(residency);

        return ResponseEntity.ok(
                Map.of(
                        "message", "AdminResidency created successfully",
                        "AdminResidency", saved
                )
        );
    }

    @GetMapping("/allAdminresd")
    public ResponseEntity<List<AdminResidency>> getAllAdminResidencies() {
        return ResponseEntity.ok(service.getAllAdminResidencies());
    }

    @GetMapping("/adminResidency/{id}")
    public ResponseEntity<?> getAdminResidency(@PathVariable String id) {

        AdminResidency residency = service.getAdminResidencyById(id);

        return ResponseEntity.ok(
                Map.of(
                        "message", "AdminResidency fetched successfully",
                        "AdminResidency", residency
                )
        );
    }

    @DeleteMapping("/adminResidency/{id}")
    public ResponseEntity<Void> deleteAdminResidency(
            @PathVariable String id) {

        service.deleteAdminResidency(id);

        return ResponseEntity.noContent().build();
    }
}
