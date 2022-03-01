<template>
  <div>
    <li v-for="team in teams" :key="team.name">
      <div class="team">
        <div class="team-header">
          <h2 class="rank">{{team.rank}}</h2>
          <h1>{{ team.name }}</h1>
        </div>
          <div class="info">
              <h2>{{ team.points }} Punkte</h2>
              <div v-for="driver in team.drivers" :key="driver.name">
                {{driver.name}}
              <img :src="getImgUrl(driver.picture)"/>
          </div>
        </div>
      </div>
    </li>

  </div>
</template>

<script>
import data from '../data.json';

export default {
  name: 'DriverList',
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
      teams: data.teams
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.team-header {
  display: grid;
  grid-template-columns: 1fr 5fr;
}
.team .rank {
  margin: auto;
  background-color: #ffffff;
  height: 4vh;
  width: 100%;
  border-radius: 0 0 2vh 0;
  padding-top: 1vh;
}
.team h1 {
  color: #ffffff;
  padding-top: 2vh;
  padding-bottom: 1vh;
  border-bottom: solid 2px rgb(255,0,0);
  font-size: 1.6rem;
}
h2 {
  font-family: "F1";
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
  width: 20vw;
  height: 30vh;
}
.team .info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  color: #ffffff;
}
.team img {
  width: 50%;
  margin: auto;
  grid-row: 2 / 2;
}
</style>
