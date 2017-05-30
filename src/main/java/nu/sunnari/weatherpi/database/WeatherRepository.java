package nu.sunnari.weatherpi.database;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.io.Serializable;
import java.sql.Date;

import java.util.List;

/**
 * Created by Jonas on 2017-01-30.
 */

@RepositoryRestResource(path="/weather")
public interface WeatherRepository extends ReadOnlyRepository<Weather, Long> {
    List<Weather> findByDate(@Param("date") Date date);
    List<Weather> findByDateBetween(Date date1, Date date2);
}


/*
public interface WeatherRepository extends JpaRepository<Weather, Long> {
    List<Weather> findByDate(@Param("date") Date date);
    List<Weather> findByDateBetween(Date date1, Date date2);
}
*/