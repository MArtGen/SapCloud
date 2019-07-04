package com.leverx.cf.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.leverx.cf.model.domain.Product;
import com.leverx.cf.service.ODataService;
import com.sap.cloud.sdk.s4hana.datamodel.odata.namespaces.country.Country;
import com.sap.cloud.sdk.s4hana.datamodel.odata.namespaces.materialdocument.MaterialDocumentHeader;

@RestController
@RequestMapping("api/odata")
public class ODataController {
	
	@Autowired
	private ODataService odataService;
	
	@GetMapping("/purchase-order")
	public List<MaterialDocumentHeader> getAllPurchaseOrder() {
		return odataService.getMaterialDocHeaderOData("S4C");
	}
	
	@GetMapping("/product")
	public List<Product> getAllProduct() {
		return odataService.getProductOData("data");
	}
	
	@GetMapping("/country")
	public List<Country> getAllCountry() {
		return odataService.getCountryOData("S4C");
	}

}
