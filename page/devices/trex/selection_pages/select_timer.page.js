import {push} from '@zos/router'

import {TimeSpan} from '../../../data/models'
import {CONSTANTS} from '../../../constants/constants'
import SelectionPage from '../../../common/selection_pages/select_timer.page.template';
import * as layout from './selection.page.layout';
import {log as Logger} from '@zos/utils';

const logger = Logger.getLogger('timerr');

const predefinedSpans = [
    new TimeSpan(30, CONSTANTS.timeUnits.SEC, CONSTANTS.images.CLOCK_BUTTON, CONSTANTS.images.CLOCK_BUTTON_PRESSED),
    new TimeSpan(1, CONSTANTS.timeUnits.MIN, CONSTANTS.images.CLOCK_BUTTON, CONSTANTS.images.CLOCK_BUTTON_PRESSED),
    new TimeSpan(2, CONSTANTS.timeUnits.MIN, CONSTANTS.images.CLOCK_BUTTON, CONSTANTS.images.CLOCK_BUTTON_PRESSED),
    new TimeSpan(3, CONSTANTS.timeUnits.MIN, CONSTANTS.images.CLOCK_BUTTON, CONSTANTS.images.CLOCK_BUTTON_PRESSED),
    new TimeSpan(5, CONSTANTS.timeUnits.MIN, CONSTANTS.images.CLOCK_BUTTON, CONSTANTS.images.CLOCK_BUTTON_PRESSED),
    new TimeSpan(10, CONSTANTS.timeUnits.MIN, CONSTANTS.images.CLOCK_BUTTON, CONSTANTS.images.CLOCK_BUTTON_PRESSED),
    new TimeSpan(15, CONSTANTS.timeUnits.MIN, CONSTANTS.images.CLOCK_BUTTON, CONSTANTS.images.CLOCK_BUTTON_PRESSED),
    new TimeSpan(20, CONSTANTS.timeUnits.MIN, CONSTANTS.images.CLOCK_BUTTON, CONSTANTS.images.CLOCK_BUTTON_PRESSED),
    new TimeSpan(30, CONSTANTS.timeUnits.MIN, CONSTANTS.images.CLOCK_BUTTON, CONSTANTS.images.CLOCK_BUTTON_PRESSED),
    new TimeSpan(1, CONSTANTS.timeUnits.HOUR, CONSTANTS.images.CLOCK_BUTTON, CONSTANTS.images.CLOCK_BUTTON_PRESSED)
]

SelectionPage({
    //data
    storageKey: CONSTANTS.session.timer,
    columnsNumber:   layout.PREDEFINED_SPAN_COLUMNS_NUMBER,
    predefinedSpans: predefinedSpans,
    creationPageUrl: CONSTANTS.pages.CREATE_TIMER.getUrl(layout.DEVICE_FAMILY),
    nextPageUrl:     CONSTANTS.pages.SELECT_INTERVAL.getUrl(layout.DEVICE_FAMILY),

    //style
    headerStyle:              layout.HEADER_STYLE(CONSTANTS.pages.SELECT_TIMER.name),
    containerStyle:           layout.STANDARD_CONTAINER_WITH_BOTTOM_BUTTON_STYLE,
    addButtonStyle:           layout.BUTTONS.STANDARD_BOTTOM_BUTTON_STYLE(CONSTANTS.images.PLUS, CONSTANTS.images.PLUS_PRESSED),
    timerButtonStyleFunction: layout.TIME_SPAN_BUTTON_STYLE_FUNCTION,

    //handlers
    creationPageRoutingFunction: push,
    nextPageRoutingFunction:     push,
    selectTimerHandler: function (button) {
        push({url: CONSTANTS.pages.SELECT_INTERVAL.getUrl(layout.DEVICE_FAMILY)})
    },
    addButtonHandler:   function () {
        push({url: CONSTANTS.pages.CREATE_TIMER.getUrl(layout.DEVICE_FAMILY)})
    }
})
