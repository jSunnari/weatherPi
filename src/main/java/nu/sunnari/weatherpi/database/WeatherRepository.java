package nu.sunnari.weatherpi.database;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.sql.Date;

import java.util.List;

/**
 * Created by Jonas on 2017-01-30.
 */

@RepositoryRestResource(path="/weather")
public interface WeatherRepository extends PagingAndSortingRepository<Weather, Long> {
    List<Weather> findByDate(@Param("date") Date date);
    List<Weather> findByDateBetween(Date date1, Date date2);
}
