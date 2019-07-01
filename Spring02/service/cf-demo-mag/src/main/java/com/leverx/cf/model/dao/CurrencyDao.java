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

	public static final String CURRENCY_TABLE = "\"javaCFMTA::CURRENCY\"";

	@Autowired
	private DataSource dataSource;

	@Override
	public Optional<Currency> getById(Long id) {
		Optional<Currency> entity = null;
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn
						.prepareStatement(
								"SELECT TOP 1 \"CUID\", \"NAME\", \"CREATEDBY\", \"CREATEDON\" FROM " + CURRENCY_TABLE + " WHERE \"CUID\" = ?")) {
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
						.prepareStatement("SELECT \"CUID\", \"NAME\", \"CREATEDBY\", \"CREATEDON\" FROM " + CURRENCY_TABLE)) {
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
						"INSERT INTO " + CURRENCY_TABLE + "(\"CUID\", \"NAME\", \"CREATEDBY\", \"CREATEDON\") VALUES (?, ?, ?, ?)")) {
			stmnt.setLong(1, entity.getCuid());
			stmnt.setString(2, entity.getName());
			stmnt.setString(3, entity.getCreatedby());
			stmnt.setString(4, entity.getCreatedon());
			stmnt.execute();
		} catch (SQLException e) {
			logger.error("Error while trying to add entity: " + e.getMessage());
		}
	}

	@Override
	public void delete(Long id) {
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement("DELETE FROM " + CURRENCY_TABLE + " WHERE \"CUID\" = ?")) {
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
						"UPDATE " + CURRENCY_TABLE + " SET \"NAME\" = ?, \"CREATEDBY\" = ?, \"CREATEDON\" = ? WHERE \"CUID\" = ?")) {
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
						"SELECT \"CUID\", \"NAME\", \"CREATEDBY\", \"CREATEDON\" FROM " + CURRENCY_TABLE + " WHERE \"NAME\" = ?")) {
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
						"SELECT \"CU\".\"CUID\" AS \"CURRENCY_ID\", "
						+ "\"CU\".\"NAME\" AS \"CURRENCY_NAME\", " 
						+ "\"CU\".\"CREATEDBY\" AS \"CURRENCY_CREATEDBY\", "
						+ "\"CU\".\"CREATEDON\" AS \"CURRENCY_CREATEDON\", " 
						+ "\"CO\".\"COID\" AS \"COURSE_ID\", "
						+ "\"CO\".\"DATE\" AS \"COURSE_DATE\", "
						+ "\"CO\".\"VALUE\" AS \"COURSE_VALUE\" " 
						+ "FROM " + CURRENCY_TABLE + " AS \"CU\" "
						+ "INNER JOIN " + CourseDao.COURSE_TABLE + " AS \"CO\" " 
						+ "ON \"CU\".\"CUID\" = \"CO\".\"CUID\" WHERE \"CU\".\"CUID\" = ?")) {
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