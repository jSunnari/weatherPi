package nu.sunnari.weatherpi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * Created by Jonas on 2017-01-23.
 */

@EnableScheduling
@SpringBootApplication
public class WeatherPiApplication {
    public static void main(String[] args) {


           // LcdDisplay lcdDisplay = new LcdDisplay();



        WeatherController weatherController = new WeatherController();
        SpringApplication.run(WeatherPiApplication.class, args);
    }
}
