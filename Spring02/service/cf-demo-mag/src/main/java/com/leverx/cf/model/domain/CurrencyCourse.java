package com.leverx.cf.model.domain;

import java.util.ArrayList;
import java.util.List;

public class CurrencyCourse extends Currency {
	
	private List<Course> courseList = new ArrayList<Course>();

	public List<Course> getCourseList() {
		return courseList;
	}

	public void setCourseList(List<Course> bookList) {
		this.courseList = bookList;
	}
	
}
