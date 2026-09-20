package soa.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import soa.entity.OrderItem;
import soa.service.OrderItemService;

@RestController
@RequestMapping("/order-items")
public class OrderItemController {
	
	OrderItemService service;

    public OrderItemController(OrderItemService service) {

        this.service = service;

    }

    @PostMapping
    public Object createOrderItem(@RequestBody OrderItem orderItem) {
        return service.createOrderItem(orderItem);
    }

    @GetMapping
    public Object getAllOrderItems() {
        return service.getAllOrderItems();
    }

    @GetMapping("/{id}")
    public Object getOrderItemById(@PathVariable long id) {
        return service.getOrderItemById(id);
    }
    
    @DeleteMapping("/{id}")
    public String deleteOrderItem(@PathVariable long id) {
        service.deleteOrderItem(id);
        return "Order Item Deleted Successfully";

    }

}
