<template>
  <div class="body">
    <div class="ranking-header"><h1>Streckenkalender</h1></div>
    <TransitionGroup class="list" tag="ul">
      <li v-for="race in races" :key="race">
          <div class="race" :id="`${race.name}`">
            <div class="info">
              <img :src="getImgUrl(race.picture)"/>
              <h2>{{race.name}}</h2>
              <div class="data">
                <button v-if="race.finished != true" @click="enterResults(race.name)" class="button">Ergebnis <br>eintragen</button>
                <h3 v-if="race.finished">Rennen <br>abgeschlossen</h3>
                <img v-if="race.finished" src="@/assets/finishers_list.png" class="showPlacements" @mouseover="showPopup(race.name)" @mouseleave="showPopup(race.name)">
                <div class="popup" :id="`${race.name}`"><span class="popuptext" id="Popup">
                  <h3 style="text-decoration: underline;">Finish-Rangfolge</h3>
                  <ol v-for="(driver, index) in race.finishers" :key="driver">
                    <h4 v-if="index < 6">{{index + 1}}. {{driver}}</h4>
                    <h4 v-if="index === 6">Schnellste Runde: {{driver}}</h4>
                  </ol></span></div>
                <!--<img class="showResult" src="@/assets/finishers_list.png">-->
                <div class="results">
                </div>
                <div class="enterResults" :id="`${race.name}`">
                  <img @click="hideResult" src="@/assets/close-button.png">
                  <h1 style="border-bottom: solid 3px rgb(255,0,0); padding-bottom: 1vh; width: 90%;">Ergebnis eintragen</h1>
                  <img :src="getImgUrl(race.picture)" class="country-enter"/>
                  <h2>{{race.name}}</h2>
                  <form ref="form">
                    <h1 style="color: gold;">1. Platz (25)</h1>
                    <select v-model="first">
                      <option>Tom</option>
                      <option>Sascha</option>
                      <option>Jan</option>
                      <option>Hendrik</option>
                      <option>Sebastian</option>
                      <option>Jerry</option>
                    </select>
                    <h1 style="color: silver;">2. Platz (18)</h1>
                    <select v-model="second">
                      <option>Tom</option>
                      <option>Sascha</option>
                      <option>Jan</option>
                      <option>Hendrik</option>
                      <option>Sebastian</option>
                      <option>Jerry</option>
                    </select>
                    <h1 style="color: #CD7F32">3. Platz (15)</h1>
                    <select v-model="third">
                      <option>Tom</option>
                      <option>Sascha</option>
                      <option>Jan</option>
                      <option>Hendrik</option>
                      <option>Sebastian</option>
                      <option>Jerry</option>
                    </select>
                    <h1>4. Platz (12)</h1>
                    <select v-model="fourth">
                      <option>Tom</option>
                      <option>Sascha</option>
                      <option>Jan</option>
                      <option>Hendrik</option>
                      <option>Sebastian</option>
                      <option>Jerry</option>
                    </select>
                    <h1>5. Platz (10)</h1>
                    <select v-model="fifth">
                      <option>Tom</option>
                      <option>Sascha</option>
                      <option>Jan</option>
                      <option>Hendrik</option>
                      <option>Sebastian</option>
                      <option>Jerry</option>
                    </select>
                    <h1>6. Platz (8)</h1>
                    <select v-model="sixth">
                      <option>Tom</option>
                      <option>Sascha</option>
                      <option>Jan</option>
                      <option>Hendrik</option>
                      <option>Sebastian</option>
                      <option>Jerry</option>
                    </select>
                    <h1>Schnellste Runde (1)</h1>
                    <select v-model="fastest">
                      <option>Tom</option>
                      <option>Sascha</option>
                      <option>Jan</option>
                      <option>Hendrik</option>
                      <option>Sebastian</option>
                      <option>Jerry</option>
                    </select>
                    <input type="submit" value="Eintragen" class="submit" v-on:click="submit(race.name)">
                  </form>
                </div>
              </div>
            </div>
          </div>
      </li>
    </TransitionGroup>
  </div>
</template>

<script>
export default {
  name: 'RacesList',
  props: {
    msg: String
  },
  methods: {
    showPopup(race){
      let popups = document.querySelectorAll('.popup');
      popups.forEach(element => {
        if(element.id === race){
          element.classList.toggle('show');
        }
      })
    },
    getImgUrl(name) {
      let images = require.context('../assets/races/', false, /\.png$/)
      return images('./' + name + ".png");
    },
    enterResults(racename) {
      let resultwindow = document.querySelectorAll('.enterResults');
      resultwindow.forEach(element => {
        if(element.id === racename){
          element.classList.add('active');
        }
      })
    },
    hideResult() {
      let resultwindow = document.querySelectorAll('.enterResults');
      resultwindow.forEach(element => {
        element.classList.remove('active');
      })
    },
    submit(racename) {
      let result = [];
      result.push({name: this.first, points: 25});
      result.push({name: this.second, points: 18});
      result.push({name: this.third, points: 15});
      result.push({name: this.fourth, points: 12});
      result.push({name: this.fifth, points: 10});
      result.push({name: this.sixth, points: 8});
      result.push({name: this.fastest, points: 1});

      this.drivers.forEach(driver => {
        for(let i in result){
          if(driver.name === result[i].name){
            driver.points += result[i].points;
          }
        }
      })

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({drivers: this.drivers, race: racename, positions: result})
      };
      fetch("https://f1dataservice.herokuapp.com/logRace", requestOptions)

      //let json = JSON.stringify(this.drivers);

      //this.$refs.form.$el.submit();
    }
  },
  data(){
    return {
      races: null,
      drivers: null,
      first: '',
      second: '',
      third: '',
      fourth: '',
      fifth: '',
      sixth: '',
      fastest: ''
    }
  },
  created(){
    fetch("https://f1dataservice.herokuapp.com/teams")
        .then(response => response.json())
        .then(data => {
          let Drivers = [];
          for(let i in data){
            for(let t in data[i].drivers){
              Drivers.push(data[i].drivers[t]);
            }
          }

          //this.races = data.races;
          this.drivers = Drivers;
        });

    fetch("https://f1dataservice.herokuapp.com/races")
        .then(response => response.json())
        .then(data => {
          this.races = data;
        });

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

li {
  transition: all 1s ease-in-out;
}

.ranking-header {
  z-index: 4;
  display: inline-block;
  position: sticky;
  top: 20%;
  width: 35vw;
  height: 5vh;
  background-color: rgba(0,0,30,1);
  color: #ffffff;
  margin-bottom: 1.5vh;
  border-bottom: solid 3px rgb(255,0,0);
  box-shadow: 0 8px 10px -6px black;
}

.ranking-header h1 {
  font-family: "F1-Bold";
  font-size: 1.3rem;
  line-height: 100%;
  align-self: center;
}

.race h1 {
  color: #ffffff;
  font-size: 1rem;
}
h2 {
  font-family: "F1";
  display: inline-block;
  font-size: 1rem;
  margin-top: auto;
  margin-bottom: auto;
}
h3 {
  font-family: "F1";
  color: red;
  align-self: center;
  margin-right: 20px;
  font-size: 1.3vmin;
}
h4 {
  padding: 0;
  margin: 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.race {
  background-color: rgba(0,0,30,1);
  position: relative;
  border-radius: 0 0 1vw 0;
  width: 35vw;
  height: 8vh;
  margin-bottom: 2vh;
  z-index: auto;
}

.finished {
  filter: grayscale(90%);
  /*-webkit-filter: blur(8px);*/
}
.race .info {
  position: relative;
  display: flex;
  justify-content: flex-end;
  height: 100%;
  color: #ffffff;
}

.race .info h2 {
  margin-left: 5%;
}

.race .info .driver-name {
  font-size: 1rem;
}

.race .info .showResult {
  margin-right: 5%;
}
.race .info .data {
  margin-left: 5%;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.race img {
  display: inline-block;
  height: 90%;
  margin: auto;
  margin-right: 0;
  margin-left: 5%;
}

.results {
  display: none;
}

.showResult.hover {
  display: block;
  width: 200px;
  height: 500px;
}

.showPlacements {
  display: inline-block;
  height: 80%;
  padding-right: 5%;
}

.enterResults {
  display: none;
}

.button {
  font-family: "F1";
  height: 80%;
  margin-right: 5%;
  align-self: center;
  /* Created with https://www.css-gradient.com */
  background: #346715;
  background: -webkit-linear-gradient(bottom, #346715, #05BC01);
  background: -moz-linear-gradient(bottom, #346715, #05BC01);
  background: linear-gradient(to top, #346715, #05BC01);
  border: none;
  border-radius: 20px;
  transition: 0.3s ease;
}

.button:hover {
  /* Created with https://www.css-gradient.com */
  background: #346715;
  background: -webkit-linear-gradient(top, #346715, #05BC01);
  background: -moz-linear-gradient(top, #346715, #05BC01);
  background: linear-gradient(to bottom, #346715, #05BC01);
  transition: 0.3s ease;
}

.active {
  z-index: 10;
  display: block;
  position: fixed;
  left: 25%;
  top: 25%;
  width: 50%;
  height: 60%;
  background-color: rgba(0,0,30,1);
  border: solid 3px #ffffff;
  box-shadow: 0 0px 10px 1000px rgba(0,0,0,0.4);
  border-radius: 0 0 50px 0;
}

.active h1 {
  text-align: left;
  margin-left: 5%;
}

.active img {
  width: 40px;
  height: 40px;
  float: right;
}

.active .country-enter {
  float: left;
  width: 60px;
  height: 60px;
}

.active form {
  display: grid;
  grid-template-columns: 1fr 3fr;
  margin-left: 5%;
  width: 90%;
}

.active form select {
  color: #ffffff;
  font-size: 1.3rem;
  background-color: rgba(0,0,30,1);
  border: solid 2px #ffffff;
}

.active form h1 {
  padding: 0;
  font-size: 1rem;
  text-align: center;
}

.submit {
  text-align: center;
  font-family: "F1";
  grid-template-columns-start: 2;
  margin-top: 10%;
  height: 100%;
  border: none;
  background: #346715;
  background: -webkit-linear-gradient(bottom, #346715, #05BC01);
  background: -moz-linear-gradient(bottom, #346715, #05BC01);
  background: linear-gradient(to top, #346715, #05BC01);
}

/* Popup container */
.popup {
  visibility: hidden;
  position: relative;
  display: inline-block;
  cursor: pointer;
}

/* The actual popup (appears on top) */
.popup .popuptext {
  padding-left: 10px;
  padding-bottom: 5px;
  width: 200px;
  background-color: #ffffff;
  color: #000000;
  text-align: left;
  border-radius: 6px;
  position: absolute;
  z-index: 5;
  margin-left: -300px;
}

/* Toggle this class when clicking on the popup container (hide and show the popup) */
.popup.show {
  visibility: visible;
}


ol {
  margin: 0;
  padding: 0;
}

@media only screen and (max-width: 600px) {
  .race {
    width: 100%;
  }

  .ranking-header {
    top: 15%;
    width: 100%;
  }

  li {
    display: grid;
    grid-template-columns: 1fr;
  }

  .active {
    width: 100vw;
    height: 70vh;
    left: 0;
    bottom: 0;
  }

  .active form {
    grid-template-columns: 1fr 2fr;
    column-gap: 5px;
    height: 50vh;
  }

  h3 {
    font-size: 2vmin;
  }
}
</style>
