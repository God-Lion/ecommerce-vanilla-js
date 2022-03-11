import './config/Conf.js'
import { Dispatcher } from './core/Dispatcher.js'
'use strict'
const debut = performance.now()
new Dispatcher()
document.body.innerHTML += `<div style="position: fixed; bottom: 0; background-color: #900; color: #FFF; line-height: 30px; height: 30px; left: 0; right: 0; padding-left: 10px;">Page générée en ${Math.round(performance.now() - debut, 5)} secondes</div>`
