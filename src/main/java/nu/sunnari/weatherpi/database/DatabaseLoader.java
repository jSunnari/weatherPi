package nu.sunnari.weatherpi.database;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.sql.Time;
import java.util.List;
import java.util.Random;

/**
 * Created by Jonas on 2017-01-30.
 */

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final WeatherRepository repository;

    @Autowired
    public DatabaseLoader(WeatherRepository repository){
        this.repository = repository;
    }

    @Override
    public void run(String... strings) throws Exception {

        List<Weather> weatherList = repository.findByDateBetween(new Date(2017,2,1), new Date(2017,2,31));

        repository.delete(weatherList);
    }

}
