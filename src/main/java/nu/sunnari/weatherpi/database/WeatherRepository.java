package nu.sunnari.weatherpi.database;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import java.sql.Date;

import java.util.List;

/**
 * Created by Jonas on 2017-01-30.
 */

@RepositoryRestResource(path="/weather")
public interface WeatherRepository extends ReadOnlyRepository<Weather, Long> {
    @RestResource(exported = false)
    List<Weather> findByDate(@Param("date") Date date);

    @RestResource(exported = false)
    List<Weather> findByDateBetween(Date date1, Date date2);
}