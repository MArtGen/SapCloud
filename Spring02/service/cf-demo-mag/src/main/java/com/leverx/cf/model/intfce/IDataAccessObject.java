package com.leverx.cf.model.intfce;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public interface IDataAccessObject<T, K> {
	
	public Optional<T> getById(K id);

	public List<T> getAll();

	public void save(T entity) throws SQLException;

	public void delete(K id);

	public void update(T entity);
	
}
