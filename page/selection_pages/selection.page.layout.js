import {createWidget, prop, widget} from '@zos/ui';
import {px} from '@zos/utils';

import {COMMON_LAYOUT} from '../common.layout';
import {CONSTANTS, TimeSpan} from '../common';
import {vibroCallback} from '../../utils';

// SELECT TIMERS, INTERVALS
const cell_size = px(200)
const timer_size = px(170)
const cell_padding_x = px(50)
const cell_padding_y = px(57)
const columnsNumber = 2

const CONTROLS = {
    timeSpanButton(timeSpan, row = 0, column = 0, clickCallback) {
        return {
            x:          column * cell_size + cell_padding_x,
            y:          row * cell_size + cell_padding_y * 2,
            w:          timer_size,
            h:          timer_size,
            text:       timeSpan.getDisplayName(),
            text_size:  px(30),
            normal_src: timeSpan.img,
            press_src:  timeSpan.imgPressed,
            click_func: vibroCallback(clickCallback)
        }
    }
}

function renderPage(pageName = '', spans = [TimeSpan], createCallback, selectCallback) {
    const backgroundScrollableContainer = createWidget(
            widget.VIEW_CONTAINER,
            COMMON_LAYOUT.CONTAINERS.fullScreenWithBottomButtonContainer(true, 0)
    )
    createWidget(widget.PAGE_SCROLLBAR, {target: backgroundScrollableContainer})
    const controlsStaticContainer = createWidget(widget.VIEW_CONTAINER, COMMON_LAYOUT.CONTAINERS.fullScreenContainer(false, 1))
    const header = backgroundScrollableContainer.createWidget(widget.TEXT, COMMON_LAYOUT.HEADERS.header(pageName))
    const createButton = controlsStaticContainer.createWidget(
            widget.BUTTON,
            COMMON_LAYOUT.BUTTONS.bottomButton(CONSTANTS.images.PLUS, CONSTANTS.images.PLUS_PRESSED, createCallback)
    )

    for (let i = 0, row = 0, column = 0; i < spans.length; i++) {
        if (column === columnsNumber) {
            column = 0
            row++
        }
        let timeSpan = spans[i]
        let timerButton = backgroundScrollableContainer.createWidget(widget.BUTTON,
                CONTROLS.timeSpanButton(timeSpan, row, column++, selectCallback))
        timerButton.setProperty(prop.DATASET, timeSpan.valueSeconds)
    }
}

export {CONTROLS, renderPage}