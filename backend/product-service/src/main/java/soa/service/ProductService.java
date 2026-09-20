package soa.service;

import org.springframework.stereotype.Service;

import soa.entity.Product;
import soa.repository.ProductRepository;

@Service
public class ProductService {
	
	ProductRepository productRepository;

	public ProductService(ProductRepository productRepository) {
		this.productRepository = productRepository;
	}
	
	public Object createProduct(Product p) {
		return productRepository.save(p);
	}
	
	public Object getAllProducts() {
		return productRepository.findAll();
	}
	
	public Object getProductById(long id) {
		return productRepository.findById(id)
				.orElseThrow(()->new RuntimeException("Product not Found!!"));
	}
	
	public void deleteProduct(long id) {
		productRepository.deleteById(id);
	}
	
	
	
	

}
