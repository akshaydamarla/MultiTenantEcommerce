package soa.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import soa.entity.Vendor;

public interface VendorRepository extends JpaRepository<Vendor, Long>
{

}
