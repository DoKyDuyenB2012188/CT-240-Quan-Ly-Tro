package backend.hostel.demo.entity;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@Entity
@AllArgsConstructor
@Table (name = "bill")
public class Bill {
	@Id
	@Column (name = "bill_id")
	private String billId;
	@Column (name = "room_id")
	private String roomId;
	@Column (name = "status_id")
	private String statusId;
	@Column (name = "username")
	private String username;
	@Column (name = "created_date")
	private Date createdDate;
	@Column (name = "paid_date")
	private Date paidDate;
	@Column (name = "total_amount")
	private float totalAmount;
	@Column (name = "month")
	private int month;
	@Column (name = "year")
	private int year;  
	

} 
