import {prop} from '@zos/ui';
import {push} from '@zos/router'

import {renderPage} from './selection.page.layout';
import {saveInStorage} from '../../utils';
import {CONSTANTS, TimeSpan} from '../common';

const predefinedSpans = [
    new TimeSpan(30, CONSTANTS.timeUnits.SEC),
    new TimeSpan(1, CONSTANTS.timeUnits.MIN),
    new TimeSpan(2, CONSTANTS.timeUnits.MIN),
    new TimeSpan(3, CONSTANTS.timeUnits.MIN),
    new TimeSpan(5, CONSTANTS.timeUnits.MIN),
    new TimeSpan(10, CONSTANTS.timeUnits.MIN),
    new TimeSpan(15, CONSTANTS.timeUnits.MIN),
    new TimeSpan(20, CONSTANTS.timeUnits.MIN),
    new TimeSpan(30, CONSTANTS.timeUnits.MIN),
    new TimeSpan(1, CONSTANTS.timeUnits.HOUR)
]

Page({
    onInit(params) {
    },
    build() {
        renderPage(
                CONSTANTS.pages.SELECT_TIMER.name,
                predefinedSpans,
                () => {
                    push({url: CONSTANTS.pages.CREATE_TIMER.getUrl()})
                },
                (button) => {
                    saveInStorage(CONSTANTS.session.timer, button.getProperty(prop.DATASET))
                    push({url: CONSTANTS.pages.SELECT_INTERVAL.getUrl()})
                }
        )
    },
    onDestroy() {
    }
})