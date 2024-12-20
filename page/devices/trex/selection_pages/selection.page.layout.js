import {px} from '@zos/utils';
import {BUTTONS, DEVICE_FAMILY, HEADER_STYLE, STANDARD_CONTAINER_WITH_BOTTOM_BUTTON_STYLE} from '../trex.layout'

const PREDEFINED_SPAN_COLUMNS_NUMBER = 2

// SELECT TIMERS, INTERVALS
const cell_size = px(200)
const timer_size = px(170)
const cell_padding_x = px(38)
const cell_padding_y = px(57)
export function TIME_SPAN_BUTTON_STYLE_FUNCTION(timer, row, column, handler) {
    return {
        x:          column * cell_size + cell_padding_x,
        y:          row * cell_size + cell_padding_y * 2,
        w:          timer_size,
        h:          timer_size,
        text:       timer.getDisplayName(),
        text_size:  px(30),
        normal_src: timer.img,
        press_src:  timer.imgPressed,
        click_func: (button) => {
            handler(button)
        }
    }
}

export {BUTTONS, HEADER_STYLE, PREDEFINED_SPAN_COLUMNS_NUMBER, DEVICE_FAMILY, STANDARD_CONTAINER_WITH_BOTTOM_BUTTON_STYLE}
