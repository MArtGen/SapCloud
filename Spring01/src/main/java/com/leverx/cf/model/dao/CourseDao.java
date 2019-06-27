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
import com.leverx.cf.model.intfce.ICourseDao;

@Repository
public class CourseDao implements ICourseDao {
	
	private static final Logger logger = LoggerFactory.getLogger(CourseDao.class);

	public static final String COURSE_TABLE = "COURSE";

	@Autowired
	private DataSource dataSource;

	@Override
	public Optional<Course> getById(Long id) {
		Optional<Course> entity = null;
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn
						.prepareStatement(
								"SELECT TOP 1 \"COID\", \"DATE\", \"VALUE\", \"CREATEDBY\", \"CREATEDON\", \"CUID\" FROM " + COURSE_TABLE + " WHERE \"COID\" = ?")) {
			stmnt.setLong(1, id);
			ResultSet result = stmnt.executeQuery();
			if (result.next()) {
				Course course = new Course();
				course.setCoid(id);
				course.setDate(result.getString("date"));
				course.setValue(result.getString("value"));
				course.setCreatedby(result.getString("createdby"));
				course.setCreatedon(result.getString("createdon"));
				course.setCuid(result.getLong("cuid"));
				entity = Optional.of(course);
			} else {
				entity = Optional.empty();
			}
		} catch (SQLException e) {
			logger.error("Error while trying to get entity by Id: " + e.getMessage());
		}
		return entity;
	}

	@Override
	public List<Course> getAll() {
		List<Course> courseList = new ArrayList<Course>();
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn
						.prepareStatement("SELECT \"COID\", \"DATE\", \"VALUE\", \"CREATEDBY\", \"CREATEDON\", \"CUID\" FROM " + COURSE_TABLE)) {
			ResultSet result = stmnt.executeQuery();
			while (result.next()) {
				Course course = new Course();
				course.setCoid(result.getLong("coid"));
				course.setDate(result.getString("date"));
				course.setValue(result.getString("value"));
				course.setCreatedby(result.getString("createdby"));
				course.setCreatedon(result.getString("createdon"));				
				course.setCuid(result.getLong("cuid"));
				courseList.add(course);
			}
		} catch (SQLException e) {
			logger.error("Error while trying to get list of entities: " + e.getMessage());
		}
		return courseList;
	}

	@Override
	public void save(Course entity) throws SQLException {
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement(
						"INSERT INTO " + COURSE_TABLE + "(\"COID\", \"DATE\", \"VALUE\", \"CREATEDBY\", \"CREATEDON\", \"CUID\") VALUES (?, ?, ?, ?, ?, ?)")) {
			stmnt.setLong(1, entity.getCoid());
			stmnt.setString(2, entity.getDate());
			stmnt.setString(3, entity.getValue());
			stmnt.setString(4, entity.getCreatedby());
			stmnt.setString(5, entity.getCreatedon());
			stmnt.setLong(6, entity.getCuid());
			stmnt.execute();
			logger.debug(stmnt.toString());
			logger.debug(entity.toString());
		} catch (SQLException e) {
			logger.error("Error while trying to add entity: " + e.getMessage());
		}
	}

	@Override
	public void delete(Long id) {
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement("DELETE FROM " + COURSE_TABLE + " WHERE \"COID\" = ?")) {
			stmnt.setLong(1, id);
			stmnt.execute();
		} catch (SQLException e) {
			logger.error("Error while trying to delete entity: " + e.getMessage());
		}
	}

	@Override
	public void update(Course entity) {
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement(
						"UPDATE " + COURSE_TABLE + " SET \"DATE\" = ?, \"VALUE\" = ?, \"CREATEDBY\" = ?, \"CREATEDON\" = ?, \"CUID\" = ? WHERE \"COID\" = ?")) {
			stmnt.setString(1, entity.getDate());
			stmnt.setString(2, entity.getValue());
			stmnt.setString(3, entity.getCreatedby());
			stmnt.setString(4, entity.getCreatedon());
			stmnt.setLong(5, entity.getCuid());
			stmnt.setLong(6, entity.getCoid());
			stmnt.executeUpdate();
		} catch (SQLException e) {
			logger.error("Error while trying to update entity: " + e.getMessage());
		}
	}

}
