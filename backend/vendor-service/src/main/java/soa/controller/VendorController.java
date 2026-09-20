package soa.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import soa.entity.Vendor;
import soa.service.VendorService;

@RestController
@RequestMapping("/vendors")
public class VendorController {
	
	VendorService service;

	public VendorController(VendorService service) {
		this.service = service;
	}
	
	@PostMapping
	public Object createVendor(
	        @RequestBody Vendor vendor,
	        Authentication authentication) {

	    JwtAuthenticationToken jwtAuth =
	            (JwtAuthenticationToken) authentication;

	    Long userId = ((Number) jwtAuth
	            .getToken()
	            .getClaims()
	            .get("userId"))
	            .longValue();

	    return service.createVendor(vendor, userId);
	}
	
	@GetMapping
	public Object getAllVendors() {
		return service.getAllVendors();
	}
	
	@GetMapping("/{id}")
	public Object getVendorById(@PathVariable long id) {
		return service.getVendorById(id);
	}
	
	@DeleteMapping("/{id}")
	public String deleteVendorById(@PathVariable long id) {
		service.deleteVendor(id);
		return "Vendor Deleted SuccessFully";
	}
	
	@GetMapping("/me")
	public Object getMyVendor(Authentication authentication) {

	    JwtAuthenticationToken jwtAuth =
	            (JwtAuthenticationToken) authentication;

	    Long userId = ((Number) jwtAuth
	            .getToken()
	            .getClaims()
	            .get("userId"))
	            .longValue();

	    return service.getVendorByUserId(userId);
	}
	
	
	
	
	

}
