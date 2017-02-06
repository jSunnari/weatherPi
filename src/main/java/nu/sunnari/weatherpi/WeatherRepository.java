package nu.sunnari.weatherpi;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

/**
 * Created by Jonas on 2017-01-30.
 */

public interface WeatherRepository extends PagingAndSortingRepository<Weather, Long> {
    List<Weather> findByDate(@Param("date") Date date);
    List<Weather> findByTime(@Param("time") Time time);
}
