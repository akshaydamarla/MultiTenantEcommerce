package soa.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import soa.entity.Order;
import soa.repository.OrderRepository;

@Service
public class OrderService {
	
	OrderRepository repository;

	public OrderService(OrderRepository repository) {
		this.repository = repository;
	}
	
	public Object createOrder(Order order) {
		if(order.getOrderStatus()==null) {
			order.setOrderStatus("PLACED");
		}
		
		if(order.getCreatedAt()==null) {
			order.setCreatedAt(LocalDateTime.now());
		}
		return repository.save(order);
	}
	
	public Object getAllOrders() {
		return repository.findAll();
	}
	
	public Object getOrderById(long id) {
		return repository.findById(id)
				.orElseThrow(()->new RuntimeException("Order not found!"));
	}
	
	public void deleteOrder(long id) {
		repository.deleteById(id);
	}
	

}
