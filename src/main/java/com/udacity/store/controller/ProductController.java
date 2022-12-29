package com.udacity.store.controller;

import com.udacity.store.model.Product;
import com.udacity.store.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {

    @Autowired
    private ProductService productService;


    @GetMapping("/")
    public ResponseEntity<List<Product>> fetchAllProducts() throws Exception {
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> fetchProduct(@PathVariable Long id) throws Exception {
        Product productById = productService.getProductById(id);
        return ResponseEntity.ok(productById);
    }


}
