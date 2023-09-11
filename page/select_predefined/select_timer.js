import {prop} from '@zos/ui'
import {push} from '@zos/router'

import {CONSTANTS, getText, Timer, Units} from '../common'
import SelectPredefinedTimerPage from './select_predefined_template'

const standardTimers = [
    new Timer(30, Units.SEC, 30),
    new Timer(1, Units.MIN, 1 * CONSTANTS.seconds.min),
    new Timer(2, Units.MIN, 2 * CONSTANTS.seconds.min),
    new Timer(3, Units.MIN, 3 * CONSTANTS.seconds.min),
    new Timer(5, Units.MIN, 5 * CONSTANTS.seconds.min),
    new Timer(10, Units.MIN, 10 * CONSTANTS.seconds.min),
    new Timer(15, Units.MIN, 15 * CONSTANTS.seconds.min),
    new Timer(20, Units.MIN, 20 * CONSTANTS.seconds.min),
    new Timer(30, Units.MIN, 30 * CONSTANTS.seconds.min),
    new Timer(1, Units.HOUR, 1 * CONSTANTS.seconds.hour)
]

SelectPredefinedTimerPage({
    header:           getText(CONSTANTS.i18n.SELECT_TIMER_HEADER),
    timersList:       standardTimers,
    timerHandler:     function (button) {
        getApp()._options.globalData.timerModel.timer = button.getProperty(prop.DATASET).timer
        push({url: CONSTANTS.pages.SELECT_INTERVAL})
    },
    addButtonHandler: function () {
        push({url: CONSTANTS.pages.CREATE_TIMER})
    }
})

