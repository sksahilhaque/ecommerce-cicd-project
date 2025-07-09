package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "*") // Allow React to access the backend
public class ProductController {

  @Autowired
  private ProductRepository repo;

  @GetMapping
  public List<Product> getAll() {
    return repo.findAll();
  }

  @PostMapping
  public Product add(@RequestBody Product p) {
    return repo.save(p);
  }
}
