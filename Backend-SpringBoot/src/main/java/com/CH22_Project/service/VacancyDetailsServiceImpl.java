package com.CH22_Project.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.CH22_Project.models.Owner;
import com.CH22_Project.models.VacancyDetails;
import com.CH22_Project.payload.VacancyDetailsDto;
import com.CH22_Project.repository.VacancyDetailsRepository;

@Service
public class VacancyDetailsServiceImpl implements VacancyDetailsService{
	
	@Autowired
	private VacancyDetailsRepository vacancyDetailsRepository;

	@Override
	public VacancyDetails vacancyUpdate(String username, VacancyDetailsDto vacancyDetailsDto) {
		VacancyDetails details=vacancyDetailsRepository.findByOwnerOwnerusername(username);
		details.setVacancy(vacancyDetailsDto.getVacancy());
			return vacancyDetailsRepository.save(details);
	}

	@Override
	public void insertVacancy(Owner owner, String city) {
		VacancyDetails vacancyDetails = new VacancyDetails();
		vacancyDetails.setOwner(owner);
		vacancyDetails.setVacancy("no-vacancy");
		vacancyDetails.setCity(city);
		vacancyDetailsRepository.save(vacancyDetails);
	}

	@Override
	public Page<VacancyDetails> searchHostels(String searchTerm, String vacancyStatus, String city, int page, int size) {
		Pageable pageable = PageRequest.of(page, size);
		 if (searchTerm != null && !searchTerm.isEmpty()) {
	            return vacancyDetailsRepository.searchByKeyword(searchTerm, pageable);
	        }else if (vacancyStatus != null && city != null) {
	            return vacancyDetailsRepository.findByVacancyAndCity(vacancyStatus, city, pageable);
	        } else if (vacancyStatus != null) {
	            return vacancyDetailsRepository.findByVacancy(vacancyStatus, pageable);
	        } else if (city != null) {
	            return vacancyDetailsRepository.findByCity(city, pageable);
	        } else {
	            return (Page<VacancyDetails>) vacancyDetailsRepository.findAll(pageable);
	        }
	}

	@Override
	public Optional<VacancyDetails> getHostel(long vacancy_id) {
		Optional<VacancyDetails> hostelDetail = vacancyDetailsRepository.findById(vacancy_id);
		return hostelDetail;
	}

	@Override
	public VacancyDetails vacancyGet(String username) {
		VacancyDetails details=vacancyDetailsRepository.findByOwnerOwnerusername(username);
		return details;
	}

}
