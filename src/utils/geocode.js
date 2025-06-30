const request = require('request');

const geocode = (address, callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=79fc4f5e76aae88c671bcc7eec9728ef&query=${encodeURIComponent(address)}&units=f`;
    // const url = `https://api.positionstack.com/v1/forward?access_key=d76119124a2ef86688192d112c63ae67&limit=1&query=${encodeURIComponent(address)}&output=json`;
    request({ url, json: true }, (error, {body})=>{
        //  console.log(response.body);
        if(error) {
          callback('Unable to connect to location services.', undefined);
        } else if(body.error){
            callback('Unable to find location. Try another search entry.', undefined);
        }else {
            callback(undefined, {
                latitude:  body.location.lat,
                longitude: body.location.lon,
                location:  body.location.name,
                // state:     body.location.region,
                // country:   body.location.country
            });
        }
    });
};

module.exports = geocode;








// const request = require('request');

// const geocode = (address, callback)=>{
//     const url = `https://api.positionstack.com/v1/forward?access_key=d76119124a2ef86688192d112c63ae67&limit=1&query=${encodeURIComponent(address)}&output=json`;
//     request({url, json: true}, (error, {body})=>{
//         //  console.log(response.body);
//         if(error) {
//           callback('Unable to connect to location services.', undefined);
//         } else if(body.error){
//             callback('Unable to find location. Try another search entry.', undefined);
//         }else {
//             callback(undefined, {
//                 latitude:  body.data[0].latitude,
//                 longitude: body.data[0].longitude,
//                 location:  body.data[0].name,
//                 // state:     body.location.region,
//                 // country:   body.location.country
//             });
//         }
//     });
// };

// module.exports = geocode;