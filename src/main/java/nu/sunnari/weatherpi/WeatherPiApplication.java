package nu.sunnari.weatherpi;

import com.pi4j.io.i2c.I2CFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.io.IOException;

/**
 * Created by Jonas on 2017-01-23.
 */

@EnableScheduling
@SpringBootApplication
public class WeatherPiApplication {
    public static void main(String[] args) {
        //WeatherController weatherController = new WeatherController();
        SpringApplication.run(WeatherPiApplication.class, args);
    }
}
