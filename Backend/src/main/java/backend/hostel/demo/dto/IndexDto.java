package backend.hostel.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class IndexDto {
	private String roomId;

	private int month;
	
	private int year;
	
	private int indexOfWater;
	
	private int indexOfElectricity;
	
}
