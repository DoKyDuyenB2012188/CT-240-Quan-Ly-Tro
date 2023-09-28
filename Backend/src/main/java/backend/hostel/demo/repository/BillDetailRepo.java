package backend.hostel.demo.repository;

import org.springframework.data.repository.CrudRepository;

import backend.hostel.demo.entity.BillDetail;

public interface BillDetailRepo extends CrudRepository<BillDetail, String> {

	
}
