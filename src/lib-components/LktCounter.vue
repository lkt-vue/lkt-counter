<script setup lang="ts">

import {Counter, CounterConfig, CounterType, getDefaultValues} from "lkt-vue-kernel";
import {ref} from "vue";

const props = withDefaults(defineProps<CounterConfig>(), getDefaultValues(Counter));

const displayValue = ref(props.type === CounterType.Number ? parseFloat(props.from) : props.from);
const refreshInterval = ref(undefined);
const stepValue = ref(typeof props.step === 'undefined' ? 1 : parseFloat(props.step));
const stepDuration = ref(typeof props.timeout === 'undefined' ? 1000 : parseFloat(props.timeout));
const limit = ref(props.type === CounterType.Number ? parseFloat(props.to) : props.to);

if (props.type === CounterType.Number) {
    refreshInterval.value = setInterval(() => {
        if (displayValue.value < limit.value) {
            displayValue.value += stepValue.value;
        } else if (displayValue.value > limit.value) {
            displayValue.value -= stepValue.value;
        } else {
            clearInterval(refreshInterval.value);
        }
    }, stepDuration.value);

} else if (props.type === CounterType.Date) {
    let currentDate = typeof props.from === 'undefined' ? new Date() : new Date(props.from);
    let targetDate = typeof props.to === 'undefined' ? new Date() : new Date(props.to);
    refreshInterval.value = setInterval(() => {

        if (currentDate.getTime() < targetDate.getTime()) {
            currentDate.setSeconds(currentDate.getSeconds() + stepValue.value);
        } else if (currentDate.getTime() > targetDate.getTime()) {
            currentDate.setSeconds(currentDate.getSeconds() - stepValue.value);
        }

        // Find the distance between now and the count down date
        let distance = targetDate - currentDate;

        // Time calculations for days, hours, minutes and seconds
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        displayValue.value = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
        displayValue.value = props.dateFormat
            .replace(':d', days)
            .replace(':h', hours)
            .replace(':m', minutes)
            .replace(':s', seconds)

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(refreshInterval.value);
        }
    }, stepDuration.value);
}

</script>

<template>
<div class="lkt-counter">{{displayValue}}</div>
</template>