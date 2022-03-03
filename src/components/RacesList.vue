<template>
  <div class="body">
    <div class="ranking-header"><h1>Streckenkalender</h1></div>
    <TransitionGroup class="list" tag="ul">
      <li v-for="race in races" :key="race">
          <div class="race">
            <div class="info">
              <img :src="getImgUrl(race.picture)"/>
              <div class="data">
                <h2>{{race.name}}</h2>
                <button @click="enterResults(race.name)" class="button">Ergebnis <br>eintragen</button>
                <img class="showResult" src="@/assets/finishers_list.png">
                <div class="results">
                </div>
                <div class="enterResults" :id="`${race.name}`">
                  <img @click="hideResult" src="@/assets/close-button.png">
                  <h1>Ergebnis eintragen</h1>
                  <img :src="getImgUrl(race.picture)" class="country-enter"/>
                  <h2>{{race.name}}</h2>
                  <form ref="form">
                    <h1>1. Platz</h1>
                    <select v-model="first">
                      <option>Tom</option>
                      <option>Sascha</option>
                      <option>Jan</option>
                      <option>Hendrik</option>
                      <option>Sebastian</option>
                      <option>Manuel</option>
                    </select>
                    <h1>2. Platz</h1>
                    <select v-model="second">
                      <option>Tom</option>
                      <option>Sascha</option>
                      <option>Jan</option>
                      <option>Hendrik</option>
                      <option>Sebastian</option>
                      <option>Manuel</option>
                    </select>
                    <h1>3. Platz</h1>
                    <select v-model="third">
                      <option>Tom</option>
                      <option>Sascha</option>
                      <option>Jan</option>
                      <option>Hendrik</option>
                      <option>Sebastian</option>
                      <option>Manuel</option>
                    </select>
                    <h1>4. Platz</h1>
                    <select v-model="fourth">
                      <option>Tom</option>
                      <option>Sascha</option>
                      <option>Jan</option>
                      <option>Hendrik</option>
                      <option>Sebastian</option>
                      <option>Manuel</option>
                    </select>
                    <h1>5. Platz</h1>
                    <select v-model="fifth">
                      <option>Tom</option>
                      <option>Sascha</option>
                      <option>Jan</option>
                      <option>Hendrik</option>
                      <option>Sebastian</option>
                      <option>Manuel</option>
                    </select>
                    <h1>6. Platz</h1>
                    <select v-model="sixth">
                      <option>Tom</option>
                      <option>Sascha</option>
                      <option>Jan</option>
                      <option>Hendrik</option>
                      <option>Sebastian</option>
                      <option>Manuel</option>
                    </select>
                    <h1>Schnellste Runde</h1>
                    <select v-model="fastest">
                      <option>Tom</option>
                      <option>Sascha</option>
                      <option>Jan</option>
                      <option>Hendrik</option>
                      <option>Sebastian</option>
                      <option>Manuel</option>
                    </select>
                    <input type="submit" value="Eintragen" id="submit" v-on:click="submit">
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
  methods :{
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
    submit() {
      let result = [];
      result.push({name: this.first, points: 25});
      result.push({name: this.second, points: 18});
      result.push({name: this.third, points: 15});
      result.push({name: this.fourth, points: 12});
      result.push({name: this.fifth, points: 10});
      result.push({name: this.sixth, points: 8});
      result.push({name: this.fastest, points: 1});

      console.log(result);

      this.drivers.forEach(driver => {
        for(let i in result){
          if(driver.name === result[i]){
            driver.points += result[i].points;
          }
        }
      })

      let json = JSON.stringify(this.drivers);
      window.localStorage.setItem('data', json);


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
    fetch("http://127.0.0.1:3000/data")
        .then(response => response.json())
        .then(data => {
          let Drivers = [];
          for(let i in data.teams){
            for(let t in data.teams[i].drivers){
              Drivers.push(data.teams[i].drivers[t]);
            }
          }

          this.races = data.races;
          this.drivers = Drivers;
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
  z-index: 3;
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
}

.race h1 {
  color: #ffffff;
  padding-top: 2vh;
  padding-bottom: 1vh;
  border-bottom: solid 2px rgb(255,0,0);
  font-size: 1rem;
}
h2 {
  font-family: "F1";
  display: inline-block;
  font-size: 1rem;
}
h3 {
  margin: 40px 0 0;
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
  border-radius: 0 0 2vw 0;
  width: 35vw;
  height: 8vh;
  margin-bottom: 2vh;
}

.race .finished {
  filter: blur(8px);
  -webkit-filter: blur(8px);
}
.race .info {
  text-align: center;
  display: flex;
  height: 100%;
  color: #ffffff;
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
  justify-content: space-between;
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

.enterResults {
  display: none;
}

.button {
  font-family: "F1";
  height: 80%;
  line-height: 130%;
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 1%;
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
  z-index: 5;
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

#submit {
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
</style>
