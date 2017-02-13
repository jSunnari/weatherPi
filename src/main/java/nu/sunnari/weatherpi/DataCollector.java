package nu.sunnari.weatherpi;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by Jonas on 2017-02-10.
 */

public class DataCollector {

    public String getCurrentDate(){
        DateFormat dateFormat = new SimpleDateFormat("EEE dd MMM ");
        Date date = new Date();

        return(dateFormat.format(date).toUpperCase());
    }

    public String getCurrentTime(){
        DateFormat dateFormat = new SimpleDateFormat("HH:mm");
        Date date = new Date();
        return(dateFormat.format(date));
    }
}
