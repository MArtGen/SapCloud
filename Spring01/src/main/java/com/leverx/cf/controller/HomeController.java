package com.leverx.cf.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.leverx.cf.model.domain.Currency;
import com.leverx.cf.service.CurrencyService;

@Controller
@RequestMapping("/")
public class HomeController {
	
	@Autowired
	CurrencyService currencyService;
	
	@GetMapping
	public String getHome(Model model) {
		
		String appName = "DemoApp";
		model.addAttribute("appName", appName);
		
		List<Currency> currencyList = currencyService.getAll();
		model.addAttribute("list", currencyList);
		
		return "index";
	}
	
}
