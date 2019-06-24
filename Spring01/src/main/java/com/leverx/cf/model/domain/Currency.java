package com.leverx.cf.model.domain;

public class Currency {
	
	private Long cuid;
	
	private String name;
	
	private String createdby;
	
	private String createdon;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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

	public Long getCuid() {
		return cuid;
	}

	public void setCuid(Long cuid) {
		this.cuid = cuid;
	}

}