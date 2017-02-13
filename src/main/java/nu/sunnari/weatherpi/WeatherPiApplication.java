package nu.sunnari.weatherpi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Created by Jonas on 2017-01-23.
 */

@SpringBootApplication
public class WeatherPiApplication {
    public static void main(String[] args) {


           // LcdDisplay lcdDisplay = new LcdDisplay();



        DataCollector dataCollector = new DataCollector();
        SpringApplication.run(WeatherPiApplication.class, args);
    }
}
