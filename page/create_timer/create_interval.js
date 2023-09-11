import {replace} from '@zos/router'

import {CONSTANTS, getText} from '../common'
import CreateNewTimerPage from './create_timer_template'

CreateNewTimerPage({
    header:         getText(CONSTANTS.i18n.CREATE_INTERVAL_HEADER),
    pageKey:        'create.interval',
    confirmHandler: function (timer) {
        getApp()._options.globalData.timerModel.interval = timer
        replace({url: CONSTANTS.pages.TIMER_PROGRESS})
    }
})
