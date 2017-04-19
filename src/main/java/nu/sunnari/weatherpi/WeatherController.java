package nu.sunnari.weatherpi;

import com.pi4j.io.i2c.I2CFactory;
import net.minidev.json.JSONObject;
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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.io.IOException;
import java.sql.Date;
import java.sql.Time;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Locale;

/**
 * Created by Jonas on 2017-01-30.
 */

//DEVMODE
@Component
@RequestMapping("/api/weather")
@RestController
public class WeatherController {
    private JSONObject currentWeather = new JSONObject();
    private DataCollector dataCollector;
    private LcdDisplay lcdDisplay;
    private WeatherSensor outsideSensor;
    private WeatherSensor insideSensor;
    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private WeatherRepository repository;

    public WeatherController() {
        dataCollector = new DataCollector();
        lcdDisplay = new LcdDisplay();
        outsideSensor = new WeatherSensor(0x77);
        insideSensor = new WeatherSensor(0x76);

        setLcdDate();
        setLcdTime();
        writeWeatherValuesToLcd();
        insideSensor.clearMinMaxValues();
        outsideSensor.clearMinMaxValues();
    }

    //******************************* ENDPOINTS ******************************* //
    @GetMapping(value="/current")
    public JSONObject getCurrentWeather(){
        currentWeather.put("outdoorTemp", outsideSensor.getCurrentTemperature());
        currentWeather.put("outdoorHum", Math.round(outsideSensor.getCurrentHumidity()));
        currentWeather.put("outdoorPressure", Math.round(outsideSensor.getCurrentPressure()));
        currentWeather.put("indoorTemp", insideSensor.getCurrentTemperature());
        currentWeather.put("indoorHum", Math.round(insideSensor.getCurrentHumidity()));

        currentWeather.put("outdoorTempTrend", outsideSensor.getTempTrend());
        currentWeather.put("outdoorHumTrend", outsideSensor.getHumidityTrend());
        currentWeather.put("outdoorPressureTrend", outsideSensor.getPressureTrend());
        currentWeather.put("indoorTempTrend", insideSensor.getTempTrend());
        currentWeather.put("indoorHumTrend", insideSensor.getHumidityTrend());

        currentWeather.put("outdoorMinTemp", outsideSensor.getMinTemperature());
        currentWeather.put("outdoorMaxTemp", outsideSensor.getMaxTemperature());
        currentWeather.put("outdoorMinHum", Math.round(outsideSensor.getMinHumidity()));
        currentWeather.put("outdoorMaxHum", Math.round(outsideSensor.getMaxHumidity()));
        currentWeather.put("outdoorMinPressure", Math.round(outsideSensor.getMinPressure()));
        currentWeather.put("outdoorMaxPressure", Math.round(outsideSensor.getMaxPressure()));

        currentWeather.put("indoorMinTemp", insideSensor.getMinTemperature());
        currentWeather.put("indoorMaxTemp", insideSensor.getMaxTemperature());
        currentWeather.put("indoorMinHum", Math.round(insideSensor.getMinHumidity()));
        currentWeather.put("indoorMaxHum", Math.round(insideSensor.getMaxHumidity()));

        return currentWeather;
    }

    @GetMapping(value="/findByDay/{date}")
    public List<Weather> getWeatherByDay(@PathVariable Date date){
        return repository.findByDate(date);
    }

    @GetMapping(value="/findByWeek/{year}/{weekNumber}")
    public List<AverageWeather> getWeatherByWeek(@PathVariable int year, @PathVariable int weekNumber){
        List<AverageWeather> weatherWeekList = new ArrayList<>();
        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.YEAR, year);
        cal.set(Calendar.WEEK_OF_YEAR, weekNumber);
        cal.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
        Date date = new Date(cal.getTime().getTime());

        for (int i = 0; i < 7; i++) {


            AverageWeather averageWeather = new AverageWeather(new SimpleDateFormat("EEEE", Locale.ENGLISH).format(date.getTime()), getAverageValues(repository.findByDate(date)));
            weatherWeekList.add(averageWeather);

            cal.add(Calendar.DAY_OF_WEEK, 1);
            date = new Date(cal.getTime().getTime());
        }

        return weatherWeekList;
    }

    @GetMapping(value="/findByMonth/{year}/{monthNumber}")
    public List<AverageWeather> getWeatherByMonth(@PathVariable int year, @PathVariable int monthNumber){
        List<AverageWeather> weatherWeekList = new ArrayList<>();
        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.YEAR, year);
        cal.set(Calendar.MONTH, monthNumber);
        cal.set(Calendar.DAY_OF_MONTH, 1);
        Date date = new Date(cal.getTime().getTime());
        int daysInMonth = cal.getActualMaximum(Calendar.DAY_OF_MONTH);

        for (int i = 1; i <= daysInMonth; i++) {
            AverageWeather averageWeather = new AverageWeather(String.valueOf(i), getAverageValues(repository.findByDate(date)));
            weatherWeekList.add(averageWeather);

            cal.add(Calendar.DAY_OF_WEEK, 1);
            date = new Date(cal.getTime().getTime());
        }

        return weatherWeekList;
    }

    @GetMapping(value="/findByYear/{year}")
    public List<AverageWeather> getWeatherByYear(@PathVariable int year){
        List<AverageWeather> weatherWeekList = new ArrayList<>();
        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.YEAR, year);
        cal.set(Calendar.MONTH, 0);

        for (int i = 1; i <= 12; i++) {
            cal.set(Calendar.DAY_OF_MONTH, cal.getActualMinimum(Calendar.DAY_OF_MONTH));
            Date startDate = new Date(cal.getTime().getTime());
            cal.set(Calendar.DAY_OF_MONTH, cal.getActualMaximum(Calendar.DAY_OF_MONTH));
            Date stopDate = new Date(cal.getTime().getTime());

            log.info("i: " + i);
            log.info("startDate: " + startDate);
            log.info("stopDate: " + stopDate);

            AverageWeather averageWeather = new AverageWeather(new SimpleDateFormat("MMMM", Locale.ENGLISH).format(startDate.getTime()),
                    getAverageValues(repository.findByDateBetween(startDate,stopDate)));
            weatherWeekList.add(averageWeather);

            cal.add(Calendar.DAY_OF_MONTH, 1);
        }

        return weatherWeekList;
    }

    //******************************* LCD DISPLAY ******************************* //
    @Scheduled(cron = "0 0 0 * * *") //Every day
    public void setLcdDate(){
        lcdDisplay.writeDate(dataCollector.getCurrentDate());
    }

    @Scheduled(cron = "0 * * * * *") //Every minute
    public void setLcdTime(){
        lcdDisplay.writeTime(dataCollector.getCurrentTime());
    }

    @Scheduled(cron = "0/15 * * * * *") //Every 15 seconds
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
        log.info("Saving current weather to array. Data: " +
                "[outside-temp: " + outsideSensor.getCurrentTemperature() +
                ", outside-hum: " + outsideSensor.getCurrentHumidity() +
                ", outside-pressure: " + outsideSensor.getCurrentPressure() +
                ", inside-temp: " + insideSensor.getCurrentTemperature() +
                ", inside-hum: " + insideSensor.getCurrentHumidity() + "]");

        outsideSensor.addTempValue(outsideSensor.getCurrentTemperature());
        outsideSensor.addHumValue(outsideSensor.getCurrentHumidity());
        outsideSensor.addPressureValue(outsideSensor.getCurrentPressure());
        insideSensor.addTempValue(insideSensor.getCurrentTemperature());
        insideSensor.addHumValue(insideSensor.getCurrentHumidity());
    }

    @Scheduled(cron = "0 0 * * * *") //Every hour
    public void persistWeatherData(){
        log.info("Persisting data to database. Data: " +
                "[outside-temp: " + outsideSensor.getAverageTemp() +
                ", outside-hum: " + outsideSensor.getAverageHumidity() +
                ", outside-pressure: " + outsideSensor.getAveragePressure() +
                ", inside-temp: " + insideSensor.getAverageTemp() +
                ", inside-hum: " + insideSensor.getAverageHumidity() + "]");

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

    @Scheduled(cron = "0/15 * * * * *") //Every 15 seconds
    public void updateMinMaxValues(){
        insideSensor.updateMinMaxValues();
        outsideSensor.updateMinMaxValues();
    }

    @Scheduled(cron = "0 0 0 * * *") //Every day
    public void clearMinMaxValues(){
        insideSensor.clearMinMaxValues();
        outsideSensor.clearMinMaxValues();
    }

    //********************************* MISC ********************************* //
    Weather getAverageValues(List<Weather> weatherList) {
        double insideTemperature = 0;
        double insideHumidity = 0;
        double outsideTemperature = 0;
        double outsideHumidity = 0;
        double outsidePressure = 0;

        for (Weather weather: weatherList) {
            insideTemperature += weather.getInsideTemperature();
            insideHumidity += weather.getInsideHumidity();
            outsideTemperature += weather.getOutsideTemperature();
            outsideHumidity += weather.getOutsideHumidity();
            outsidePressure += weather.getOutsidePressure();
        }

        insideTemperature = insideTemperature/weatherList.size();
        insideHumidity = insideHumidity/weatherList.size();
        outsideTemperature = outsideTemperature/weatherList.size();
        outsideHumidity = outsideHumidity/weatherList.size();
        outsidePressure = outsidePressure/weatherList.size();

        return new Weather(insideTemperature,insideHumidity,outsideTemperature,outsideHumidity,outsidePressure);
    }
}
