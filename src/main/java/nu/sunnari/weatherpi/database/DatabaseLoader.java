package nu.sunnari.weatherpi.database;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.sql.Time;
import java.util.Calendar;
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
/*
        for (int i = 1; i < 32; i++) {
            for (int j = 0; j < 24; j++) {
                Random r = new Random();
                this.repository.save(new Weather(
                        new Date(2017-1900,0,i),
                        new Time(j, 0, 0),
                        22.5 + (25.2 - 22.5) * r.nextDouble(),
                        28.5 + (32.2 - 28.5) * r.nextDouble(),
                        -1.2 + (9.4 - -1.2) * r.nextDouble(),
                        68.4 + (100 - 68.4) * r.nextDouble(),
                        994 + (1312 - 994) * r.nextDouble())
                );
            }
        }
*/
    }
}
