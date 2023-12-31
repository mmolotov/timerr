import {prop} from '@zos/ui'
import {replace} from '@zos/router'

import {CONSTANTS, getText, Timer, Units} from '../common'
import SelectPredefinedTimerPage from './select_predefined_template'

const standardTimers = [
    new Timer(0, Units.SEC, 0, {displayName: '-'}),
    new Timer(5, Units.SEC, 5),
    new Timer(10, Units.SEC, 10),
    new Timer(30, Units.SEC, 30),
    new Timer(1, Units.MIN, 1 * CONSTANTS.seconds.min),
    new Timer(2, Units.MIN, 2 * CONSTANTS.seconds.min),
    new Timer(3, Units.MIN, 3 * CONSTANTS.seconds.min),
    new Timer(5, Units.MIN, 5 * CONSTANTS.seconds.min),
    new Timer(10, Units.MIN, 10 * CONSTANTS.seconds.min),
    new Timer(15, Units.MIN, 15 * CONSTANTS.seconds.min),
    new Timer(20, Units.MIN, 20 * CONSTANTS.seconds.min)
]

SelectPredefinedTimerPage({
    header:           getText(CONSTANTS.i18n.SELECT_INTERVAL_HEADER),
    timersList:       standardTimers,
    timerHandler:     function (button) {
        getApp()._options.globalData.timerModel.interval = button.getProperty(prop.DATASET).timer
        replace({url: CONSTANTS.pages.TIMER_PROGRESS})
    },
    addButtonHandler: function () {
        replace({url: CONSTANTS.pages.CREATE_INTERVAL})
    }
})