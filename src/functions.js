//hellper functions

//format temperatur
function temp( temperature ){
    return Math.round( temperature * 10) / 10 + ' °'
}

function getCurrentTimestamp() {
    return Math.round((new Date()).getTime() / 1000);
}


function setIcon( hour , description ) {
    
    //set image
    //zamračené, oblačno
    if (description == 'zamračené' || description == 'oblačno') {
        this.image = 'cloudy.svg'
    }
    //jasná obloha, tamker jasno
    else if (description == 'jasná obloha' || description == 'takmer jasno') {
        //ak je den
        if (hour > 4 && hour < 21) {
            this.image = 'day.svg'
        }
        //ak je noc
        else {
            this.image = 'night.svg'
        }
    }
    //polojasno
    else if (description == 'polojasno') {
        //ak je den
        if (hour > 4 && hour < 21) {
            this.image = 'day-cloudy.svg'
        }
        //ak je noc
        else {
            this.image = 'night-cloudy.svg'
        }
    }

    //slabý dážď, mierny dážď
    else if (description == 'slabý dážď' || description == 'mierny dážď') {
        this.image = 'rainy.svg'
    }
    //sneženie , silné sneženie , slabé sneženie
    else if (description == 'sneženie' || description == 'silné sneženie' || description == 'slabé sneženie' || description == 'rain and snow') {
        this.image = 'snowy.svg'
    }
    //hmla
    else if (description == 'hmla') {
        this.image = 'mist.svg'
    }
}



export { temp, getCurrentTimestamp , setIcon }

