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
        WeatherSensor weatherSensor = new WeatherSensor(0x76);
        try {
            weatherSensor.readSensor();
            weatherSensor.test();
            System.out.println("---");
        } catch (IOException | I2CFactory.UnsupportedBusNumberException e) {
            e.printStackTrace();
        }

        try {
            Thread.sleep(500);
            BME280 bme280 = new BME280(0x76);
           bme280.test();
        } catch (I2CFactory.UnsupportedBusNumberException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }


        SpringApplication.run(WeatherPiApplication.class, args);
    }
}
