import {getDeviceInfo} from '@zos/device'
import {align, text_style} from '@zos/ui'
import {getText} from '@zos/i18n';

export const {width: DEVICE_WIDTH, height: DEVICE_HEIGHT} = getDeviceInfo()

export const COLORS = {
    // see https://www.figma.com/design/bY5cr0QN41npTOTO642Did/Zepp-OS-3.0-Library-Circular-(Community)?node-id=31-3&node-type=canvas
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

// STYLES
export const PAGE_HEADERS = {
    HEADER_STYLE(pageName) {
        return {
            color:      COLORS.TEXT.TITLE,
            align_h:    align.CENTER_H,
            align_v:    align.CENTER_V,
            text_style: text_style.NONE,
            text:       getText(pageName)
        }
    }
}

export const BUTTONS = {
    STANDARD_BOTTOM_BUTTON_STYLE(src, pressedSrc) {
        return {
            x:          0,
            normal_src: src,
            press_src:  pressedSrc
        }
    },
    STANDARD_BOTTOM_BUTTON_STYLE_WITH_HANDLER(src, pressedSrc, handler) {
        return {
            x:          0,
            normal_src: src,
            press_src:  pressedSrc,
            click_func: (button) => {
                handler(button)
            }
        }
    }
}