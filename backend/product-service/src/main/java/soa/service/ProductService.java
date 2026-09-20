package soa.service;

import java.util.List;

import org.springframework.stereotype.Service;

import soa.client.VendorClient;
import soa.dto.VendorResponse;
import soa.entity.Product;
import soa.repository.ProductRepository;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final VendorClient vendorClient;

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
    
    public Object getVendorProductById(
            long id,
            String authorizationHeader) {

        VendorResponse vendor =
                vendorClient.getMyVendor(
                        authorizationHeader
                );

        Product product =
                productRepository.findById(id)
                .orElseThrow(
                    () -> new RuntimeException(
                        "Product not Found!!"
                    )
                );

        if (product.getVendorId()
                != vendor.getVendorId()) {

            throw new RuntimeException(
                "You are not allowed to access this product!"
            );
        }

        return product;
    }

    public Object getVendorProducts(
            String authorizationHeader) {

        VendorResponse vendor =
                vendorClient.getMyVendor(authorizationHeader);

        return productRepository.findByVendorId(
                vendor.getVendorId()
        );
    }

    public Object getProductById(long id) {

        return productRepository.findById(id)
                .orElseThrow(
                    () -> new RuntimeException(
                        "Product not Found!!"
                    )
                );
    }

    public void deleteProduct(
            long id,
            String authorizationHeader) {

        VendorResponse vendor =
                vendorClient.getMyVendor(authorizationHeader);

        Product product =
                productRepository.findById(id)
                .orElseThrow(
                    () -> new RuntimeException(
                        "Product not Found!!"
                    )
                );

        if (product.getVendorId()
                != vendor.getVendorId()) {

            throw new RuntimeException(
                "You are not allowed to delete this product!"
            );
        }

        productRepository.delete(product);
    }
}