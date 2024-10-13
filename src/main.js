import './assets/main.css'

import { createApp, reactive, watch } from 'vue'
import router from './router'
import App from './App'
import model from '/src/proximityDemoModel.js'

const reactiveModel = reactive(model);

const app = createApp(App)

app.use(router(reactiveModel))

app.mount('#root')

window.mymodel=model;

