import {replace} from '@zos/router'

import {CONSTANTS, getText} from '../common'
import CreateNewTimerPage from './create_timer_template'

CreateNewTimerPage({
    header:         getText(CONSTANTS.i18n.CREATE_TIMER_HEADER),
    pageKey:        'create.timer',
    confirmHandler: function (timer) {
        getApp()._options.globalData.timerModel.timer = timer
        replace({url: CONSTANTS.pages.SELECT_INTERVAL})
    }
})
