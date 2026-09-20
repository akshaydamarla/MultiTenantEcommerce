package soa.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import soa.entity.Vendor;

public interface VendorRepository extends JpaRepository<Vendor, Long>
{
	Optional<Vendor> findByUserId(long userId);
}
