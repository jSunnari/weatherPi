package nu.sunnari.weatherpi;

import org.springframework.scheduling.annotation.Scheduled;

/**
 * Created by Jonas on 2017-01-30.
 */

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

}
