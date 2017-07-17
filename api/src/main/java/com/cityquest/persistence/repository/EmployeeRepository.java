package com.cityquest.persistence.repository;

import com.cityquest.persistence.dbo.Employee;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * @author Dominik Schwarz
 */
public interface EmployeeRepository extends PagingAndSortingRepository<Employee, Long> {

}
