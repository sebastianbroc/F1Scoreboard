<template>
  <div class="bg-image"></div>
  <div class="header">
    <h1>F1-Sommer-Season 2022</h1>
    <img src="@/assets/F1.png">
  </div>
  <div class="spacer"></div>
  <div class="content">
    <TeamList class="TeamList"/>
    <DriverList/>
  </div>
</template>

<script>
import TeamList from './components/TeamList.vue'
import DriverList from './components/DriverList.vue'

export default {
  name: 'App',
  components: {
    TeamList,
    DriverList
  }
}

</script>

<style>
@font-face {
  font-family: "F1";
  src: local("F1"),
    url(./assets/fonts/Formula1-Regular.ttf) format("truetype");
}

@font-face {
  font-family: "F1-Bold";
  src: local("F1-Bold"),
  url(./assets/fonts/Formula1-Bold.ttf) format("truetype");
}

.header {
  z-index: 4;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: rgba(0,0,30,1);
  margin-bottom: 0;
  border-bottom: solid 5px rgb(255,0,0);
}

.header img {
  width: 6%;
  padding-top: 0;
  padding-bottom: 20px;
}

.spacer {
  position: sticky;
  top: 100px;
  left: 0;
  right: 0;
  margin: 0;
  padding: 0;
  z-index: 3;
  backdrop-filter: blur(5px) grayscale(30%);
  height: 10vh;
  width: 100vw;
}
h1 {
  color: #ffffff;
  font-family: "F1";
  text-align: center;
}

.bg-image {
  position: fixed;
  left: 0;
  right: 0;
  z-index: 1;
  background-image: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(./assets/austria.jpeg);
  filter: blur(12px);
  -webkit-filter: blur(12px);
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.content {
  display: grid;
  grid-template-columns: 1fr 2fr 5fr;
  position: relative;
  left: 0;
  right: 0;
  z-index: 2;
  margin-top: 10vh;
}

.TeamList {
  margin-top: 0;
}

#app {
  /*background-color: #666666;*/
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
