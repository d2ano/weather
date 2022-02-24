<template>
    <section class="forecastSection">
        <transition-group name="concrete">
            <concrete-day v-for="( concrete , index ) in allDays" :key="index"
                :timestamp="concrete.dt"
                :desc="concrete.weather[0].description"
                :min="concrete.temp.min"
                :max="concrete.temp.max"
            />
        </transition-group>
    </section>
</template>

<script>
import concreteDay from './ConcreteDay.vue'

    export default {
        components: {
            concreteDay,
        },
        data() {
            return {
                //forecast for 7 days
                allDays: [],
            }
        },
        mounted () {
            //if have data from forecast axios
            window.eventBus.on('load-forecast-data', 
                data => {
                    this.allDays = data;
                }
            );
            //if have error from current axios
            window.eventBus.on('error-current-data', () => {
                this.allDays = []
            });
            //more chars
            window.eventBus.on('min-string', () => {
                this.allDays = []
            });
        },
    }
</script>

<style lang="scss" scoped>
.concrete-enter-active,
.concrete-leave-active {
  transition: opacity 0.2s ease;
}

.concrete-enter-from,
.concrete-leave-to {
  opacity: 0;
}
</style>