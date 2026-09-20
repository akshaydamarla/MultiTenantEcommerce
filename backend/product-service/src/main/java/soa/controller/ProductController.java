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

import soa.entity.Product;
import soa.service.ProductService;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @PostMapping
    public Object createProduct(
            @RequestBody Product product,
            @RequestHeader("Authorization")
            String authorizationHeader) {

        return service.createProduct(
                product,
                authorizationHeader
        );
    }

    @GetMapping
    public Object getAllProducts(
            Authentication authentication,
            @RequestHeader("Authorization")
            String authorizationHeader) {

        if (isVendor(authentication)) {
            return service.getVendorProducts(
                    authorizationHeader
            );
        }

        return service.getAllProducts();
    }

    @GetMapping("/{id}")
    public Object getProductById(
            @PathVariable long id,
            Authentication authentication,
            @RequestHeader("Authorization")
            String authorizationHeader) {

        if (isVendor(authentication)) {
            return service.getVendorProductById(
                    id,
                    authorizationHeader
            );
        }

        return service.getProductById(id);
    }

    @DeleteMapping("/{id}")
    public String deleteProduct(
            @PathVariable long id,
            @RequestHeader("Authorization")
            String authorizationHeader) {

        service.deleteProduct(
                id,
                authorizationHeader
        );

        return "Product Deleted successfully";
    }

    private boolean isVendor(
            Authentication authentication) {

        JwtAuthenticationToken jwtAuth =
                (JwtAuthenticationToken)
                        authentication;

        String role =
                jwtAuth.getToken()
                        .getClaimAsString("role");

        return "VENDOR".equals(role);
    }
}