package nu.sunnari.weatherpi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.sql.Time;
import java.util.Calendar;

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
        this.repository.save(new Weather(
                new Date(Calendar.getInstance().getTime().getTime()),
                new Time(Calendar.getInstance().getTime().getTime()),
                21,
                50,
                60,
                10,
                60,
                50));
    }

}
