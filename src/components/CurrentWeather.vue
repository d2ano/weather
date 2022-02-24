<template>
    <!-- current day -->
    <transition name="current">
        <current-day v-if="showWeather"
            :city="city"
            :country="country"
            :currentTime="currentTime"
            :currentTemp="currentTemp"
            :image="image"
            :description="description"
        />
    </transition>
  
    <!-- info panel -->
    <transition name="fade">
        <info-panel v-if="showInfo" :message="message"/>
    </transition>
</template>

<script>
import infoPanel from './InfoPanel.vue'
import currentDay from './CurrentDay.vue'

import { getCurrentTimestamp , setIcon } from '../functions.js';

    export default {
        components: {
            infoPanel,
            currentDay
        },
        data() {
            return {
                //current
                city: '',
                country: '',
                currentTemp: '',
                description: '',
                hour: '',
                image: '',

                //general
                showWeather: false,
                showInfo: false, 
                message: '',
                timezone: '',

                currentTime: ''
            }
        },
        mounted () {
            //if have data from current axios
            window.eventBus.on('load-current-data', data => {
                this.addData(data)

                let hour = this.getCurrentHourByLocation();
                let description = this.description;

                this.setIcon( hour , description );
            });
            
            //if have error from load current data
            window.eventBus.on('error-current-data', () => {
                this.removeData();
            });

            //more chars
            window.eventBus.on('min-string', () => {
                this.showWeather = false;
                this.showInfo = true
                this.message = 'napis aspon 3 znaky'
            });

            //it is empty
            window.eventBus.on('have-not-got-string', () => {
                this.showInfo = false
            });

        },
        methods: {
            setIcon,
            //format data from SECCESS load
            addData(data){
                this.showWeather = true
                this.showInfo = false

                //data for current weather
                this.city = data.name
                this.country = data.sys.country
                this.currentTemp = data.main.temp
                this.description = data.weather[0].description
                this.timezone = data.timezone
            },

            //format data from ERROR load
            removeData(){
                this.showWeather = false
                this.showInfo = true
                this.message = 'skus ine mesto'

                //reset data for current weather
                this.city = ''
                this.country = ''
                this.currentTemp = ''
                this.description = ''
                this.timezone = ''
            },
            //get current timestamp
            getCurrentTimestamp,
            //get current timestamp by location
            getCurrentTimestampByLocation() {
                return this.getCurrentTimestamp() + this.timezone;
            },
            //get current hour
            getCurrentHour( timestamp ) {
                return new Date(( timestamp ) * 1000).getHours();
            },
            //get current hour by location
            getCurrentHourByLocation() {
                return this.getCurrentHour(  this.getCurrentTimestampByLocation() );
            },
            //get current time by location
            getCurrentTimeByLocation() {
                return new Date(( this.getCurrentTimestampByLocation() ) * 1000).toLocaleString();
            },
            //set hour and cate to variabless
            setWeatherTime(){
                //set current hour
                this.hour = this.getCurrentHourByLocation();

                //set current time by location
                this.currentTime = this.getCurrentTimeByLocation();
            },
        },
        created() {
                //clock
                setInterval(this.setWeatherTime, 1000);
            },
    }
</script>

<style lang="scss" scoped>

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.current-enter-active,
.current-leave-active {
  transition: opacity 0.2s ease;
}

.current-enter-from,
.current-leave-to {
  opacity: 0;
}
</style>