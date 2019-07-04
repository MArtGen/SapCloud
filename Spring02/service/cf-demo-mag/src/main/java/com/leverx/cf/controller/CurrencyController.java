package com.leverx.cf.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.leverx.cf.model.domain.Course;
import com.leverx.cf.model.domain.Currency;
import com.leverx.cf.util.Pair;
import com.leverx.cf.model.dao.CurrencyDao;

@RestController
@RequestMapping("/api/currency")
public class CurrencyController {
	
	@Autowired
	private CurrencyDao currencyDao;

	@GetMapping("/{id}")
	public Optional<Currency> getCurrencybyId(@PathVariable Long id) {
		return currencyDao.getById(id);
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public void createCurrency(@RequestBody Currency currency) {
		currencyDao.save(currency);
	}
	
	@PutMapping
	@ResponseStatus(HttpStatus.OK)
	public void updateCurrency(@RequestBody Currency currency) {
		currencyDao.update(currency);
	}
	
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public void deleteCurrency(@PathVariable Long id) {
		currencyDao.delete(id);
	}
	
	@GetMapping
	public List<Currency> getAllCurrency() {
		return currencyDao.getAll();
	}
	
	@GetMapping("/{id}/course")
	public Pair<Currency, List<Course>> getCurrencyList(@PathVariable Long id) {
		return currencyDao.getCurrencyList(id);
	}
	
	@GetMapping(params={"name"})
	public List<Currency> getCurrencyListByName(@RequestParam String name) {
		return currencyDao.getByName(name);
	}
	
}
