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
	private CurrencyDao currencyDao;
	
	public Pair<Currency, List<Course>> getCurrencyList(Long id) {
		return currencyDao.getCurrencyList(id);
	}
	
	public List<Currency> getByName(String name) {
		return currencyDao.getByName(name);
	}
	
	public void update(Currency entity) {
		currencyDao.update(entity);
	}
	
	public void delete(Long id) {
		currencyDao.delete(id);
	}
	
	public void save(Currency entity) {
		currencyDao.save(entity);
	}
	
	public List<Currency> getAll() {
		return currencyDao.getAll();
	}
	
	public Currency getById(Long id) {
		Optional<Currency> currencyOptional = currencyDao.getById(id);
		Currency currency = null;
		if (currencyOptional.isPresent()) {
			currency = currencyOptional.get();
		}
		return currency;
	}
	
}
