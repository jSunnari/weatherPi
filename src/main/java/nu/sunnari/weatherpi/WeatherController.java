package nu.sunnari.weatherpi;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * Created by Jonas on 2017-01-30.
 */

@Component
public class WeatherController {
    private DataCollector dataCollector;
    private LcdDisplay lcdDisplay;

    public WeatherController() {
        dataCollector = new DataCollector();
        lcdDisplay = new LcdDisplay();

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

    public void setOutTemp(){

    }

    public void setInTemp(){

    }

    public void setOutHum(){

    }

    public void setInHum(){

    }

    public void setLocalIpAdress(){
        lcdDisplay.writeIp(dataCollector.getLocalIpAdress());
    }

    public void setPressure(){

    }


}
