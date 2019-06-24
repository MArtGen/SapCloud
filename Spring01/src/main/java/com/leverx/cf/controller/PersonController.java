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

import com.leverx.cf.model.domain.Book;
import com.leverx.cf.model.domain.Person;
import com.leverx.cf.service.PersonService;
import com.leverx.cf.util.Pair;


@RestController
@RequestMapping("/personApi")
public class PersonController {
	
	@Autowired
	private PersonService personService;
	
	@GetMapping("/{id}/books")
	public Pair<Person, List<Book>> personBookList(@PathVariable Long id) {
		return personService.getBookList(id);
	}
	
	@GetMapping("/all")
	public List<Person> personGetAll() {
		return personService.getAll();
	}
	
	@GetMapping("/{id}")
	public Person personGetbyId(@PathVariable Long id) {
		return personService.getById(id);
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public void personCreate(@RequestBody Person person) {
		personService.save(person);
	}
	
	@PutMapping
	@ResponseStatus(HttpStatus.OK)
	public void updatePerson(@RequestBody Person person) {
		personService.update(person);
	}
	
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public void deletePerson(@PathVariable Long id) {
		personService.delete(id);
	}
	
}
