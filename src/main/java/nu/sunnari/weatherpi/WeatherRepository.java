package nu.sunnari.weatherpi;

import org.springframework.data.repository.CrudRepository;

/**
 * Created by Jonas on 2017-01-30.
 */

public interface WeatherRepository extends CrudRepository<Weather, Long>{}
