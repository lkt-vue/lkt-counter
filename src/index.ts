import {App, Component, Plugin} from 'vue';

import "../style.css";
import {default as libComponent} from './lib-components/LktCounter.vue';

const LktCounter: Plugin = {
  install: (app: App) => {
    if (app.component('lkt-counter') === undefined) app.component('lkt-counter', libComponent);
  }
};

export default LktCounter;