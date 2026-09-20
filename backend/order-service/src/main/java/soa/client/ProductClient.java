package soa.client;

import java.util.List;

import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import soa.dto.ProductResponse;

@Component
public class ProductClient {

    private final DiscoveryClient discoveryClient;
    private final RestClient restClient;


    public ProductClient(DiscoveryClient discoveryClient) {

        this.discoveryClient = discoveryClient;
        this.restClient = RestClient.builder().build();
    }


    public ProductResponse getProduct(
            long productId,
            String authorizationHeader) {

        List<org.springframework.cloud.client.ServiceInstance>
                instances =
                discoveryClient.getInstances("PRODUCT-SERVICE");

        if (instances.isEmpty()) {
            throw new RuntimeException(
                    "Product Service is not available"
            );
        }

        var instance = instances.get(0);

        String url =
                "http://" +
                instance.getHost() +
                ":" +
                instance.getPort() +
                "/products/" +
                productId;

        return restClient.get()
                .uri(url)
                .header(
                    "Authorization",
                    authorizationHeader
                )
                .retrieve()
                .body(ProductResponse.class);
    }
}