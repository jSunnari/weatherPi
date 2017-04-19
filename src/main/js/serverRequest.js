/**
 * Communicates with the server via REST.
 * Caches the data (except currentweather) for one hour using: https://github.com/ptarjan/node-cache
 */

import request from 'superagent';
import cache from 'memory-cache';
const apiUrl = "/api/weather";

class ServerRequest {

    getTest(date){
        return cachedServerRequest("/api/weather/search/findByDate?date=" + date);
    }

    getCurrentWeather(){
        return defaultServerRequest(apiUrl + "/current");
    }

    getWeatherByDay(day){
        return cachedServerRequest(apiUrl + "/findByDay/" + day)
    }

    getWeatherByWeek(year, weekNumber){
        return cachedServerRequest(apiUrl + "/findByWeek/" + year + "/" + weekNumber)
    }

    getWeatherByMonth(year, monthNumber){
        return cachedServerRequest(apiUrl + "/findByMonth/" + year + "/" + monthNumber)
    }

    getWeatherByYear(year){
        return cachedServerRequest(apiUrl + "/findByYear/" + year)
    }

}

function cachedServerRequest(url) {
    return new Promise((resolve, reject) => {
        let cachedResponse = cache.get(url);

        if (cachedResponse) {
            resolve(cachedResponse);
        } else {
            request
                .get(url)
                .end((err, res) => {
                    if (err || !res.ok) {
                        reject(err);
                    } else {
                        resolve(res.body);
                        cache.put(url, res.body, 3600000);
                    }
                });
        }

    });
}

function defaultServerRequest(url) {
    return new Promise((resolve, reject) => {
        request
            .get(url)
            .end((err, res) => {
                if (err || !res.ok) {
                    reject(err);
                } else {
                    resolve(res.body);
                }
            });
    });
}

export let serverRequest = new ServerRequest();



