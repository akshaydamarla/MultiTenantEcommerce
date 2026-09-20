package soa.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import soa.dto.OrderRequest;
import soa.entity.Order;
import soa.service.OrderService;

@RestController
@RequestMapping("/orders")
public class OrderController {

    OrderService service;


    public OrderController(OrderService service) {
        this.service = service;
    }


    @PostMapping
    public Object createOrder(
            @RequestBody OrderRequest orderRequest,
            Authentication authentication,
            @RequestHeader("Authorization") String authorizationHeader) {

        JwtAuthenticationToken jwtAuth =
                (JwtAuthenticationToken) authentication;


        Long userId =
                ((Number) jwtAuth
                        .getToken()
                        .getClaims()
                        .get("userId"))
                        .longValue();


        return service.createOrder(
                orderRequest,
                userId,
                authorizationHeader
        );
    }


    @GetMapping
    public Object getAllOrders() {
        return service.getAllOrders();
    }


    @GetMapping("/{id}")
    public Object getOrderById(
            @PathVariable long id) {

        return service.getOrderById(id);
    }


    @DeleteMapping("/{id}")
    public Object deleteOrderById(
            @PathVariable long id) {

        service.deleteOrder(id);

        return "Order Deleted Successfully";
    }
}