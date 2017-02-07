package nu.sunnari.weatherpi;

import com.pi4j.component.lcd.impl.I2CLcdDisplay;
import com.pi4j.io.i2c.I2CBus;

/**
 * Created by Jonas on 2017-01-30.
 */

public class LcdDisplay {


    public LcdDisplay() throws Exception {

        I2CLcdDisplay lcd = new I2CLcdDisplay(
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


        lcd.clear();
        lcd.setCursorHome();
        lcd.write("Hello world");
        lcd.setCursorPosition(2);
        lcd.write("en annan rad, cool");
    }


}
