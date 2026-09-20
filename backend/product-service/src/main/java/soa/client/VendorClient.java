package soa.client;

import java.util.List;

import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import soa.dto.VendorResponse;

@Component
public class VendorClient {

    private final DiscoveryClient discoveryClient;
    private final RestClient restClient;


    public VendorClient(DiscoveryClient discoveryClient) {

        this.discoveryClient = discoveryClient;
        this.restClient = RestClient.builder().build();
    }


    public VendorResponse getMyVendor(
            String authorizationHeader) {

        List<org.springframework.cloud.client.ServiceInstance>
                instances =
                discoveryClient.getInstances("VENDOR-SERVICE");

        if (instances.isEmpty()) {
            throw new RuntimeException(
                    "Vendor Service is not available"
            );
        }

        var instance = instances.get(0);

        String url =
                "http://" +
                instance.getHost() +
                ":" +
                instance.getPort() +
                "/vendors/me";

        return restClient.get()
                .uri(url)
                .header(
                    "Authorization",
                    authorizationHeader
                )
                .retrieve()
                .body(VendorResponse.class);
    }
}