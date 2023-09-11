import {push} from '@zos/router'

import {CONSTANTS, getText} from '../common'
import CreateNewTimerPage from './create_timer_template'

CreateNewTimerPage({
    header:         getText(CONSTANTS.i18n.CREATE_TIMER_HEADER),
    pageKey:        'create.timer',
    confirmHandler: function (timer) {
        getApp()._options.globalData.timerModel.timer = timer
        push({url: CONSTANTS.pages.SELECT_INTERVAL})
    }
})
