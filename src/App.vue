<template>
  <meta name="apple-mobile-web-app-status-bar-style" content="red">
  <transition name="fade">
    <div v-if="show" id="splashscreen"><img src="@/assets/F1.png"></div>
  </transition>
  <div class="bg-image"></div>
  <div class="header">
    <h1>F1-Sommer-Season 2022</h1>
    <img src="@/assets/F1.png">
  </div>
  <div class="spacer"></div>
  <div class="content">
    <TeamList class="TeamList"/>
    <DriverList/>
    <RacesList/>
  </div>
</template>

<script>
import TeamList from './components/TeamList.vue'
import DriverList from './components/DriverList.vue'
import RacesList from './components/RacesList.vue'

export default {
  name: 'App',
  components: {
    TeamList,
    DriverList,
    RacesList
  },
  data() {
    return {
      show: true
    }
  },
  mounted(){
    setTimeout(() => {
      this.show = false;
    }, 2500);
  }
}

</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s, filter 1s
}

.fade-enter,
.fade-leave-to

{
  opacity: 0;
  filter: blur(10px);
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 1s ease-in-out;
}

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
  top: 10%;
  left: 0;
  right: 0;
  margin: 0;
  padding: 0;
  z-index: 3;
  backdrop-filter: blur(5px) grayscale(30%);
  height: 10vh;
  width: 100vw;
  border-radius: 0 0 10px 10px;
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
  grid-template-columns: 2fr 2fr 3fr;
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

#splashscreen {
  content: " ";
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  background: rgba(0, 0, 20, 1);
  color: red;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex; align-items: center; justify-content: center;
}

#splashscreen img {
  width: 20%;
}

body {
  margin: 0;
}

@media only screen and (max-width: 600px) {
  .content {
    margin-top: 15vh;
    grid-template-columns: 1fr;
  }

  .spacer {
    height: 5vh;
  }

  .header img {
    width: 15%;
  }

  .header h1 {
    font-size: 5vw;
  }
}
</style>
