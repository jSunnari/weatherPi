package nu.sunnari.weatherpi;

import com.pi4j.io.i2c.I2CFactory;
import nu.sunnari.weatherpi.database.Weather;
import nu.sunnari.weatherpi.database.WeatherRepository;
import nu.sunnari.weatherpi.hardware.LcdDisplay;
import nu.sunnari.weatherpi.hardware.WeatherSensor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.io.IOException;
import java.sql.Date;
import java.sql.Time;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;

/**
 * Created by Jonas on 2017-01-30.
 */

@Component
@RequestMapping("/api/weather")
@RestController
public class WeatherController {
    private DataCollector dataCollector;
    private LcdDisplay lcdDisplay;
    private WeatherSensor outsideSensor;
    private WeatherSensor insideSensor;

    @Autowired
    private WeatherRepository repository;

    public WeatherController() {
        dataCollector = new DataCollector();
        //lcdDisplay = new LcdDisplay();
        outsideSensor = new WeatherSensor(0x77);
        insideSensor = new WeatherSensor(0x76);

        //setLcdDate();
        //setLcdTime();
        //writeWeatherValuesToLcd();
    }

    //******************************* ENDPOINTS ******************************* //
    @GetMapping(value="/current")
    public Weather getCurrentWeather(){
        return new Weather(insideSensor.getCurrentTemperature(),
                insideSensor.getCurrentHumidity(), outsideSensor.getCurrentTemperature(),
                outsideSensor.getCurrentHumidity(), outsideSensor.getCurrentPressure()
        );
    }

    @GetMapping(value="/findByDay/{date}")
    public List<Weather> getWeatherByDay(@PathVariable Date date){
        return repository.findByDate(date);
    }

    @GetMapping(value="/findByWeek/{year}/{weekNumber}")
    public List<Weather> getWeatherByWeek(@PathVariable int year, @PathVariable int weekNumber){
        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.YEAR, year);
        cal.set(Calendar.WEEK_OF_YEAR, weekNumber);
        cal.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
        Date startDate = new Date(cal.getTime().getTime());
        cal.add(Calendar.DAY_OF_WEEK, 6);
        Date endDate = new Date(cal.getTime().getTime());

        return repository.findByDateBetween(startDate, endDate);
    }


    @GetMapping(value="/findByMonth/{year}/{monthNumber}")
    public List<Weather> getWeatherByMonth(@PathVariable int year, @PathVariable int monthNumber){
        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.YEAR, year);
        cal.set(Calendar.MONTH, monthNumber-1);
        cal.set(Calendar.DAY_OF_MONTH, 1);
        Date startDate = new Date(cal.getTime().getTime());
        cal.add(Calendar.MONTH, 1);
        cal.add(Calendar.DAY_OF_MONTH, -1);
        Date endDate = new Date(cal.getTime().getTime());

        return repository.findByDateBetween(startDate, endDate);
    }

    @GetMapping(value="/findByYear/{year}")
    public List<Weather> getWeatherByYear(@PathVariable int year){
        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.YEAR, year);
        cal.set(Calendar.MONTH, 0);
        cal.set(Calendar.DAY_OF_MONTH, 1);
        Date startDate = new Date(cal.getTime().getTime());
        cal.add(Calendar.YEAR, 1);
        cal.add(Calendar.DAY_OF_YEAR, -1);
        Date endDate = new Date(cal.getTime().getTime());

        return repository.findByDateBetween(startDate, endDate);
    }

    //******************************* LCD DISPLAY ******************************* //
    //@Scheduled(cron = "0 0 0 * * *") //Every day
    public void setLcdDate(){
        lcdDisplay.writeDate(dataCollector.getCurrentDate());
    }

    //@Scheduled(cron = "0 * * * * *") //Every minute
    public void setLcdTime(){
        lcdDisplay.writeTime(dataCollector.getCurrentTime());
    }

    //@Scheduled(cron = "0/15 * * * * *") //Every 15 seconds
    public void writeWeatherValuesToLcd(){
        try {
            outsideSensor.readSensor();
            insideSensor.readSensor();

            lcdDisplay.writeOutTemp(outsideSensor.getCurrentTemperature());
            lcdDisplay.writeOutHum(outsideSensor.getCurrentHumidity());
            lcdDisplay.writeInTemp(insideSensor.getCurrentTemperature());
            lcdDisplay.writeInHum(insideSensor.getCurrentHumidity());
            lcdDisplay.writePressure(outsideSensor.getCurrentPressure());
        } catch (IOException | I2CFactory.UnsupportedBusNumberException e) {
            e.printStackTrace();
        }
    }

    //********************************* SENSOR ********************************* //
    @Scheduled(cron = "0 0/10 * * * *") //Every 10 minutes
    public void saveCurrentWeatherData(){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        System.out.println(sdf.format(new Date(Calendar.getInstance().getTimeInMillis())) + " - Saving current weather to array."); //LOG

        outsideSensor.addTempValue(outsideSensor.getCurrentTemperature());
        outsideSensor.addHumValue(outsideSensor.getCurrentHumidity());
        outsideSensor.addPressureValue(outsideSensor.getCurrentPressure());
        insideSensor.addTempValue(insideSensor.getCurrentTemperature());
        insideSensor.addHumValue(insideSensor.getCurrentHumidity());
    }

    @Scheduled(cron = "0 0 * * * *") //Every hour
    public void persistWeatherData() {
        repository.save(new Weather(
                new Date(Calendar.getInstance().getTime().getTime()),
                new Time(Calendar.getInstance().getTime().getTime()),
                insideSensor.getAverageTemp(),
                insideSensor.getAverageHumidity(),
                outsideSensor.getAverageTemp(),
                outsideSensor.getAverageHumidity(),
                outsideSensor.getAveragePressure())
        );
    }
}
