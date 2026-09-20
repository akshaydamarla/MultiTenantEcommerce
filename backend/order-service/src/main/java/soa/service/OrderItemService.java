package soa.service;

import org.springframework.stereotype.Service;

import soa.entity.OrderItem;
import soa.repository.OrderItemRepository;

@Service
public class OrderItemService {
	
	OrderItemRepository repository;
	
	public OrderItemService(OrderItemRepository repository) {

        this.repository = repository;

    }
	
    public Object createOrderItem(OrderItem orderItem) {
        return repository.save(orderItem);
    }

    public Object getAllOrderItems() {
        return repository.findAll();
    }

    public Object getOrderItemById(long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order Item not found!"));
    }

    public void deleteOrderItem(long id) {
        repository.deleteById(id);
    }

}
