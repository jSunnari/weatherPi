import request from 'superagent';
import cache from 'memory-cache';
const serverUrl = "http://localhost:8080";

class ServerRequest {

    getCurrentWeather(){
        return this.serverRequest(serverUrl + "/weather/current");
    }

    getWeatherByWeek(year, weekNumber){
        return this.cachedServerRequest(serverUrl + "/weather/findByWeek/" + year + "/" + weekNumber)
    }

    private cachedServerRequest(url) {
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
                            cache.put(url, res.body);
                            resolve(res.body);
                        }
                    });
            }

        });
    }

    private serverRequest(url) {
        return new Promise((resolve, reject) => {
            request
                .get(url)
                .end((err, res) => {
                    if (err || !res.ok) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                });
        });
    }
}

export let serverRequest = new ServerRequest;



