package com.leverx.cf.controller;

import java.sql.SQLException;
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
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.leverx.cf.model.dao.CourseDao;
import com.leverx.cf.model.domain.Book;

@RestController
@RequestMapping("/bookApi")
public class BookController {
	
	@Autowired
	private CourseDao courseDao;
	
	@GetMapping("/{id}")
	public Book getBookById(@PathVariable Long id) {
		Optional<Book> bookOptional = courseDao.getById(id);
		Book book = null;
		if (bookOptional.isPresent()) {
			book = bookOptional.get();
		}
		return book;
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public void createBook(@RequestBody Book book) throws SQLException {
		courseDao.save(book);
	}
	
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public void deleteBook(@PathVariable Long id) {
		courseDao.delete(id);
	}
	
	@PutMapping
	@ResponseStatus(HttpStatus.OK)
	public void changeBook(@RequestBody Book book) {
		courseDao.update(book);
	}
	
	@GetMapping("/all")
	public List<Book> getAllBooks() {
		return courseDao.getAll();
	}

}
