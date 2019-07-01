package com.leverx.cf.model.domain;

public class Course {
	
	private long coid;
	
	private long cuid;
	
	private String date;
	
	private String value;
	
	private String createdby;
	
	private String createdon;

	public long getCoid() {
		return coid;
	}

	public void setCoid(long coid) {
		this.coid = coid;
	}

	public long getCuid() {
		return cuid;
	}

	public void setCuid(long cuid) {
		this.cuid = cuid;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getCreatedby() {
		return createdby;
	}

	public void setCreatedby(String createdby) {
		this.createdby = createdby;
	}

	public String getCreatedon() {
		return createdon;
	}

	public void setCreatedon(String createdon) {
		this.createdon = createdon;
	}

}
