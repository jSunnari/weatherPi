package nu.sunnari.weatherpi;

/**
 * Created by Jonas on 2017-03-02.
 */

public class CurrentWeather {
    private double outsideTemperature;
    private double outsideHumidity;
    private double outsidePressure;
    private double insideTemperature;
    private double insideHumidity;

    private String outsideTempTrend;
    private String outsideHumTrend;
    private String outsidePressureTrend;
    private String insideTempTrend;
    private String insideHumTrend;

    public void setOutsideTemperature(double outsideTemperature) {
        this.outsideTemperature = outsideTemperature;
    }

    public void setOutsideHumidity(double outsideHumidity) {
        this.outsideHumidity = outsideHumidity;
    }

    public void setOutsidePressure(double outsidePressure) {
        this.outsidePressure = outsidePressure;
    }

    public void setInsideTemperature(double insideTemperature) {
        this.insideTemperature = insideTemperature;
    }

    public void setInsideHumidity(double insideHumidity) {
        this.insideHumidity = insideHumidity;
    }

    public void setOutsideTempTrend(String outsideTempTrend) {
        this.outsideTempTrend = outsideTempTrend;
    }

    public void setOutsideHumTrend(String outsideHumTrend) {
        this.outsideHumTrend = outsideHumTrend;
    }

    public void setOutsidePressureTrend(String outsidePressureTrend) {
        this.outsidePressureTrend = outsidePressureTrend;
    }

    public void setInsideTempTrend(String insideTempTrend) {
        this.insideTempTrend = insideTempTrend;
    }

    public void setInsideHumTrend(String insideHumTrend) {
        this.insideHumTrend = insideHumTrend;
    }
}
