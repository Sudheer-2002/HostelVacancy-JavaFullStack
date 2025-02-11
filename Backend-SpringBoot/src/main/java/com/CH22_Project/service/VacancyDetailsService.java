package com.CH22_Project.service;


import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.CH22_Project.models.Owner;
import com.CH22_Project.models.VacancyDetails;
import com.CH22_Project.payload.VacancyDetailsDto;

@Service
public interface VacancyDetailsService {

	VacancyDetails vacancyUpdate(String username, VacancyDetailsDto vacancyDetailsDto);

	void insertVacancy(Owner owner, String city);

	Page<VacancyDetails> searchHostels(String searchTerm, String vacancyStatus, String city, int page, int size);

	Optional<VacancyDetails> getHostel(long vacancy_id);

	VacancyDetails vacancyGet(String username);

}
