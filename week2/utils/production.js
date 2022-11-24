'use strict';

module.exports = (app, port, httpsPort) => {
    const https = require('https');
    const fs = require('fs');
    app.enable('trust proxy');

    const sslkey  = fs.readFileSync('/etc/pki/tls/private/ca.key');
    const sslcert = fs.readFileSync('/etc/pki/tls/certs/ca.crt');
    const options = {
        key: sslkey,
        cert: sslcert
    };

    // TODO: app.use jne ilkan filestä

    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
    https.createServer(options, app).listen(8000);
};