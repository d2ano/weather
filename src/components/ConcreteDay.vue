<template>
    <div class="concreteDay">
        <h4 class="city">{{ formatDay }}</h4>
        <img :src="'/img/' + image" alt="">
        <p class="temperatures">
            <span>{{ temp(min) }}</span>
            <span class="progress"></span>
            <span>{{ temp(max) }}</span>
        </p>
    </div>
</template>

<script>
import { temp , setIcon } from '../functions.js';
    export default {
        data() {
            return {
                image: ''
            }
        },
        props: {
            timestamp: {
                default: null 
            },
            desc: {
                default: null
            },
            min: {
                default: null
            },
            max: {
                default: null
            },
        },
        computed: {
            formatDay() {
                //full date from props
                let longPropsDate = new Date((this.timestamp) * 1000);
                //only day from props date
                let propsDay = new Date((this.timestamp) * 1000).toLocaleString("en-US", {day: "numeric"});
                //only day from current date
                let currentDay = new Date((Date.now())).toLocaleString("en-US", {day: "numeric"});

                //if current == props, return 'Dnes'
                if (propsDay == currentDay) {
                    return 'Dnes'
                }
                
                //format date
                longPropsDate = longPropsDate.toLocaleString("sk-SK", {weekday: "long"})
                longPropsDate = this.capitalizeFirstLetter(longPropsDate)

                return longPropsDate
            },
        },
        methods: {
            setIcon,
            //load temp
            temp,
            //first letter uppercase
            capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
        },
        created () {
            this.setIcon( 6 , this.desc)
        },
    }
</script>

<style lang="scss" scoped>
.concreteDay {
    background-color:rgba(255,255,255,0.3);
    border-radius: 0.5rem;
    padding: 1rem;
    margin-bottom: 1rem;

    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: space-around;
}

.city {
    margin: 0;
}

img {
    max-width: 100%;
    height: auto;
}

.progress {
    width: 3rem;
    height: 0.2rem;
    background-color: #222;
    border-radius: 1rem;
    margin-left: 1rem;
    margin-right: 1rem;
}

.temperatures {
    display: flex;
    flex-flow: row;
    align-items: center;
}

@media (max-width: 350px)  {
    .concreteDay {
        font-size: 90%;
        padding: 0rem 0.5rem;
    }

    img {
        width: 20%;
    }
}

@media (max-width: 330px)  {
    .concreteDay {
        font-size: 80%;
    }

    .progress {
        width: 2rem;
        margin-left: 0.5rem;
        margin-right: 0.5rem;
    }
}

@media (max-width: 280px)  {
    .concreteDay {
        font-size: 70%;
    }

    .progress {
        width: 1.5rem;
    }

    img {
        width: 15%;
    }
}
</style>