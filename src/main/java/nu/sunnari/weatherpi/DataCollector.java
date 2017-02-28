package nu.sunnari.weatherpi;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * Created by Jonas on 2017-02-10.
 */

class DataCollector {

    String getCurrentDate(){
        DateFormat dateFormat = new SimpleDateFormat("EEE dd MMM ");
        Date date = new Date();
        return(dateFormat.format(date).toUpperCase());
    }

    String getCurrentTime(){
        DateFormat dateFormat = new SimpleDateFormat("HH:mm");
        Date date = new Date();
        return(dateFormat.format(date));
    }

    String getLocalIpAdress(){
        String ip = "No connection";
        try {
            ip = InetAddress.getLocalHost().getHostAddress();
        } catch (UnknownHostException e) {
            e.printStackTrace();
        }
        return ip;
    }

    Date[] getWeekDates(){
        Calendar cal = Calendar.getInstance();
        cal.setTime(new java.util.Date());
        cal.set(Calendar.WEEK_OF_YEAR, 9);
        cal.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
        java.sql.Date startDate = (java.sql.Date) cal.getTime();
        cal.add(Calendar.DAY_OF_WEEK, 6);
        java.sql.Date endDate = (java.sql.Date) cal.getTime();
        return new Date[] {startDate, endDate};
    }
}
