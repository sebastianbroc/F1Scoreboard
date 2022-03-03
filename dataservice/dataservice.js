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

    return callback(null, "Race Results for " + finishedrace + " were successfully saved!");
}

const getData = (path) => {
    let array = JSON.parse(fs.readFileSync(path,'utf8'));
    return (JSON.stringify(array));
}
module.exports.logRace = logRace;
module.exports.getData = getData;