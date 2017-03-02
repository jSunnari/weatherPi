/**
 * Communicates with the server via REST.
 * Caches the data (except currentweather) for one hour using: https://github.com/ptarjan/node-cache
 */

import request from 'superagent';
import cache from 'memory-cache';
const apiUrl = "/api/weather";

class ServerRequest {

    getCurrentWeather(){
        return defaultServerRequest(apiUrl + "/current");
    }

    getWeatherByWeek(year, weekNumber){
        return cachedServerRequest(apiUrl + "/findByWeek/" + year + "/" + weekNumber)
    }

}

function cachedServerRequest(url) {
    return new Promise((resolve, reject) => {
        let cachedResponse = cache.get(url);

        console.log(cachedResponse);

        if (cachedResponse) {
            resolve(cachedResponse);
        } else {
            request
                .get(url)
                .end((err, res) => {
                    if (err || !res.ok) {
                        reject(err);
                    } else {
                        resolve(res);
                        cache.put(url, res.body, 3600000);
                        resolve(res.body);
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



