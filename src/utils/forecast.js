const request = require('request');

const forecast = (lat, lon, callback)=>{
    
    const url = `http://api.weatherstack.com/current?access_key=79fc4f5e76aae88c671bcc7eec9728ef&query=${lat}, ${lon}&units=f`;
    // const url = `https://api.positionstack.com/v1/reverse?access_key=d76119124a2ef86688192d112c63ae67&limit=1&query=${latitude},${longitude}&units=f`;
    request({url, json: true}, (error, {body})=>{

    //    console.log(response.body) //debugger
        if (error){
              callback('No internet. Try connecting to a network service.', undefined);
        }else if(body.error){
             callback(body.error.info, undefined);
        }else{
             callback(undefined, body.current.weather_descriptions +'. It is currently ' + body.current.temperature + ' degrees out' + '. ' + 'There is ' + body.current.feelslike + '%' + ' chance of rain.');
        };
    });
};

module.exports = forecast;














// const request = require('request');

// const forecast = (latitude, longitude, callback)=>{

//     const url = `https://api.positionstack.com/v1/reverse?access_key=d76119124a2ef86688192d112c63ae67&limit=1&query=${latitude},${longitude}&units=f`;
//     request({url, json: true}, (error, {body})=>{

//     //    console.log(response.body) //debugger

//         if (error){
//               callback('No internet. Try connecting to a network service.', undefined);
//         }else if(body.error){
//              callback(body.error.message, undefined);
//         }else{
//             if(body.data.length > 0) {
//                 callback(undefined, body.data[0]['number'] +'. It is currently ' + body.data[0]['postal_code'] + ' degrees out' + '. ' + 'There is ' + body.data[0]['confidence'] + '%' + ' chance of rain.');
//             } else {
//                 callback("Unknown Error: Data retunred an empty array", undefined);
//             }
//         };
//     });
// };

// module.exports = forecast;