<template>
  <search-form />
  <div class="content">
    <current-weather />
    <forecast-days />
  </div>
</template>

<script>
import searchForm from './components/SearchForm.vue';
import currentWeather from './components/CurrentWeather.vue';
import forecastDays from './components/ForecastDays.vue';

//fn
import { getCurrentTimestamp } from '../src/functions.js';


export default {
  name: 'App',
  components: {
    searchForm,
    currentWeather,
    forecastDays
  },
  mounted () {
    this.classForBody();

    //if have data from current axios
     window.eventBus.on('load-current-data', data => {
        //current timestamp
        let currentTimestamp = getCurrentTimestamp()
        //timezone by location
        let currentZone = data.timezone;
        //timestamp by location
        let result = currentTimestamp + currentZone;
        //current hour by location
        let locationTime = new Date((result) * 1000).getHours();
        
        //change body class by hour
        this.classForBody(locationTime);
    });
   
  },
  methods: {
    //load current timestamp
    getCurrentTimestamp,
    //class for body
    classForBody(locationHour) {
      
      const date = new Date();
      let hour = date.getHours();

      //if have time form location, set it
      if (locationHour) {
        hour = locationHour
      }

      let timeClass = '';
      //night, morning, day, afternoon,

      // 5 - 8
      if ( hour > 4 && hour < 9 ) {
        timeClass = "morning";
      }
      // 9 - 15
      else if( hour >= 9 && hour < 16 ){
          timeClass = "day";
      }
      // 16 - 20
      else if( hour >= 16 && hour < 21 ){
          timeClass = "afternoon";
      }
      //21 - 4
      else {
          timeClass = "night";
      }

      document.body.className = '';
      document.body.classList.add(timeClass ? timeClass : 'default')
      }
  },
}
</script>

<style lang="scss">
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: #222;
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  transition: 0.1s;
}

#app {
  width: 90%;
  margin: 2rem auto;

  display: flex;
  flex-flow: column;
  align-items: center;
}

.content {
  display: flex;
  flex-flow: row;
  justify-content: space-evenly;
  width: 100%;
  max-width: 800px;
}

@media (max-width: 800px)  {
    .content {
      flex-flow: column;
    }

    #app {
      align-items: stretch;
    }
}

.morning {
  background: rgb(34,193,195);
  background: linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%);
}

.day {
  background: rgb(199,225,255);
  background: linear-gradient(0deg, rgba(199,225,255,1) 40%, rgba(19,89,255,1) 100%);
}

.afternoon {
  background: rgb(131,58,180);
  background: linear-gradient(356deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%);
}

.night {
  background: rgb(2,0,36);
  background: linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 60%, rgba(0,212,255,1) 100%);
}
</style>
