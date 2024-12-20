import {px} from '@zos/utils';
import {align, text_style} from '@zos/ui'
import {
    BUTTONS,
    DEVICE_FAMILY,
    DEVICE_HEIGHT,
    DEVICE_WIDTH,
    HEADER_STYLE as COMMON_HEADER_STYLE,
    STANDARD_CONTAINER_STYLE
} from '../trex.layout'
import {COLORS} from '../../../common/common.layout';
import {CONSTANTS} from '../../../constants/constants';

export function HEADER_STYLE(pageName) {
    let style = COMMON_HEADER_STYLE(pageName)
    style.y = px(style.y + 50)
    return style
}

const timer_display_size = 70
const circle_button_size = 116

export function REMAINING_TIME_STYLE_FUNCTION(initialValue) {
    return {
        x:          0,
        y:          px(DEVICE_HEIGHT / 2 - timer_display_size / 2),
        w:          DEVICE_WIDTH,
        h:          timer_display_size,
        color:      COLORS.TEXT.TITLE,
        text_size:  px(60),
        align_h:    align.CENTER_H,
        align_v:    align.CENTER_V,
        text_style: text_style.NONE,
        text:       initialValue
    }
}

export function CANCEL_BUTTON_FUNCTION(handler) {
    return {
        x:          px(DEVICE_WIDTH / 2 - circle_button_size - 10),
        y:          px(DEVICE_HEIGHT / 2 + 40),
        w:          circle_button_size,
        h:          circle_button_size,
        normal_src: CONSTANTS.images.CANCEL,
        press_src:  CONSTANTS.images.CANCEL_PRESSED,
        click_func: (button) => {
            handler(button)
        }
    }
}

export function PAUSE_BUTTON_FUNCTION(handler) {
    return {
        x:          px(DEVICE_WIDTH / 2 + 10),
        y:          px(DEVICE_HEIGHT / 2 + 40),
        w:          circle_button_size,
        h:          circle_button_size,
        normal_src: CONSTANTS.images.PAUSE,
        press_src:  CONSTANTS.images.PAUSE_PRESSED,
        click_func: (button) => {
            handler(button)
        }
    }
}

export function RESUME_BUTTON_FUNCTION(handler) {
    let style = PAUSE_BUTTON_FUNCTION(handler)
    style.normal_src = CONSTANTS.images.RESUME
    style.press_src = CONSTANTS.images.PAUSE_PRESSED
    return style
}

export function STOP_BUTTON_FUNCTION(handler) {
    return BUTTONS.STANDARD_BOTTOM_BUTTON_STYLE_WITH_HANDLER(CONSTANTS.images.STOP, CONSTANTS.images.STOP_PRESSED, handler)
}

const tickWidth = 4
const tickHeight = 25
export const TIMER_PROGRESS_CIRCLE = {
    CANVAS_LAYOUT_STYLE: {
        x: 0,
        y: 0,
        w: px(DEVICE_WIDTH),
        h: px(DEVICE_HEIGHT)
    },
    TICKS:               {
        W:               px(tickWidth),
        H:               px(tickHeight),
        TOTAL:           120,
        COLOR_ACTIVE:    COLORS.SYS.HIGHLIGHT,
        COLOR_IN_ACTIVE: COLORS.SYS.HIGHLIGHT_DISABLED
    },
    CIRCLE:              {
        RADIUS:              (DEVICE_WIDTH - tickWidth) / 2,
        TICK_ANGLE_FUNCTION: (i) => (-i * 3 + 90) * Math.PI / 180
    }
}
export {BUTTONS, DEVICE_FAMILY, STANDARD_CONTAINER_STYLE, DEVICE_HEIGHT, DEVICE_WIDTH}
