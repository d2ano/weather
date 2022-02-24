<template>
    <section class="inputSection">
        <input type="text" v-model="city" @input="getData" @blur="noMessage" ref="input" @click="selectInput" placeholder="city name">
    </section>
</template>

<script>
import { debounce } from 'lodash';
import axios from 'axios';

    export default {
        data() {
            return {
                //general
                city: '',
                lang: 'sk',
                units: 'metric',

                //current
                api_key: 'b610dcc86c320d0470e92bd3635f75b1',
                base_url: 'https://api.openweathermap.org/data/2.5/weather',

                //forecast
                base_url_forecast: 'https://api.openweathermap.org/data/2.5/onecall',
                exclude: 'hourly,minutely,current',
                lat: '',
                lon: '',
            }
        },
        methods: {
            getData : debounce(function() {
                if (this.city.length > 2) {
                    //current fetch
                    axios.get(`${this.base_url}?q=${this.city}&appid=${this.api_key}&lang=${this.lang}&units=${this.units}`)
                        .then(response => {
                            //save lat and lot from api
                            let result = response.data;
                            this.lat = Math.round(result.coord.lat * 100) / 100
                            this.lon = Math.round(result.coord.lon * 100) / 100

                            //timezone
                            let zona = result.timezone - 3600;
                            
                            result.timezone = zona

                            //emit success data
                            window.eventBus.emit('load-current-data', result)

                            //forecast fetch
                            axios.get(`${this.base_url_forecast}?lat=${this.lat}&lon=${this.lon}&exclude=${this.exclude}&appid=${this.api_key}&lang=${this.lang}&units=${this.units}`)
                                .then(response => {
                                    //emit forecast data
                                    window.eventBus.emit('load-forecast-data', response.data.daily)
                                
                                })
                                .catch(() => {
                                    //error forecast data
                                    window.eventBus.emit('error-forecast-data')
                                });
                        
                        })
                        .catch(() => {
                            //reset lat and lot
                            this.lat = '';
                            this.lon = '';

                            //emit error data
                            window.eventBus.emit('error-current-data')
                        });
                }
                else {
                    //emit 
                    window.eventBus.emit('min-string')

                    //reset lat and lot
                    this.lat = '';
                    this.lon = '';
                }
		    }, 500),
            noMessage(){
                //if have not got value in input
                if (this.$refs.input.value == '') {
                    window.eventBus.emit('have-not-got-string')
                }
                this.$refs.input.placeholder = 'city name'
            },
            selectInput(){
                //select input
                this.$refs.input.select()
                this.$refs.input.placeholder = ''
            },
        },
        mounted () {
            this.selectInput()
        },
    }
</script>

<style lang="scss" scoped>
.inputSection {
    align-self: center;
    padding-bottom: 2rem;
}
input {
    background-color:rgba(255,255,255,0.3);
    border-radius: 0.5rem;
    border: 0;
    padding: 0.5rem 0rem;
    font-size: 1.5rem;
    text-align: center;
    transition: 0.1s;
    color: #333;
}

input:focus {
    background-color: rgba(255,255,255,0.6);
    outline: none;
}

::placeholder {
  color: rgba(0,0,0,0.1);
}

@media (max-width: 800px)  {
    .inputSection {
        padding-bottom: 1rem;
    }
}

@media (max-width: 300px)  {
    input {
        font-size: 1rem;
    }
}

</style>