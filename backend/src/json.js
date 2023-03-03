const https = require('https');

const getJsonFromWeb = function(url){
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let body = "";
        
            res.on("data", (chunk) => {
                body += chunk;
            });
        
            res.on("end", () => {
                try {
                    resolve(JSON.parse(body));
                } catch (error) {
                    reject(error.message);
                };
            });
        
        }).on("error", (error) => {
            console.error(error.message);
            reject(error);
        });
    })
    
};

module.exports = {
  getJsonFromWeb,
};