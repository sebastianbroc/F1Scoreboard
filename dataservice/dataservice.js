const fs = require('fs');

const addObject = (path, temperature, humidity, pressure, place, day, month, year, hour, minute, callback) => {
    let array = JSON.parse(fs.readFileSync(path,'utf8',callback));

    let newentry = {};
    newentry.temperature = temperature;
    newentry.humidity = humidity;
    newentry.pressure = pressure;
    newentry.place = place;
    newentry.day = day;
    newentry.month = month;
    newentry.year = year;
    newentry.hour = hour;
    newentry.minute = minute;

    array.push(newentry);

    array = JSON.stringify(array);
    fs.writeFileSync(path,array);
    return callback(null, "new data entry was added!");
}

const getData = (path) => {
    let array = JSON.parse(fs.readFileSync(path,'utf8'));
    return (JSON.stringify(array));
}

const getPlace = (path) => {
    let array = JSON.parse(fs.readFileSync(path,'utf8'));
    return (array[array.length-1].place);
}

const getAllStations = (path) => {
    let array = JSON.parse(fs.readFileSync(path,'utf8'));
    let places = [];

    let i = 0;
    array.forEach(element => {
        places[i] = element.place;
        i++;
    })
    let unique = places.filter((value, index) => places.indexOf(value) === index); //This is an array of all locations of weather stations without duplicates.

    return (JSON.stringify(unique));
}

const getStationsLatest = (path) => {
    let array = JSON.parse(fs.readFileSync(path,'utf8'));
    let unique = JSON.parse(getAllStations(path));

    let response = [];
    let tobepushed = {};

    unique.forEach(element => {
        array.forEach(data => {
            if(element == data.place){
                tobepushed = data;
            }
        })
        response.push(tobepushed);
    })

    return (JSON.stringify(response));
}

const getDate = (path) => {
    let array = JSON.parse(fs.readFileSync(path,'utf8'));

    let date = {}
    date.day = array[array.length-1].day;
    date.month = array[array.length-1].month;
    date.year = array[array.length-1].year;
    date.hour = array[array.length-1].hour;
    date.minute = array[array.length-1].minute;

    return (JSON.stringify(date));
}


module.exports.addObject = addObject;
module.exports.getData = getData;
module.exports.getPlace = getPlace;
module.exports.getDate = getDate;
module.exports.getAllStations = getAllStations;
module.exports.getStationsLatest = getStationsLatest;