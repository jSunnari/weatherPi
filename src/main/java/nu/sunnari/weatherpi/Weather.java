package nu.sunnari.weatherpi;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.sql.Date;
import java.sql.Time;

/**
 * Created by Jonas on 2017-01-30.
 */

@Entity
public class Weather {

    private @Id
    @GeneratedValue
    Long id;
    private Date date;
    private Time time;

    private double insideTemperature;
    private double insideHumidity;
    private double insidePressure;
    private double outsideTemperature;
    private double outsideHumidity;
    private double outsidePressure;

    private Weather() {}

    public Weather(Date date, Time time, double insideTemperature, double insideHumidity, double insidePressure, double outsideTemperature, double outsideHumidity, double outsidePressure) {
        this.date = date;
        this.time = time;
        this.insideTemperature = insideTemperature;
        this.insideHumidity = insideHumidity;
        this.insidePressure = insidePressure;
        this.outsideTemperature = outsideTemperature;
        this.outsideHumidity = outsideHumidity;
        this.outsidePressure = outsidePressure;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Time getTime() {
        return time;
    }

    public void setTime(Time time) {
        this.time = time;
    }

    public double getInsideTemperature() {
        return insideTemperature;
    }

    public void setInsideTemperature(double insideTemperature) {
        this.insideTemperature = insideTemperature;
    }

    public double getInsideHumidity() {
        return insideHumidity;
    }

    public void setInsideHumidity(double insideHumidity) {
        this.insideHumidity = insideHumidity;
    }

    public double getInsidePressure() {
        return insidePressure;
    }

    public void setInsidePressure(double insidePressure) {
        this.insidePressure = insidePressure;
    }

    public double getOutsideTemperature() {
        return outsideTemperature;
    }

    public void setOutsideTemperature(double outsideTemperature) {
        this.outsideTemperature = outsideTemperature;
    }

    public double getOutsideHumidity() {
        return outsideHumidity;
    }

    public void setOutsideHumidity(double outsideHumidity) {
        this.outsideHumidity = outsideHumidity;
    }

    public double getOutsidePressure() {
        return outsidePressure;
    }

    public void setOutsidePressure(double outsidePressure) {
        this.outsidePressure = outsidePressure;
    }

}
