package soa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import soa.entity.Product;

public interface ProductRepository
        extends JpaRepository<Product, Long> {

    List<Product> findByVendorId(long vendorId);
}