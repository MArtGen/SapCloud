package com.leverx.cf.model.domain;

import java.sql.Date;

public class Product {
	
	private long id;
	
	private String name;
	
	private String description;
	
	private Date releaseDate;
	
	private Date discontinuedDate;
	
	private int rating;
	
	private String price;
	
	private Object supplier;

	public long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getReleaseDate() {
		return releaseDate;
	}

	public void setReleaseDate(Date releaseDate) {
		this.releaseDate = releaseDate;
	}

	public Date getDiscontinuedDate() {
		return discontinuedDate;
	}

	public void setDiscontinuedDate(Date discontinuedDate) {
		this.discontinuedDate = discontinuedDate;
	}

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public Object getSupplier() {
		return supplier;
	}

	public void setSupplier(Object supplier) {
		this.supplier = supplier;
	}
	
}
