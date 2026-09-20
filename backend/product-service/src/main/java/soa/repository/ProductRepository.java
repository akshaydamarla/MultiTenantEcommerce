package soa.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import soa.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long>
{

}
