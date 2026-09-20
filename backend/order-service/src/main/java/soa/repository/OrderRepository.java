package soa.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import soa.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long>
{

}
