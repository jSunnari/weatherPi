package nu.sunnari.weatherpi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Created by Jonas on 2017-01-23.
 */

@SpringBootApplication
public class WeatherPiApplication {
    public static void main(String[] args) {
        try {
            LcdDisplay lcdDisplay = new LcdDisplay();
        } catch (Exception e) {
            e.printStackTrace();
        }
        SpringApplication.run(WeatherPiApplication.class, args);
    }
}
