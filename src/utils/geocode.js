const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZ3JhdmVnZ2kiLCJhIjoiY2tyeXY0dWJ3MTN3ZjJ2bnEwYm9vbHRtbCJ9._iTvP8X1ryf0DahAayNDJA&limit=1&language=it';
    request({ url, json: true }, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to location services.', undefined);
        } else if (body.error || body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;