
package com.manoj.realestate_backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;
import org.springframework.data.mongodb.core.mapping.FieldType;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Document(collection = "User")
public class User {

    @Id
    @MongoId(FieldType.OBJECT_ID)
    private String id;

    private String name;
    private String email;
    private String image;

    private List<Map<String, Object>> bookedVisits = new ArrayList<>();

    private List<String> favResidenciesID = new ArrayList<>();

    public User() {}

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public List<Map<String, Object>> getBookedVisits() {
        return bookedVisits;
    }

    public void setBookedVisits(List<Map<String, Object>> bookedVisits) {
        this.bookedVisits = bookedVisits;
    }

    public List<String> getFavResidenciesID() {
        return favResidenciesID;
    }

    public void setFavResidenciesID(List<String> favResidenciesID) {
        this.favResidenciesID = favResidenciesID;
    }
}
