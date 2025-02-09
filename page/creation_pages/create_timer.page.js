import {replace} from '@zos/router'

import {renderPage, toSeconds} from './creation.page.layout';
import {saveInStorage} from '../../utils';
import {CONSTANTS} from '../common';

Page({
    onInit(params) {
    },
    build() {
        renderPage(
                CONSTANTS.pages.CREATE_TIMER.name,
                (hh, mm, ss) => {
                    saveInStorage(CONSTANTS.session.timer, toSeconds(hh, mm, ss))
                    replace({url: CONSTANTS.pages.SELECT_INTERVAL.getUrl()})
                }
        )
    },
    onDestroy() {
    }
})