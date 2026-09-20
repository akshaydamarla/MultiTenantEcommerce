package soa.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import soa.client.ProductClient;
import soa.dto.OrderItemRequest;
import soa.dto.OrderRequest;
import soa.dto.ProductResponse;
import soa.entity.Order;
import soa.entity.OrderItem;
import soa.repository.OrderItemRepository;
import soa.repository.OrderRepository;

@Service
public class OrderService {

    OrderRepository repository;
    OrderItemRepository orderItemRepository;
    ProductClient productClient;


    public OrderService(
            OrderRepository repository,
            OrderItemRepository orderItemRepository,
            ProductClient productClient) {

        this.repository = repository;
        this.orderItemRepository = orderItemRepository;
        this.productClient = productClient;
    }


    public Object createOrder(
            OrderRequest orderRequest,
            long userId,
            String authorizationHeader) {

        validateOrderRequest(orderRequest);


        Order order = new Order();

        order.setUserId(userId);
        order.setOrderStatus("PLACED");
        order.setCreatedAt(LocalDateTime.now());


        double totalAmount = 0;


        Order savedOrder = repository.save(order);


        for (OrderItemRequest itemRequest :
                orderRequest.getItems()) {

            ProductResponse product =
                    productClient.getProduct(
                            itemRequest.getProductId(),
                            authorizationHeader
                    );


            validateStock(
                    product,
                    itemRequest.getQuantity()
            );


            double itemTotal =
                    product.getPrice() *
                    itemRequest.getQuantity();


            totalAmount += itemTotal;


            OrderItem orderItem = new OrderItem();

            orderItem.setOrderId(
                    savedOrder.getOrderid()
            );

            orderItem.setProductId(
                    product.getProductId()
            );

            orderItem.setVendorId(
                    product.getVendorId()
            );

            orderItem.setQuantity(
                    itemRequest.getQuantity()
            );

            orderItem.setPrice(
                    product.getPrice()
            );


            orderItemRepository.save(orderItem);
        }


        savedOrder.setTotalAmount(totalAmount);

        return repository.save(savedOrder);
    }


    private void validateOrderRequest(
            OrderRequest orderRequest) {

        if (orderRequest == null ||
                orderRequest.getItems() == null ||
                orderRequest.getItems().isEmpty()) {

            throw new RuntimeException(
                    "Order must contain at least one product"
            );
        }
    }


    private void validateStock(
            ProductResponse product,
            int quantity) {

        if (quantity <= 0) {
            throw new RuntimeException(
                    "Quantity must be greater than zero"
            );
        }


        if (product.getStockQuantity() < quantity) {

            throw new RuntimeException(
                    "Insufficient stock for product: "
                    + product.getName()
            );
        }
    }


    public Object getAllOrders() {
        return repository.findAll();
    }


    public Object getOrderById(long id) {

        return repository.findById(id)
                .orElseThrow(
                    () -> new RuntimeException(
                        "Order not found!"
                    )
                );
    }


    public void deleteOrder(long id) {
        repository.deleteById(id);
    }
}