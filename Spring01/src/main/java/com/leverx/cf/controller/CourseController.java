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
import com.leverx.cf.model.domain.Course;

@RestController
@RequestMapping("/courseApi")
public class CourseController {
	
	@Autowired
	private CourseDao courseDao;
	
	@GetMapping("/{id}")
	public Course getCourseById(@PathVariable Long id) {
		Optional<Course> courseOptional = courseDao.getById(id);
		Course course = null;
		if (courseOptional.isPresent()) {
			course = courseOptional.get();
		}
		return course;
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public void createBook(@RequestBody Course course) throws SQLException {
		courseDao.save(course);
	}
	
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public void deleteBook(@PathVariable Long id) {
		courseDao.delete(id);
	}
	
	@PutMapping
	@ResponseStatus(HttpStatus.OK)
	public void changeBook(@RequestBody Course course) {
		courseDao.update(course);
	}
	
	@GetMapping("/all")
	public List<Course> getAllBooks() {
		return courseDao.getAll();
	}

}
