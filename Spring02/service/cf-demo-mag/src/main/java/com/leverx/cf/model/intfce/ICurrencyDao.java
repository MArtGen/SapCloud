package com.leverx.cf.model.intfce;

import java.util.List;

import com.leverx.cf.model.domain.Course;
import com.leverx.cf.model.domain.Currency;
import com.leverx.cf.util.Pair;

public interface ICurrencyDao extends IDataAccessObject<Currency, Long> {
	List<Currency> getByName(String name);
	
	Pair<Currency, List<Course>> getCurrencyList(Long id);
}