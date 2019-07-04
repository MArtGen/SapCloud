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

import com.leverx.cf.model.domain.Course;
import com.leverx.cf.model.dao.CourseDao;

@RestController
@RequestMapping("/api/course")
public class CourseController {
	
	@Autowired
	private CourseDao courseDao;
	
	@GetMapping("/{id}")
	public Optional<Course> getCourseById(@PathVariable Long id) {
		return courseDao.getById(id);
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public void createCourse(@RequestBody Course course) throws SQLException {
		courseDao.save(course);
	}
	
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public void deleteCourse(@PathVariable Long id) {
		courseDao.delete(id);
	}
	
	@PutMapping
	@ResponseStatus(HttpStatus.OK)
	public void changeCourse(@RequestBody Course course) {
		courseDao.update(course);
	}
	
	@GetMapping
	public List<Course> getAllCourse() {
		return courseDao.getAll();
	}

}
