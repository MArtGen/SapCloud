package com.leverx.cf.model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.leverx.cf.model.domain.Course;
import com.leverx.cf.model.domain.Currency;
import com.leverx.cf.model.intfce.ICurrencyDao;
import com.leverx.cf.util.Pair;

@Repository
public class CurrencyDao implements ICurrencyDao {

	private static final Logger logger = LoggerFactory.getLogger(CurrencyDao.class);

	public static final String CURRENCY_TABLE = "CURRENSY";

	@Autowired
	private DataSource dataSource;

	@Override
	public Optional<Currency> getById(Long id) {
		Optional<Currency> entity = null;
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn
						.prepareStatement(
								"SELECT TOP 1 \"cuid\", \"name\", \"createdby\", \"createdon\" FROM " + CURRENCY_TABLE + " WHERE \"cuid\" = ?")) {
			stmnt.setLong(1, id);
			ResultSet result = stmnt.executeQuery();
			if (result.next()) {
				Currency currency = new Currency();
				currency.setCuid(id);
				currency.setName(result.getString("name"));
				currency.setCreatedby(result.getString("createdby"));
				currency.setCreatedon(result.getString("createdon"));
				entity = Optional.of(currency);
			} else {
				entity = Optional.empty();
			}
		} catch (SQLException e) {
			logger.error("Error while trying to get entity by Id: " + e.getMessage());
		}
		return entity;
	}

	@Override
	public List<Currency> getAll() {
		List<Currency> currencyList = new ArrayList<Currency>();
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn
						.prepareStatement("SELECT \"cuid\", \"name\", \"createdby\", \"createdon\" FROM " + CURRENCY_TABLE)) {
			ResultSet result = stmnt.executeQuery();
			while (result.next()) {
				Currency currency = new Currency();
				currency.setCuid(result.getLong("cuid"));
				currency.setName(result.getString("name"));
				currency.setCreatedby(result.getString("createdby"));
				currency.setCreatedon(result.getString("createdon"));
				currencyList.add(currency);
			}
		} catch (SQLException e) {
			logger.error("Error while trying to get list of entities: " + e.getMessage());
		}
		return currencyList;
	}

	@Override
	public void save(Currency entity) {
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement(
						"INSERT INTO " + CURRENCY_TABLE + "(\"name\", \"createdby\", \"createdon\") VALUES (?, ?, ?)")) {
			stmnt.setString(1, entity.getName());
			stmnt.setString(2, entity.getCreatedby());
			stmnt.setString(3, entity.getCreatedon());
			stmnt.execute();
		} catch (SQLException e) {
			logger.error("Error while trying to add entity: " + e.getMessage());
		}
	}

	@Override
	public void delete(Long id) {
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement("DELETE FROM " + CURRENCY_TABLE + " WHERE \"cuid\" = ?")) {
			stmnt.setLong(1, id);
			stmnt.execute();
		} catch (SQLException e) {
			logger.error("Error while trying to delete entity: " + e.getMessage());
		}
	}

	@Override
	public void update(Currency entity) {
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement(
						"UPDATE " + CURRENCY_TABLE + " SET \"name\" = ?, \"createdby\" = ?, \"createdon\" = ? WHERE \"cuid\" = ?")) {
			stmnt.setString(1, entity.getName());
			stmnt.setString(2, entity.getCreatedby());
			stmnt.setString(3, entity.getCreatedon());
			stmnt.setLong(4, entity.getCuid());
			stmnt.executeUpdate();
		} catch (SQLException e) {
			logger.error("Error while trying to update entity: " + e.getMessage());
		}
	}

	@Override
	public List<Currency> getByName(String name) {
		List<Currency> currencyList = new ArrayList<Currency>();
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement(
						"SELECT \"cuid\", \"name\", \"createdby\", \"createdon\" FROM " + CURRENCY_TABLE + " WHERE \"name\" = ?")) {
			stmnt.setString(1, name);
			ResultSet result = stmnt.executeQuery();
			while (result.next()) {
				Currency currency = new Currency();
				currency.setCuid(result.getLong("cuid"));
				currency.setName(result.getString("name"));
				currency.setCreatedby(result.getString("createdby"));
				currency.setCreatedon(result.getString("createdon"));
				currencyList.add(currency);
			}
		} catch (SQLException e) {
			logger.error("Error while trying to get entries: " + e.getMessage());
		}
		return currencyList;
	}

	@Override
	public Pair<Currency, List<Course>> getCurrencyList(Long id) {
		Pair<Currency, List<Course>> currencyCourse = new Pair<Currency, List<Course>>();
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement(
						"SELECT \"P\".\"cuid\" AS \"currency_id\", "
						+ "\"Cu\".\"name\" AS \"currency_name\", " 
						+ "\"Cu\".\"createdby\" AS \"currency_createdby\", "
						+ "\"Cu\".\"createdon\" AS \"currency_createdon\", " 
						+ "\"Co\".\"coid\" AS \"course_id\", "
						+ "\"Co\".\"date\" AS \"course_date\", "
						+ "\"Co\".\"value\" AS \"course_value\", " 
						+ "\"Co\".\"createdby\" AS \"course_createdby\", "
						+ "\"Co\".\"createdon\" AS \"course_createdon\"" 
						+ "FROM " + CURRENCY_TABLE + " AS \"Cu\" "
						+ "INNER JOIN " + CourseDao.COURSE_TABLE + " AS \"Co\" " 
						+ "ON \"Cu\".\"cuid\" = \"Co\".\"cuid\" WHERE \"Cu\".\"cuid\" = ?")) {
			stmnt.setLong(1, id);
			ResultSet result = stmnt.executeQuery();
			Currency currency = null;
			List<Course> courseList = new ArrayList<>();
			while (result.next()) {
				if (currency == null) {
					currency = new Currency();
					currency.setCuid(result.getLong("currency_id"));
					currency.setName(result.getString("currency_name"));
					currency.setCreatedby(result.getString("currency_createdby"));
					currency.setCreatedon(result.getString("currency_createdon"));
				}
				Course course = new Course();
				course.setCoid(result.getLong("course_id"));
				course.setDate(result.getString("course_date"));
				course.setValue(result.getString("course_value"));
				course.setCreatedby(result.getString("course_createdby"));
				course.setCreatedon(result.getString("course_createdon"));
				courseList.add(course);
			}
			currencyCourse.setKey(currency);
			currencyCourse.setValue(courseList);
		} catch (SQLException e) {
			logger.error("Error while trying to get entries: " + e.getMessage());
		}
		return currencyCourse;
	}
}