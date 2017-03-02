/**
 * Server communications class
 */
import Request from "superagent";
import config from "./config";

class ServerRequest {

    getCurrentWeather() {
        return new Promise((resolve, reject) => {
            Request
                .get(config.serverURL + "/weather/current")
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

export let serverRequest = new ServerRequest();