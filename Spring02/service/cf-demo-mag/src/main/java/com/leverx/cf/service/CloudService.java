package com.leverx.cf.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.leverx.cf.model.domain.Destination;
import com.sap.cloud.sdk.cloudplatform.ScpCfCloudPlatform;
import com.sap.cloud.sdk.cloudplatform.connectivity.DestinationAccessor;
import com.sap.cloud.sdk.cloudplatform.connectivity.GenericDestination;
import com.sap.cloud.sdk.cloudplatform.security.AuthToken;
import com.sap.cloud.sdk.cloudplatform.security.AuthTokenAccessor;
import com.auth0.jwt.interfaces.DecodedJWT;

import com.leverx.cf.model.domain.Property;

@Service
public class CloudService {
	
	@Autowired
	private ScpCfCloudPlatform platform;
	
	public String getApplicationName() {
		return platform.getApplicationName();
	}

	public String getUserInfo() {
		Optional<AuthToken> auth = AuthTokenAccessor.getCurrentToken();
		if (!auth.isPresent()) {
			return null;
		}
		DecodedJWT jwtToken = auth.get().getJwt();
		String userInfo = jwtToken.getClaim("given_name").asString() + " " +
						  jwtToken.getClaim("family_name").asString();
		return userInfo;
	}
	
	public List<Destination> getDestinations() {
		List<Destination> destinationList = new ArrayList<Destination>();
		Map<String, GenericDestination> destinationMap = DestinationAccessor.getGenericDestinationsByName();
		destinationMap.forEach((key, value) -> {
			Destination destination = new Destination();
			destination.setName(value.getName());
			destination.setDescription(value.getDescription().orElseGet(() -> {
				return "No description";
			}));
			destination.setDestinationType(value.getDestinationType().toString());
			Map<String, String> propertyMap = value.getPropertiesByName();
			List<Property> propertyList = new ArrayList<Property>();
			propertyMap.forEach((name, data) -> {
				Property property = new Property();
				property.setName(name);
				property.setValue(data);
				propertyList.add(property);
			});
			destination.setPropertyList(propertyList);
			destinationList.add(destination);
		});
		return destinationList;
	}
}
