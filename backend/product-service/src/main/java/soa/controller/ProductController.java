package soa.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import soa.entity.Product;
import soa.service.ProductService;

@RestController
@RequestMapping("/products")
public class ProductController {
	
	ProductService service;

	public ProductController(ProductService service) {
		this.service = service;
	}
	
	@PostMapping
	public Object createUser(@RequestBody Product p) {
		return service.createProduct(p);
	}
	
	@GetMapping
	public Object getAllProducts() {
		return service.getAllProducts();
	}
	
	@GetMapping("/{id}")
	public Object getProductById(@PathVariable long id) {
		return service.getProductById(id);
	}
	
	@DeleteMapping("/{id}")
	public String deleteProduct(@PathVariable long id) {
		service.deleteProduct(id);
		return "Product Deleted succeefully";
	}
	

}
