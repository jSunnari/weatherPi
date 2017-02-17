package nu.sunnari.weatherpi;

import com.pi4j.component.lcd.impl.I2CLcdDisplay;
import com.pi4j.io.i2c.I2CBus;

/**
 * Created by Jonas on 2017-01-30.
 */

class LcdDisplay {
    private I2CLcdDisplay lcd;

    LcdDisplay() {
        try {
            lcd = new I2CLcdDisplay(
                    4,
                    20,
                    I2CBus.BUS_1,
                    0x27,
                    3,
                    0,
                    1,
                    2,
                    7,
                    6,
                    5,
                    4);
        } catch (Exception e) {
            e.printStackTrace();
        }

        lcd.clear();

        lcd.setCursorPosition(2);
        lcd.write("OUT:");

        lcd.setCursorPosition(3);
        lcd.write("IN:");
    }

    void writeDate(String date){
        lcd.setCursorPosition(0);
        lcd.write(date);
    }

    void writeTime(String time){
        lcd.setCursorPosition(0, 15);
        lcd.write(time);
    }

    void writeInTemp(double temp){
        lcd.clear(3,5,7);

        String temperature = String.format("%.1f" + (char)223 + "C", temp);
        switch (temperature.length()){
            case 7:
                lcd.setCursorPosition(3,5);
                break;
            case 6:
                lcd.setCursorPosition(3,6);
                break;
            case 5:
                lcd.setCursorPosition(3,7);
                break;
        }
        lcd.write(temperature);
    }

    void writeInHum(double hum){
        lcd.clear(3,14,4);

        String humidity = String.format("%.0f%%", hum);
        lcd.setCursorPosition(3,14);
        lcd.write(humidity);
    }

    void writeOutTemp(double temp){
        lcd.clear(2,5,7);

        String temperature = String.format("%.1f" + (char)223 + "C", temp);
        switch (temperature.length()){
            case 7:
                lcd.setCursorPosition(2,5);
                break;
            case 6:
                lcd.setCursorPosition(2,6);
                break;
            case 5:
                lcd.setCursorPosition(2,7);
                break;
        }
        lcd.write(temperature);
    }

    void writeOutHum(double hum){
        lcd.clear(2,14,4);

        String humidity = String.format("%.0f%%", hum);
        lcd.setCursorPosition(2,14);
        lcd.write(humidity);
    }

    void writeIp(String ip){
        lcd.setCursorPosition(3,4);
        lcd.write(ip);
    }

    void writePressure(double pressure){
        String pressureSymbol;

        if (pressure > 1013.25){
            pressureSymbol = "H";
        } else {
          pressureSymbol = "L";
        }

        lcd.setCursorPosition(2, 19);
        lcd.write(pressureSymbol);
    }

}
