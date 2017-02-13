package nu.sunnari.weatherpi;

import com.pi4j.component.lcd.impl.I2CLcdDisplay;
import com.pi4j.io.i2c.I2CBus;

/**
 * Created by Jonas on 2017-01-30.
 */

public class LcdDisplay {
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
        lcd.setCursorHome();




        lcd.setCursorPosition(2);
        lcd.write("OUT:");
        lcd.setCursorPosition(2, 6);
        lcd.write("-4.2" + (char)223 + "C");
        lcd.setCursorPosition(2, 14);
        lcd.write("30%");
        lcd.setCursorPosition(2, 19);
        lcd.write("H");

        lcd.setCursorPosition(3);
        lcd.write("IN:");
        lcd.setCursorPosition(3, 6);
        lcd.write("21.5" + (char)223 + "C");
        lcd.setCursorPosition(3, 14);
        lcd.write("50%");


    }

    public void writeDate(String date){
        lcd.setCursorPosition(0);
        lcd.write(date);
    }

    public void writeTime(String time){
        lcd.setCursorPosition(0, 15);
        lcd.write(time);
    }

    public void writeInTemp(String temp){
        lcd.setCursorPosition(1,5);
        lcd.write(temp);
    }

    public void writeInHum(String hum){
        lcd.setCursorPosition(1,11);
        lcd.write(hum);
    }

    public void writeOutTemp(String temp){
        lcd.setCursorPosition(2,5);
        lcd.write(temp);
    }

    public void writeOutHum(String hum){
        lcd.setCursorPosition(2,11);
        lcd.write(hum);
    }

    public void writeIp(String ip){
        lcd.setCursorPosition(3,4);
        lcd.write(ip);
    }

}
