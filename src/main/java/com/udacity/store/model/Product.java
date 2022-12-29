package com.udacity.store.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "products")
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Product {

    @Id
    private Long id;
    @Column
    private String url;
    @Column
    private String name;
    @Column
    private Double price;
    @Column
    private String description;

}
