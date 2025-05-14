<script setup lang="ts">

import {Counter, CounterConfig, CounterType, getDefaultValues} from "lkt-vue-kernel";

const props = withDefaults(defineProps<CounterConfig>(), getDefaultValues(Counter));
console.log('counter iniciado: ');

if (props.type === CounterType.Date) {
    var currentDate = new Date();
    var targetDate = new Date('2036-03-15T23:23:23')
    var dateInterval = setInterval(() => {
        currentDate.setSeconds(currentDate.getSeconds() + 1);
        let visibleDate = new Date(targetDate - currentDate);
        console.log('currentDate: ', visibleDate.getFullYear() - 1970, visibleDate.getMonth(), visibleDate.getDate(), visibleDate.getHours(), visibleDate.getMinutes(), visibleDate.getSeconds())
    }, 1000);
}

</script>

<template>

</template>

<style scoped>

</style>