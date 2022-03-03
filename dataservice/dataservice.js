const fs = require('fs');

const logRace = (racepath, driverspath, finishedrace, newdrivers, callback) => {
    let races = JSON.parse(fs.readFileSync(racepath,'utf8',callback));
    let driverlist = JSON.parse(fs.readFileSync(driverspath, 'utf8', callback));



    races.races.forEach(race => {
        if(race.name == finishedrace){
            race.finished = true;
        }
    })

    driverlist.teams.forEach(team => {
        team.drivers.forEach(driver => {
            for(let i in newdrivers){
                if(driver.name == newdrivers[i].name){
                    driver.points = newdrivers[i].points;
                }
            }
        })
    })

    races = JSON.stringify(races);
    fs.writeFileSync(racepath, races);

    driverlist = JSON.stringify(driverlist);
    fs.writeFileSync(driverspath, driverlist);

    //console.log(race);
    //console.log(drivers);


    /*
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
    */
    return callback(null, "new data entry was added!");
}

const getData = (path) => {
    let array = JSON.parse(fs.readFileSync(path,'utf8'));
    return (JSON.stringify(array));
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


module.exports.logRace = logRace;
module.exports.getData = getData;
module.exports.getDate = getDate;
module.exports.getAllStations = getAllStations;
module.exports.getStationsLatest = getStationsLatest;