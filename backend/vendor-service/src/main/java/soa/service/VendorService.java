package soa.service;

import org.springframework.stereotype.Service;

import soa.entity.Vendor;
import soa.repository.VendorRepository;

@Service
public class VendorService {
	
	VendorRepository repository;

	public VendorService(VendorRepository repository) {
		this.repository = repository;
	}
	
	public Object createVendor(Vendor vendor) {
		return repository.save(vendor);
	}
	
	public Object getAllVendors() {
		return repository.findAll();
	}
	
	public Object getVendorById(long id) {
		return repository.findById(id)
				.orElseThrow(()->new RuntimeException("Vendor not found!"));
	}
	
	public void deleteVendor(long id) {
		repository.deleteById(id);
	}
	

}
