<template>
  <div class="body">
    <div class="ranking-header"><h1>Fahrer-Ranking</h1></div>
    <TransitionGroup class="list" tag="ul">
      <li v-for="driver in drivers" :key="driver.rank">
          <div class="driver">
            <div class="rank"><h2>{{driver.rank}}</h2></div>
            <div class="info">
              <img :src="getImgUrl(driver.picture)"/>
              <div class="data">
                <h2>{{driver.name}}</h2>
                <h2 style="padding-right: 5%;"> {{ driver.points }} Pts</h2>
              </div>
            </div>
          </div>
      </li>
    </TransitionGroup>
  </div>
</template>

<script>
export default {
  name: 'DriverList',
  props: {
    msg: String
  },
  methods :{
    getImgUrl(name) {
      let images = require.context('../assets/drivers/', false, /\.png$/)
      return images('./' + name + ".png");
    },
  },
  data(){
    return {
      drivers: null
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

        Drivers = Drivers.sort((a, b) => {
          return a.points - b.points;
        })

        Drivers = Drivers.reverse();

        for(let i in Drivers){
          let t = parseInt(i) + parseInt(1);
          Drivers[i].rank = parseInt(t);
        }

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
  width: 40vw;
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

.driver .rank {
  float: left;
  background-color: #ffffff;
  height: 100%;
  width: 20%;
  border-radius: 0 0 2vh 0;
}

.driver .rank h2 {
  padding-top: 10%;
  line-height: 100%;
  margin: auto;
  font-size: 2rem;
}

.driver h1 {
  color: #ffffff;
  padding-top: 2vh;
  padding-bottom: 1vh;
  border-bottom: solid 2px rgb(255,0,0);
  font-size: 1.6rem;
}
h2 {
  font-family: "F1";
  display: inline-block;
  font-size: 1rem;
  margin-top: auto;
  margin-bottom: auto;
  text-align: left;
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
.driver {
  background-color: rgba(0,0,30,1);
  position: relative;
  border-radius: 0 0 1vw 0;
  width: 40vw;
  height: 8vh;
  margin-bottom: 2vh;
}
.driver .info {
  text-align: center;
  display: flex;
  height: 100%;
  color: #ffffff;
}
.driver .info .driver-name {
  font-size: 1rem;
}
.driver .info .data {
  margin-left: 5%;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.driver img {
  display: inline-block;
  height: 90%;
  margin: auto;
  margin-right: 0;
  margin-left: 5%;
}

@media only screen and (max-width: 600px) {
  .driver {
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
}
</style>
