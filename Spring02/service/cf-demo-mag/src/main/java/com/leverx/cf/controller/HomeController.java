package com.leverx.cf.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.leverx.cf.model.domain.Destination;
import com.leverx.cf.model.domain.TokenInfo;
import com.leverx.cf.service.CloudService;
import com.leverx.cf.service.SecurityService;
import com.sap.cloud.sdk.cloudplatform.ScpCfCloudPlatform;
import com.sap.cloud.sdk.s4hana.connectivity.exception.AccessDeniedException;

@Controller
public class HomeController {
	
	@Autowired
	private ScpCfCloudPlatform platform;
	
	@Autowired
	private CloudService cloudService;
	
	@Autowired 
	private SecurityService securityService;
	

	@RequestMapping(value="/", method=RequestMethod.GET)
	public String getHome(Model model) {
		String appName = platform.getApplicationName();
		model.addAttribute("appName", appName);
		List<Destination> destinations = cloudService.getDestinations();
		model.addAttribute("destinations", destinations);
		return "index";
	}
	
	@RequestMapping(value="/auth", method=RequestMethod.GET)
	public String getAuth(Model model) {
		List<String> scopes = securityService.getScopes();
		model.addAttribute("scopes", scopes);
		TokenInfo token = securityService.getTokenInfo();
		model.addAttribute("token", token);
		return "auth";
	}
	
	@RequestMapping(value="/scope", method=RequestMethod.GET)
	public String checkScope() throws AccessDeniedException {
		securityService.userHasAuthorization("Display");
		return "scope";
	}
	
	@RequestMapping(value="/scopeFail", method=RequestMethod.GET)
	public String checkScopeFailed() throws AccessDeniedException {
		securityService.userHasAuthorization("Download");
		return "scope";
	}

}
