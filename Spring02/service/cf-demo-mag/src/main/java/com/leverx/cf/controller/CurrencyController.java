package com.leverx.cf.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.leverx.cf.model.domain.Course;
import com.leverx.cf.model.domain.Currency;
import com.leverx.cf.service.CurrencyService;
import com.leverx.cf.util.Pair;


@RestController
@RequestMapping("/currencyApi")
public class CurrencyController {
	
	@Autowired
	private CurrencyService currencyService;
	
	@GetMapping("/{id}/currency")
	public Pair<Currency, List<Course>> currencyCourseList(@PathVariable Long id) {
		return currencyService.getCurrencyList(id);
	}
	
	@GetMapping("/all")
	public List<Currency> currencyGetAll() {
		return currencyService.getAll();
	}
	
	@GetMapping("/{id}")
	public Currency currencyGetbyId(@PathVariable Long id) {
		return currencyService.getById(id);
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public void currencyCreate(@RequestBody Currency currency) {
		currencyService.save(currency);
	}
	
	@PutMapping
	@ResponseStatus(HttpStatus.OK)
	public void updatePerson(@RequestBody Currency currency) {
		currencyService.update(currency);
	}
	
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public void deletePerson(@PathVariable Long id) {
		currencyService.delete(id);
	}
	
}
