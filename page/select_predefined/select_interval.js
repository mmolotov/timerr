import { prop } from '@zos/ui'
import { replace } from '@zos/router'

import { Timer, Units, CONSTANTS, getText } from '../common'
import SelectPredefinedTimerPage from './select_predefined_template'

const standartTimers = [
    new Timer(0, Units.SEC, 0, { dysplayName: '-' }),
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
    header: getText(CONSTANTS.i18n.SELECT_INTERVAL_HEADER),
    timersList: standartTimers, // todo: filter intervals to be less then timer?
    addButtonLink: CONSTANTS.pages.CREATE_INTERVAL,
    timerHandler: function (button) {
        getApp()._options.globalData.timerModel.interval = button.getProperty(prop.DATASET).timer
        replace({ url: CONSTANTS.pages.TIMER_PROGRESS })
    }
})