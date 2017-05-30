package nu.sunnari.weatherpi.hardware;

/**
 * Class for BME280 sensor getting temperature- humidity- and pressure- data.
 *
 * Methods for getting the current value of the sensor but also holds an arraylist of the 12 latest readings making it
 * possible to get the average value of the current hour but also comparing the previous hour with the current hour
 * to see which way the weather is trending (Rising, steady, falling).
 */

import com.pi4j.io.i2c.I2CBus;
import com.pi4j.io.i2c.I2CDevice;
import com.pi4j.io.i2c.I2CFactory;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Jonas on 2017-01-30.
 */

public class WeatherSensor {

    private I2CDevice device;
    private byte[] b1 = new byte[24];

    private List<Double> tempValues = new ArrayList<>(12);
    private List<Double> humidityValues = new ArrayList<>(12);
    private List<Double> pressureValues = new ArrayList<>(12);

    private double minTemperature;
    private double maxTemperature;
    private double minHumidity;
    private double maxHumidity;
    private double minPressure;
    private double maxPressure;

    private double temperature;
    private double humidity;
    private double pressure;

    public WeatherSensor(int address) {
        try {
            //Create bus:
            I2CBus bus = I2CFactory.getInstance(I2CBus.BUS_1);
            //Get I2C device, BME280 I2C addresses are 0x76 and 0x77.
            device = bus.getDevice(address);
        } catch (I2CFactory.UnsupportedBusNumberException | IOException e) {
            e.printStackTrace();
        }
    }

    public void readSensor() throws IOException, I2CFactory.UnsupportedBusNumberException{
        // Read 24 bytes of data from address 0x88(136)
        device.read(0x88, b1, 0, 24);

        //Convert data - Temp coefficients
        int dig_T1 = (b1[0] & 0xFF) + ((b1[1] & 0xFF) * 256);
        int dig_T2 = (b1[2] & 0xFF) + ((b1[3] & 0xFF) * 256);
        if (dig_T2 > 32767) {
            dig_T2 -= 65536;
        }

        int dig_T3 = (b1[4] & 0xFF) + ((b1[5] & 0xFF) * 256);
        if (dig_T3 > 32767) {
            dig_T3 -= 65536;
        }

        //Convert data - Pressure coefficients
        int dig_P1 = (b1[6] & 0xFF) + ((b1[7] & 0xFF) * 256);

        int dig_P2 = (b1[8] & 0xFF) + ((b1[9] & 0xFF) * 256);
        if (dig_P2 > 32767) {
            dig_P2 -= 65536;
        }

        int dig_P3 = (b1[10] & 0xFF) + ((b1[11] & 0xFF) * 256);
        if (dig_P3 > 32767) {
            dig_P3 -= 65536;
        }

        int dig_P4 = (b1[12] & 0xFF) + ((b1[13] & 0xFF) * 256);
        if (dig_P4 > 32767) {
            dig_P4 -= 65536;
        }

        int dig_P5 = (b1[14] & 0xFF) + ((b1[15] & 0xFF) * 256);
        if (dig_P5 > 32767) {
            dig_P5 -= 65536;
        }

        int dig_P6 = (b1[16] & 0xFF) + ((b1[17] & 0xFF) * 256);
        if (dig_P6 > 32767) {
            dig_P6 -= 65536;
        }

        int dig_P7 = (b1[18] & 0xFF) + ((b1[19] & 0xFF) * 256);
        if (dig_P7 > 32767) {
            dig_P7 -= 65536;
        }

        int dig_P8 = (b1[20] & 0xFF) + ((b1[21] & 0xFF) * 256);
        if (dig_P8 > 32767) {
            dig_P8 -= 65536;
        }

        int dig_P9 = (b1[22] & 0xFF) + ((b1[23] & 0xFF) * 256);
        if (dig_P9 > 32767) {
            dig_P9 -= 65536;
        }

        //Read 1 byte of data from address 0xA1(161)
        int dig_H1 = ((byte)device.read(0xA1) & 0xFF);

        //Read 7 bytes of data from address 0xE1(225)
        device.read(0xE1, b1, 0, 7);

        //Convert data - Humidity coefficients
        int dig_H2 = (b1[0] & 0xFF) + (b1[1] * 256);
        if (dig_H2 > 32767) {
            dig_H2 -= 65536;
        }

        int dig_H3 = b1[2] & 0xFF ;

        int dig_H4 = ((b1[3] & 0xFF) * 16) + (b1[4] & 0xF);
        if (dig_H4 > 32767) {
            dig_H4 -= 65536;
        }

        int dig_H5 = ((b1[4] & 0xFF) / 16) + ((b1[5] & 0xFF) * 16);
        if (dig_H5 > 32767) {
            dig_H5 -= 65536;
        }

        int dig_H6 = b1[6] & 0xFF;
        if (dig_H6 > 127) {
            dig_H6 -= 256;
        }

        //Select control humidity register
        //Humidity over sampling rate = 1
        device.write(0xF2 , (byte)0x01);
        //Select control measurement register
        //Normal mode, temp and pressure over sampling rate = 1
        device.write(0xF4 , (byte)0x27);
        //Select config register
        //Stand_by time = 1000 ms
        device.write(0xF5 , (byte)0xA0);

        //Read 8 bytes of data from address 0xF7(247)
        //pressure msb1, pressure msb, pressure lsb, temp msb1, temp msb, temp lsb, humidity lsb, humidity msb
        byte[] data = new byte[8];
        device.read(0xF7, data, 0, 8);

        //Convert pressure and temperature data to 19-bits
        long adc_p = (((long)(data[0] & 0xFF) * 65536) + ((long)(data[1] & 0xFF) * 256) + (long)(data[2] & 0xF0)) / 16;
        long adc_t = (((long)(data[3] & 0xFF) * 65536) + ((long)(data[4] & 0xFF) * 256) + (long)(data[5] & 0xF0)) / 16;

        //Convert the humidity data
        long adc_h = ((long)(data[6] & 0xFF) * 256 + (long)(data[7] & 0xFF));

        //Temperature offset calculations
        double var1 = (((double)adc_t) / 16384.0 - ((double)dig_T1) / 1024.0) * ((double)dig_T2);
        double var2 = ((((double)adc_t) / 131072.0 - ((double)dig_T1) / 8192.0) *
                (((double)adc_t)/131072.0 - ((double)dig_T1)/8192.0)) * ((double)dig_T3);
        double t_fine = (long)(var1 + var2);
        double cTemp = (var1 + var2) / 5120.0;
        double fTemp = cTemp * 1.8 + 32; //Farenheit

        //Pressure offset calculations
        var1 = ((double)t_fine / 2.0) - 64000.0;
        var2 = var1 * var1 * ((double)dig_P6) / 32768.0;
        var2 = var2 + var1 * ((double)dig_P5) * 2.0;
        var2 = (var2 / 4.0) + (((double)dig_P4) * 65536.0);
        var1 = (((double) dig_P3) * var1 * var1 / 524288.0 + ((double) dig_P2) * var1) / 524288.0;
        var1 = (1.0 + var1 / 32768.0) * ((double)dig_P1);
        double p = 1048576.0 - (double)adc_p;
        p = (p - (var2 / 4096.0)) * 6250.0 / var1;
        var1 = ((double) dig_P9) * p * p / 2147483648.0;
        var2 = p * ((double) dig_P8) / 32768.0;
        double pressure = (p + (var1 + var2 + ((double)dig_P7)) / 16.0) / 100;

        //Humidity offset calculations
        double var_H = (((double)t_fine) - 76800.0);
        var_H = (adc_h - (dig_H4 * 64.0 + dig_H5 / 16384.0 * var_H)) * (dig_H2 / 65536.0 * (1.0 + dig_H6 / 67108864.0 * var_H * (1.0 + dig_H3 / 67108864.0 * var_H)));
        double humidity = var_H * (1.0 -  dig_H1 * var_H / 524288.0);
        if (humidity > 100.0) {
            humidity = 100.0;
        }
        else if (humidity < 0.0) {
            humidity = 0.0;
        }
        this.temperature = cTemp - 1; //calibration
        this.pressure = pressure;
        this.humidity = humidity;
    }

    private double calcAverage(List<Double> list){
        if (list.size() < 12) {
            return list.get(list.size()-1);
        } else {
            int halfArraylist = list.size()/2;
            double value = 0;

            for (int i = halfArraylist; i < list.size(); i++) {
                value += list.get(i);
            }
            return Math.round(value/halfArraylist * 10.0) / 10.0;
        }
    }

    private String calcTrend(List<Double> list){
        String arrow = "direction-right";
        int halfArraylist = list.size()/2;
        double previousValue = 0;
        double currentValue = 0;

        //Get average for the previous hours weather:
        for (int i = 0; i < halfArraylist; i++) {
            previousValue += list.get(i);
        }
        //Get average for the current hours weather:
        for (int i = halfArraylist; i < list.size(); i++) {
            currentValue += list.get(i);
        }

        if (currentValue/halfArraylist < previousValue/halfArraylist){
            arrow = "direction-down-right";
        }
        else if (currentValue/halfArraylist > previousValue/halfArraylist){
            arrow = "direction-up-right";
        }

        return arrow;
    }

    public void addTempValue(double lastTempValue){
        if (tempValues.size() == 12){
            tempValues.remove(0);
        }
        if (lastTempValue < 100 && lastTempValue > -100) {
            tempValues.add(Math.round(lastTempValue * 10.0) / 10.0);
        }
    }

    public void addHumValue(double lastHumValue){
        if (humidityValues.size() == 12){
            humidityValues.remove(0);
        }
        if (lastHumValue <= 100 && lastHumValue >= 0) {
            humidityValues.add(Math.round(lastHumValue * 10.0) / 10.0);
        }
    }

    public void addPressureValue(double lastPressureValue){
        if (pressureValues.size() == 12){
            pressureValues.remove(0);
        }
        if (lastPressureValue < 2000 && lastPressureValue > 500) {
            pressureValues.add(Math.round(lastPressureValue * 10.0) / 10.0);
        }
    }

    public void updateMinMaxValues(){
        if (minTemperature > temperature){
            minTemperature = temperature;
        }

        if (maxTemperature < temperature){
            maxTemperature = temperature;
        }

        if (minHumidity > humidity){
            minHumidity = humidity;
        }

        if (maxHumidity < humidity){
            maxHumidity = humidity;
        }

        if (minPressure > pressure){
            minPressure = pressure;
        }

        if (maxPressure < pressure){
            maxPressure = pressure;
        }
    }

    public void clearMinMaxValues(){
        minTemperature = temperature;
        maxTemperature = temperature;
        minHumidity = humidity;
        maxHumidity = humidity;
        minPressure = pressure;
        maxPressure = pressure;
    }

    public double getCurrentTemperature() {
        return Math.round(temperature * 10.0) / 10.0;
    }

    public double getCurrentHumidity() {
        return Math.round(humidity * 10.0) / 10.0;
    }

    public double getCurrentPressure() {
        return Math.round(pressure * 10.0) / 10.0;
    }

    public double getAverageTemp() {
        return calcAverage(tempValues);
    }

    public double getAverageHumidity() {
        return calcAverage(humidityValues);
    }

    public double getAveragePressure() {
        return calcAverage(pressureValues);
    }

    public String getTempTrend(){
        return calcTrend(tempValues);
    }

    public String getHumidityTrend(){
        return calcTrend(humidityValues);
    }

    public String getPressureTrend(){
        return calcTrend(pressureValues);
    }

    public double getMinTemperature() {
        return Math.round(minTemperature * 10.0) / 10.0;
    }

    public double getMaxTemperature() {
        return Math.round(maxTemperature * 10.0) / 10.0;
    }

    public double getMinHumidity() {
        return Math.round(minHumidity * 10.0) / 10.0;
    }

    public double getMaxHumidity() {
        return Math.round(maxHumidity * 10.0) / 10.0;
    }

    public double getMinPressure() {
        return Math.round(minPressure * 10.0) / 10.0;
    }

    public double getMaxPressure() {
        return Math.round(maxPressure * 10.0) / 10.0;
    }

}