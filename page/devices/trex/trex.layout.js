import {px} from '@zos/utils';
import {BUTTONS as BUTTONS_COMMON, DEVICE_HEIGHT, DEVICE_WIDTH, PAGE_HEADERS as PAGE_HEADERS_COMMON} from '../../common/common.layout';

export const DEVICE_FAMILY = 'trex'
export const STANDARD_BUTTON_SIZE = px(88)

export const STANDARD_CONTAINER_STYLE = {
    x:             0,
    y:             0,
    w:             DEVICE_WIDTH,
    h:             DEVICE_HEIGHT,
    scroll_enable: 0
}
export const STANDARD_CONTAINER_WITH_BOTTOM_BUTTON_STYLE = {
    x:             0,
    y:             0,
    w:             DEVICE_WIDTH,
    h:             DEVICE_HEIGHT - STANDARD_BUTTON_SIZE,
    scroll_enable: 1
}

export function HEADER_STYLE(pageName) {
    let style = PAGE_HEADERS_COMMON.HEADER_STYLE(pageName)
    style.x = DEVICE_WIDTH / 5
    style.y = px(40)
    style.w = DEVICE_WIDTH * 3 / 5
    style.h = px(40)
    style.text_size = px(35)
    return style
}

export const BUTTONS = {
    setSpatialParamsForBottomButton(style) {
        style.y = DEVICE_HEIGHT - STANDARD_BUTTON_SIZE
        style.w = DEVICE_WIDTH
        style.h = STANDARD_BUTTON_SIZE
    },
    STANDARD_BOTTOM_BUTTON_STYLE(src, pressedSrc) {
        let style = BUTTONS_COMMON.STANDARD_BOTTOM_BUTTON_STYLE(src, pressedSrc)
        this.setSpatialParamsForBottomButton(style);
        return style
    },
    STANDARD_BOTTOM_BUTTON_STYLE_WITH_HANDLER(src, pressedSrc, handler) {
        let style = BUTTONS_COMMON.STANDARD_BOTTOM_BUTTON_STYLE_WITH_HANDLER(src, pressedSrc, handler)
        this.setSpatialParamsForBottomButton(style);
        return style
    }
}

export {DEVICE_HEIGHT, DEVICE_WIDTH}