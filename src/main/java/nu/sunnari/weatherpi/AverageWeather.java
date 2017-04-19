package nu.sunnari.weatherpi;

import nu.sunnari.weatherpi.database.Weather;

/**
 * Created by Jonas on 2017-04-19.
 */

public class AverageWeather {
    private String key;
    private Weather weather;

    public AverageWeather(String key, Weather weather) {
        this.key = key;
        this.weather = weather;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public Weather getWeather() {
        return weather;
    }

    public void setWeather(Weather weather) {
        this.weather = weather;
    }
}
