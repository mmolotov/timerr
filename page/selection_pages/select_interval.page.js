import {prop, setStatusBarVisible} from '@zos/ui';
import {replace} from '@zos/router'

import {renderPage} from './selection.page.layout';
import {saveInStorage} from '../../utils';
import {CONSTANTS, TimeSpan, ZeroSpan} from '../common';

const predefinedSpans = [
    new ZeroSpan(CONSTANTS.timeUnits.SEC),
    new TimeSpan(5, CONSTANTS.timeUnits.SEC),
    new TimeSpan(10, CONSTANTS.timeUnits.SEC),
    new TimeSpan(30, CONSTANTS.timeUnits.SEC),
    new TimeSpan(1, CONSTANTS.timeUnits.MIN),
    new TimeSpan(2, CONSTANTS.timeUnits.MIN),
    new TimeSpan(3, CONSTANTS.timeUnits.MIN),
    new TimeSpan(5, CONSTANTS.timeUnits.MIN),
    new TimeSpan(10, CONSTANTS.timeUnits.MIN),
    new TimeSpan(15, CONSTANTS.timeUnits.MIN),
    new TimeSpan(20, CONSTANTS.timeUnits.MIN)
]

Page({
    onInit(params) {
        setStatusBarVisible(false)
    },
    build() {
        renderPage(
                CONSTANTS.pages.SELECT_INTERVAL.name,
                predefinedSpans,
                () => {
                    replace({url: CONSTANTS.pages.CREATE_INTERVAL.getUrl()})
                },
                (button) => {
                    saveInStorage(CONSTANTS.session.interval, button.getProperty(prop.DATASET))
                    replace({url: CONSTANTS.pages.TIMER_PROGRESS.getUrl()})
                }
        )
    },
    onDestroy() {
    }
})