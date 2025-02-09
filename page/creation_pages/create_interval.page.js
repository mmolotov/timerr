import {setStatusBarVisible} from '@zos/ui'
import {replace} from '@zos/router'

import {renderPage, toSeconds} from './creation.page.layout';
import {saveInStorage} from '../../utils';
import {CONSTANTS} from '../common';

Page({
    onInit(params) {
        setStatusBarVisible(false)
    },
    build() {
        renderPage(
                CONSTANTS.pages.CREATE_INTERVAL.name,
                (hh, mm, ss) => {
                    saveInStorage(CONSTANTS.session.interval, toSeconds(hh, mm, ss))
                    replace({url: CONSTANTS.pages.TIMER_PROGRESS.getUrl()})
                }
        )
    },
    onDestroy() {
    }
})