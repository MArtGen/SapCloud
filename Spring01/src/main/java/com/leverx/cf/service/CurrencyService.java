package com.leverx.cf.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.leverx.cf.model.dao.CurrencyDao;
import com.leverx.cf.model.domain.Course;
import com.leverx.cf.model.domain.Currency;
import com.leverx.cf.util.Pair;

@Service
public class CurrencyService {
	
	@Autowired
	private CurrencyDao personDao;
	
	public Pair<Currency, List<Course>> getBookList(Long id) {
		return currencyDao.getBookList(id);
	}
	
	public List<Currency> getByName(String name) {
		return currencyDao.getByName(name);
	}
	
	public void update(Person entity) {
		personDao.update(entity);
	}
	
	public void delete(Long id) {
		personDao.delete(id);
	}
	
	public void save(Person entity) {
		personDao.save(entity);
	}
	
	public List<Person> getAll() {
		return personDao.getAll();
	}
	
	public Person getById(Long id) {
		Optional<Person> personOptional = personDao.getById(id);
		Person person = null;
		if (personOptional.isPresent()) {
			person = personOptional.get();
		}
		return person;
	}
	
}
