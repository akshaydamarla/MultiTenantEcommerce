package soa.controller;

import java.util.Map;

import org.springframework.http.HttpMethod;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import soa.service.GatewayService;

@RestController
@RequestMapping("/")
public class GatewayController {
	
	GatewayService gatewayService;

	public GatewayController(GatewayService gatewayService) {
		this.gatewayService = gatewayService;
	}
	
	@PostMapping("/{service}/{endpoint}")
	public Object getService(@PathVariable String service, @PathVariable String endpoint, @RequestBody Map<String, Object> data) {
		return gatewayService.invokeInstance(HttpMethod.POST, service, endpoint,null, data);
	}
	
	@GetMapping("/{service}/{endpoint}")
	public Object getService(@PathVariable String service, @PathVariable String endpoint) {
		return gatewayService.invokeInstance(HttpMethod.GET, service, endpoint,null, null);
	}
	
	@GetMapping("/{service}/{endpoint}/{id}")
	public Object getService(@PathVariable String service, @PathVariable String endpoint, @PathVariable long id) {
		return gatewayService.invokeInstance(HttpMethod.GET, service, endpoint+'/'+id, null, null);
	}
	
	
	@PutMapping("/{service}/{endpoint}/{id}")
	public Object updateService(@PathVariable String service, @PathVariable String endpoint, @PathVariable long id, @RequestBody Map<String, Object> data) {
		return gatewayService.invokeInstance(HttpMethod.PUT, service, endpoint+'/'+id, null, data);
	}
	
	@DeleteMapping("/{service}/{endpoint}/{id}")
	public Object getDeleeService(@PathVariable String service, @PathVariable String endpoint, @PathVariable long id) {
		return gatewayService.invokeInstance(HttpMethod.DELETE, service, endpoint+'/'+id, null, null);
	}
	
	
	
	

}
