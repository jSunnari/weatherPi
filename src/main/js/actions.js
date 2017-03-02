import serverRequest from './serverRequest';
import cachedServerReqeust from './cachedServerRequest';
const serverUrl = "http://localhost:8080/";

export function getCurrentWeather() {
    return serverRequest(serverUrl + "/weather/current");
}