package com.manoj.realestate_backend.controller;


import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class DatabaseHealthController {

    private final MongoTemplate mongoTemplate;

    public DatabaseHealthController(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @GetMapping("/api/db-health")
    public Map<String, String> checkDatabase() {

        mongoTemplate.executeCommand(new Document("ping", 1));

        return Map.of(
                "database", "MongoDB Atlas",
                "status", "CONNECTED"
        );
    }
}
