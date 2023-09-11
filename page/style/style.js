import {getDeviceInfo} from '@zos/device'
import {align, text_style} from '@zos/ui'
import {CONSTANTS, zeroPad} from '../common'

// COMMON
const standard_button_size = 108
export const {width: DEVICE_WIDTH, height: DEVICE_HEIGHT} = getDeviceInfo()
export const COLORS = {
    SYS:       {
        BUTTON:                   0x515151,
        BUTTON_PRESSED:           0x313131,
        BUTTON_HIGHLIGHT:         0x0986D4,
        BUTTON_HIGHLIGHT_PRESSED: 0x234F7C,
        HIGHLIGHT:                0x0986D4,
        HIGHLIGHT_DISABLED:       0x10283F,
        PAGE_BACKGROUND:          0x000000
    },
    TEXT:      {
        BUTTON:   0xFFFFFF,
        LINK:     0x059AF7,
        TITLE:    0xFFFFFF,
        WARNING:  0xD14221,
        SUBTITLE: 0xB2B2B2
    },
    SECONDARY: {
        _01: 0x03B5AA,
        _02: 0x7B9E89,
        _03: 0x399E5A,
        _18: 0xAA2F2F,
        _20: 0x9B3642
    }
}
export const COMMON = {
    HEADER_STYLE(header) {
        return {
            x:          DEVICE_WIDTH / 5,
            y:          40,
            w:          DEVICE_WIDTH * 3 / 5,
            h:          40,
            color:      COLORS.TEXT.TITLE,
            text_size:  35,
            align_h:    align.CENTER_H,
            align_v:    align.CENTER_V,
            text_style: text_style.NONE,
            text:       header
        }
    },
    HEADER_STYLE_Y(header, y) {
        return {
            x:          DEVICE_WIDTH / 5,
            y:          y,
            w:          DEVICE_WIDTH * 3 / 5,
            h:          40,
            color:      COLORS.TEXT.TITLE,
            text_size:  35,
            align_h:    align.CENTER_H,
            align_v:    align.CENTER_V,
            text_style: text_style.NONE,
            text:       header
        }
    },
    STANDARD_BOTTOM_BUTTON_STYLE(src, pressedSrc) {
        return {
            x:          0,
            y:          DEVICE_HEIGHT - standard_button_size,
            w:          DEVICE_WIDTH,
            h:          standard_button_size,
            normal_src: src,
            press_src:  pressedSrc
        }
    },
    STANDARD_BOTTOM_BUTTON_STYLE_ACTION(src, pressedSrc, handler) {
        return {
            x:          0,
            y:          DEVICE_HEIGHT - standard_button_size,
            w:          DEVICE_WIDTH,
            h:          standard_button_size,
            normal_src: src,
            press_src:  pressedSrc,
            click_func: (button) => {
                handler(button)
            }
        }
    }
}

// SELECT TIMERS, INTERVALS
const cell_size = 200
const timer_size = 170
const cell_padding_x = 38
const cell_padding_y = 57
export const SELECT_PREDEFINED = {
    TIMER_BUTTON_STYLE(timer, row, column, handler) {
        return {
            x:          column * cell_size + cell_padding_x,
            y:          row * cell_size + cell_padding_y * 2,
            w:          timer_size,
            h:          timer_size,
            text:       timer.getDisplayName(),
            text_size:  30,
            normal_src: timer.img,
            press_src:  timer.img_pressed,
            click_func: (button) => {
                handler(button)
            }
        }
    },
    TIMERS_CONTAINER_STYLE: {
        x: 0,
        y: 0,
        w: DEVICE_WIDTH,
        h: DEVICE_HEIGHT - standard_button_size
    }
}

// TIMER PROGRESS
const timer_display_size = 70
const circle_button_size = 116
export const TIMER_PROGRESS = {
    TIMER_DISPLAY_STYLE(initialValue) {
        return {
            x:          0,
            y:          DEVICE_HEIGHT / 2 - timer_display_size / 2,
            w:          DEVICE_WIDTH,
            h:          timer_display_size,
            color:      COLORS.TEXT.TITLE,
            text_size:  60,
            align_h:    align.CENTER_H,
            align_v:    align.CENTER_V,
            text_style: text_style.NONE,
            text:       initialValue
        }
    },
    TIMER_PROGRESS_CIRCLE: {
        radius:              210,
        center_x:            217,
        center_y:            216,
        bars_step:           4,
        bar_width:           4,
        bar_height:          25,
        bar_color:           COLORS.SYS.HIGHLIGHT,
        bar_color_processed: COLORS.SYS.HIGHLIGHT_DISABLED
    },
    CANCEL_BUTTON(handler) {
        return {
            x:          DEVICE_WIDTH / 2 - circle_button_size - 10,
            y:          DEVICE_HEIGHT / 2 + 40,
            w:          circle_button_size,
            h:          circle_button_size,
            normal_src: CONSTANTS.img.CANCEL,
            press_src:  CONSTANTS.img.CANCEL_PRESSED,
            click_func: (button) => {
                handler(button)
            }
        }
    },
    PAUSE_RESUME_BUTTON(src, pressSrc, handler) {
        return {
            x:          DEVICE_WIDTH / 2 + 10,
            y:          DEVICE_HEIGHT / 2 + 40,
            w:          circle_button_size,
            h:          circle_button_size,
            normal_src: src,
            press_src:  pressSrc,
            click_func: (button) => {
                handler(button)
            }
        }
    }
}

// CREATE NEW TIMER
const create_timer_text_size = 95
const reel_padding_y = 80
const reel_padding_x = 60
const reel_w = 111
const reel_h = 265
const gradient_h = 64
export const CREATE_TIMER = {
    REEL_STILE(dataList, position, handler) {
        return {
            x:             reel_padding_x + position * reel_w,
            y:             reel_padding_y,
            w:             reel_w,
            h:             reel_h,
            data_array:    dataList,
            data_size:     dataList.length,
            item_height:   90,
            item_bg_color: COLORS.SYS.PAGE_BACKGROUND,

            item_text_align_v:      align.CENTER_V,
            item_text_color:        COLORS.SYS.HIGHLIGHT,
            item_text_size:         create_timer_text_size,
            item_click_func:        (list, index) => {
                handler(dataList, index)
            },
            item_focus_change_func: (list, index, isFocus) => {
                if (isFocus) {
                    handler(dataList, index)
                }
            }
        }
    },
    GRADIENT_UP(position) {
        return {
            x:   reel_padding_x + position * reel_w,
            y:   reel_padding_y,
            w:   reel_w,
            src: CONSTANTS.img.GRADIENT_BG_UP
        }
    },
    GRADIENT_BOTTOM(position) {
        return {
            x:   reel_padding_x + position * reel_w,
            y:   reel_padding_y + reel_h - gradient_h,
            w:   reel_w,
            src: CONSTANTS.img.GRADIENT_BG_BOTTOM
        }
    },
    DISPLAY_TEXT(value, position) {
        return {
            x:         reel_padding_x + position * reel_w,
            y:         reel_padding_y,
            w:         reel_w,
            h:         reel_h,
            color:     COLORS.TEXT.TITLE,
            text_size: create_timer_text_size,
            align_h:   align.CENTER_H,
            align_v:   align.CENTER_V,
            text:      zeroPad(value)
        }
    },
    DISPLAY_TEXT_SUB(text, position) {
        return {
            x:         reel_padding_x + position * reel_w,
            y:         reel_padding_y + create_timer_text_size * 1.9,
            w:         reel_w,
            h:         50,
            color:     COLORS.TEXT.SUBTITLE,
            text_size: 30,
            align_h:   align.CENTER_H,
            align_v:   align.CENTER_V,
            text:      text
        }
    }
}