
package com.manoj.realestate_backend.controller;

import com.manoj.realestate_backend.model.RejectResidency;
import com.manoj.realestate_backend.service.RejectResidencyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/residency")
public class RejectResidencyController {

    private final RejectResidencyService service;

    public RejectResidencyController(RejectResidencyService service) {
        this.service = service;
    }

    @PostMapping("/rejectCreate")
    public ResponseEntity<?> createRejectResidency(
            @RequestBody Map<String, RejectResidency> request) {

        RejectResidency residency = request.get("data");

        if (residency == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Missing residency data"));
        }

        RejectResidency saved = service.createRejectResidency(residency);

        return ResponseEntity.ok(
                Map.of(
                        "message", "Reject Residency created successfully",
                        "RejectResidency", saved
                )
        );
    }

    @GetMapping("/allRejectresd")
    public ResponseEntity<List<RejectResidency>> getAllRejectResidencies() {
        return ResponseEntity.ok(service.getAllRejectResidencies());
    }

    @GetMapping("/rejectResidency/{id}")
    public ResponseEntity<?> getRejectResidency(@PathVariable String id) {

        RejectResidency residency = service.getRejectResidencyById(id);

        return ResponseEntity.ok(
                Map.of(
                        "message", "RejectResidency fetched successfully",
                        "RejectResidency", residency
                )
        );
    }
}
