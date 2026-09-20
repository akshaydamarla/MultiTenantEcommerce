package soa.service;

import org.springframework.stereotype.Service;

import soa.client.VendorClient;
import soa.dto.VendorResponse;
import soa.entity.Product;
import soa.repository.ProductRepository;

@Service
public class ProductService {

    ProductRepository productRepository;
    VendorClient vendorClient;


    public ProductService(
            ProductRepository productRepository,
            VendorClient vendorClient) {

        this.productRepository = productRepository;
        this.vendorClient = vendorClient;
    }


    public Object createProduct(
            Product product,
            String authorizationHeader) {

        VendorResponse vendor =
                vendorClient.getMyVendor(authorizationHeader);

        product.setVendorId(vendor.getVendorId());

        return productRepository.save(product);
    }


    public Object getAllProducts() {
        return productRepository.findAll();
    }


    public Object getProductById(long id) {

        return productRepository.findById(id)
                .orElseThrow(
                    () -> new RuntimeException(
                        "Product not Found!!"
                    )
                );
    }


    public void deleteProduct(long id) {
        productRepository.deleteById(id);
    }
}