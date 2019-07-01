package com.leverx.cf.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.leverx.cf.model.domain.Product;
import com.sap.cloud.sdk.odatav2.connectivity.ODataException;
import com.sap.cloud.sdk.odatav2.connectivity.ODataQueryBuilder;
import com.sap.cloud.sdk.odatav2.connectivity.ODataQueryResult;
import com.sap.cloud.sdk.s4hana.connectivity.ErpConfigContext;
import com.sap.cloud.sdk.s4hana.datamodel.odata.namespaces.country.Country;
import com.sap.cloud.sdk.s4hana.datamodel.odata.namespaces.materialdocument.MaterialDocumentHeader;
import com.sap.cloud.sdk.s4hana.datamodel.odata.services.DefaultMaterialDocumentService;

@Service
public class ODataService {
	
	private static final Logger logger = LoggerFactory.getLogger(ODataService.class);
	
	public List<Product> getProductOData(String destinationName) {
		List<Product> productList = new ArrayList<>();
		try {
			
			ODataQueryResult result = ODataQueryBuilder
					.withEntity("/V2/OData/OData.svc", "Products")
					.select("ID", "Name", "Description", "ReleaseDate", "DiscontinuedDate", "Rating", "Price", "Supplier")
					.expand("Supplier")
					.build()
					.execute(destinationName);
			List<Map<String, Object>> productsListMap = result.asListOfMaps();
			productList = getProductList(productsListMap);
			
		} catch (ODataException e) {
			logger.error("Error while trying to get Product data: " + e.getMessage());
		}
		return productList;
	}
	
	private List<Product> getProductList(List<Map<String, Object>> listMap) {
		List<Product> productList = new ArrayList<>();
		listMap.forEach(item -> {
			Product product = new Product();
			product.setId(Long.valueOf(item.get("ID").toString()));
			product.setName(item.get("Name").toString());
			product.setDescription(item.get("Description").toString());
			product.setPrice(item.get("Price").toString());
			product.setRating(Integer.valueOf(item.get("Rating").toString()));
			product.setSupplier(item.get("Supplier"));
			productList.add(product);
		});
		return productList;
	}
	
	public List<Country> getCountryOData(String destinationName) {
		List<Country> countryList = new ArrayList<Country>();
		try {
			
			countryList = ODataQueryBuilder
					.withEntity("/sap/opu/odata/sap/API_COUNTRY_SRV", "A_Country")
					.select("Country", "CountryCurrency", "CountryThreeLetterISOCode", "CountryThreeDigitISOCode")
					.build()
					.execute(destinationName)
					.asList(Country.class);
			
		} catch (ODataException e) {
			logger.error("Error while trying to get Country data: " + e.getMessage());
		}
		return countryList;
	}
	
	public List<MaterialDocumentHeader> getMaterialDocHeaderOData(String destinationName) {
		List<MaterialDocumentHeader> materialDocList= new ArrayList<MaterialDocumentHeader>();
		try {
			
			materialDocList = new DefaultMaterialDocumentService()
			            .getAllMaterialDocumentHeader()
			            .execute(new ErpConfigContext(destinationName));
			
		} catch (ODataException e) {
			logger.error("Error while trying to get Material Document Header data: " + e.getMessage());
		}
		return materialDocList;
	}
	
}
