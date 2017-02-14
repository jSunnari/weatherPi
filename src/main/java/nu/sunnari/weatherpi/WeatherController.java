package nu.sunnari.weatherpi;

import com.pi4j.io.i2c.I2CFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * Created by Jonas on 2017-01-30.
 */

@Component
public class WeatherController {
    private DataCollector dataCollector;
    private LcdDisplay lcdDisplay;
    private WeatherSensor outsideSensor;
    private WeatherSensor insideSensor;

    public WeatherController() {
        dataCollector = new DataCollector();
        lcdDisplay = new LcdDisplay();
        outsideSensor = new WeatherSensor(0x77);
        insideSensor = new WeatherSensor(0x76);

        setDate();
        setTime();
    }

    @Scheduled(cron = "0 0 0 * * *")
    public void setDate(){
        lcdDisplay.writeDate(dataCollector.getCurrentDate());
    }

    @Scheduled(cron = "0 * * * * *")
    public void setTime(){
        lcdDisplay.writeTime(dataCollector.getCurrentTime());
    }

    @Scheduled(cron = "0/15 * * * * *")
    public void setOutsideSensorValues(){
        try {
            outsideSensor.readSensor();
            lcdDisplay.writeOutTemp(outsideSensor.getTemperature());
            lcdDisplay.writeOutHum(outsideSensor.getHumidity());
            lcdDisplay.writePressure(outsideSensor.getPressure());
        } catch (IOException | I2CFactory.UnsupportedBusNumberException e) {
            e.printStackTrace();
        }
    }
    @Scheduled(cron = "0/15 * * * * *")
    public void setInsideSensor(){
        try {
            insideSensor.readSensor();
            lcdDisplay.writeInTemp(insideSensor.getTemperature());
            lcdDisplay.writeInHum(insideSensor.getHumidity());
        } catch (IOException | I2CFactory.UnsupportedBusNumberException e) {
            e.printStackTrace();
        }
    }

    public void setLocalIpAdress(){
        lcdDisplay.writeIp(dataCollector.getLocalIpAdress());
    }
}
