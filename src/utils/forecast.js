const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c1c6dcc59fda6a1b954caa6d6b35ac40&query=' + latitude + ',' + longitude + '&units=m';
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather services', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It\'s ' + body.current.temperature + ' Celsius degrees out,' +
            ' and it feels like ' + body.current.feelslike + '. Humidity: is ' + body.current.humidity + '%');
        }
    })
}

module.exports = forecast;