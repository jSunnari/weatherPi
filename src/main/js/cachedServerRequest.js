import request from 'superagent';
import cache from 'memory-cache';

export default function cachedServerRequest(url) {
    return new Promise((resolve, reject) => {

        let cachedResponse = cache.get(url);

        if (cachedResponse) {
            resolve(cachedResponse);
        } else {
            request
                .get("REQUESTURL")
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