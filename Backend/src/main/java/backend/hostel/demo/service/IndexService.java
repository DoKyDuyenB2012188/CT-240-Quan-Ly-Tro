package backend.hostel.demo.service;

import org.springframework.stereotype.Service;

import backend.hostel.demo.dto.IndexDto;

@Service
public interface IndexService {
	Iterable<IndexDto> getIndexes();

	Iterable<IndexDto> getIndexesByMonth();

	IndexDto getIndexesByRoom(String roomId);

	IndexDto createIndex(IndexDto indexDto);

	IndexDto updateIndex(IndexDto index);

	IndexDto deleteIndex(String roomId, int mouth, int year);
}
