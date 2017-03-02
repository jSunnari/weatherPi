package nu.sunnari.weatherpi.database;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.sql.Date;
import java.sql.Time;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;

/**
 * Created by Jonas on 2017-01-30.
 */

@RepositoryRestResource(path="/weather")
public interface WeatherRepository extends PagingAndSortingRepository<Weather, Long> {
    List<Weather> findByDate(@Param("date") Date date);
    List<Weather> findByDateBetween(Date date1, Date date2);

    Weather findFirstByDateOrderByInsideTemperatureAsc(@Param("date") Date date);
    Weather findFirstByDateOrderByInsideTemperatureDesc(@Param("date") Date date);

    @Query(value="SELECT MAX(INSIDE_HUMIDITY) FROM WEATHER WHERE ?#{[0]}", nativeQuery = true)
    double findMinTemp(String date);

    @Query(value="select max(e.insideTemperature) from Weather e where e.date = ?#{[0]}", nativeQuery = true)
    double findMinTemp2(Date date);


}
