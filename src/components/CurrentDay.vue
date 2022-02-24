<template>
    <section class="currentSection">
        <div class="currentWeather">
            <h1 class="currentCity">{{ city }} / <span>{{ country }}</span></h1>
            <p>{{ currentTime }}</p>
            <div class="flexik">
                <h2 class="currentTemp">{{ temp(currentTemp) }}</h2>
                <img :src="'/img/' + image" alt="">
            </div>
            <p class="currentDescription">{{ description }}</p>
        </div>
    </section>
</template>

<script>
import { temp } from '../functions.js';
    export default {
        props: ['city' , 'country' , 'currentTime' , 'currentTemp' , 'image' , 'description'],
        methods: {
            temp,
        },
    }
</script>

<style lang="scss" scoped>
.currentWeather {
    background-color:rgba(255,255,255,0.3);
    border-radius: 0.5rem;
    padding: 1.5rem 1.5rem;
    text-align: center;
}

.currentCity{
    font-size: 1.2rem;
}

.currentTemp {
    font-size: 4.1rem;
    margin: 0;
    white-space: nowrap;
}

img {
    max-width: 100%;
    height: auto;
    width: 25%;
}

.flexik {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    flex-direction: row-reverse;
    justify-content: center;
    align-content: space-between;
}
.currentSection {
    margin-bottom: 1rem;
    align-self: auto;
}


@media (max-width: 400px)  {
    .currentTemp {
        font-size: 3.5rem;
    }

    .currentWeather {
        padding: 0.5rem;
    }
}

@media (max-width: 300px)  {
    .currentTemp {
        font-size: 3rem;
    }
}
</style>