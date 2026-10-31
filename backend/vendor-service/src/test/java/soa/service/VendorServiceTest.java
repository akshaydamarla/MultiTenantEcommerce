package soa.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import soa.entity.Vendor;
import soa.repository.VendorRepository;

@ExtendWith(MockitoExtension.class)
class VendorServiceTest {

    @Mock
    private VendorRepository repository;

    @InjectMocks
    private VendorService vendorService;

    private Vendor vendor;

    @BeforeEach
    void setUp() {

        vendor = new Vendor();

        vendor.setVendorId(1L);
        vendor.setName("TechWorld Store");
        vendor.setEmail("techworld@gmail.com");
        vendor.setContactNumber("9876543210");
        vendor.setUserId(101L);
    }

    // Test 1: Successfully create vendor

    @Test
    void testCreateVendorSuccessfully() {

        when(repository.existsByUserId(101L))
                .thenReturn(false);

        when(repository.save(vendor))
                .thenReturn(vendor);

        Object result = vendorService.createVendor(vendor, 101L);

        assertNotNull(result);
        assertEquals(101L, vendor.getUserId());

        verify(repository).save(vendor);
    }

    // Test 2: Prevent duplicate vendor profile

    @Test
    void testCreateVendorWithExistingUser() {

        when(repository.existsByUserId(101L))
                .thenReturn(true);

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> vendorService.createVendor(vendor, 101L)
        );

        assertEquals(
                "User already has a vendor profile!",
                exception.getMessage()
        );

        verify(repository, never()).save(any(Vendor.class));
    }

    // Test 3: Get all vendors

    @Test
    void testGetAllVendors() {

        when(repository.findAll())
                .thenReturn(Arrays.asList(vendor));

        Object result = vendorService.getAllVendors();

        assertNotNull(result);
        assertEquals(1, ((java.util.List<?>) result).size());

        verify(repository).findAll();
    }

    // Test 4: Get vendor by ID

    @Test
    void testGetVendorByIdSuccessfully() {

        when(repository.findById(1L))
                .thenReturn(Optional.of(vendor));

        Object result = vendorService.getVendorById(1L);

        assertNotNull(result);
        assertEquals("TechWorld Store", ((Vendor) result).getName());

        verify(repository).findById(1L);
    }

    // Test 5: Vendor not found by ID

    @Test
    void testGetVendorByIdNotFound() {

        when(repository.findById(99L))
                .thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> vendorService.getVendorById(99L)
        );

        assertEquals("Vendor not found!", exception.getMessage());
    }

    // Test 6: Get vendor by user ID

    @Test
    void testGetVendorByUserIdSuccessfully() {

        when(repository.findByUserId(101L))
                .thenReturn(Optional.of(vendor));

        Object result = vendorService.getVendorByUserId(101L);

        assertNotNull(result);
        assertEquals(101L, ((Vendor) result).getUserId());

        verify(repository).findByUserId(101L);
    }

    // Test 7: Delete vendor

    @Test
    void testDeleteVendor() {

        doNothing().when(repository).deleteById(1L);

        vendorService.deleteVendor(1L);

        verify(repository).deleteById(1L);
    }
}