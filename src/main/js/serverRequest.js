import request from "superagent";

export default function serverRequest(url) {
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


