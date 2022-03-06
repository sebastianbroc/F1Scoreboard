<template>
  <div class="body">
    <div class="ranking-header"><h1>Team-Ranking</h1></div>
    <li v-for="team in teams" :key="team.name">
      <div class="team">
        <div class="team-header">
          <h2 class="rank">{{team.rank}}</h2>
          <h1>{{ team.name }}</h1>
        </div>
          <div class="info">
              <h2 class="score"> {{ team.points }} Punkte</h2> <br>
              <div v-for="driver in team.drivers" :key="driver.name">
                <h2 class="driver-name">{{driver.name}}</h2>
                <h2 class="driver-name">{{driver.points}} Pts</h2>
                <img :src="getImgUrl(driver.picture)"/>
          </div>
        </div>
      </div>
    </li>
  </div>
</template>

<script>
export default {
  name: 'TeamList',
  props: {
    msg: String
  },
  methods :{
    getImgUrl(name) {
      let images = require.context('../assets/drivers/', false, /\.png$/)
      return images('./' + name + ".png");
    }
  },
  data(){
    return {
      teams: null
    }
  },
  created(){
    fetch("http://f1dataservice.hopto.org:3000/teams")
        .then(response => response.json())
        .then(data => {
          let Teams = [];
          for(let i in data.teams){
            Teams.push(data.teams[i]);
          }

          for(let i in Teams){
            Teams[i].points = 0;
            for(let t in Teams[i].drivers){
              Teams[i].points += Teams[i].drivers[t].points;
            }
          }

          Teams = Teams.sort((a, b) => {
            return a.points - b.points;
          })

          Teams = Teams.reverse();

          for(let i in Teams){
            let t = parseInt(i) + parseInt(1);
            Teams[i].rank = parseInt(t);
          }

          this.teams = Teams;

        });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ranking-header {
  display: inline-block;
  position: sticky;
  top: 20%;
  width: 25vw;
  height: 5vh;
  background-color: rgba(0,0,30,1);
  color: #ffffff;
  margin-bottom: 3vh;
  border-bottom: solid 3px rgb(255,0,0);
  box-shadow: 0 8px 10px -6px black;
}

.ranking-header::before {
  backdrop-filter: blur(5px) grayscale(30%);
}

.ranking-header h1 {
  font-family: "F1-Bold";
  font-size: 1.3rem;
  line-height: 100%;
}

.team-header {
  display: grid;
  grid-template-columns: 1fr 5fr;
  font-family: "F1-Bold";
  margin-bottom: 1vh;
}

.team .rank {
  margin: auto;
  background-color: #ffffff;
  height: 4vh;
  width: 100%;
  border-radius: 0 0 2vh 0;
  padding-top: 2vh;
  padding-bottom: 1vh;
}
.team h1 {
  color: #ffffff;
  margin: 0;
  padding-top: 1vh;
  padding-bottom: 1vh;
  border-bottom: solid 2px rgb(255,0,0);
  font-size: 1.6rem;
}
h2 {
  font-family: "F1";
  margin: 10px;
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
.team {
  background-color: rgba(0,0,30,1);
  border-radius: 0 0 2vw 0;
  width: 25vw;
  height: 35vh;
  margin-bottom: 2vh;
}
.team .info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 6fr;
  color: #ffffff;
}
.team .info .driver-name {
  font-size: 1rem;
  grid-row-start: 2;
  margin: 0;
}
.team .info .score {
  grid-column-start: 1;
  grid-row-start: 1;
  width: 100%;
  margin-left: 50%;
  margin-top: 0;
  padding-top: 0;
}
.team img {
  width: 40%;
  margin-bottom: 50px;
  grid-row-start: 1;
}

@media only screen and (max-width: 600px) {
  .team {
    width: 100%;
  }

  .ranking-header {
    top: 15%;
    width: 100%;
  }
}
</style>
