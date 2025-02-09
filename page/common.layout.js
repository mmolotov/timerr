import {getDeviceInfo} from '@zos/device'
import {align, text_style} from '@zos/ui'
import {getText} from '@zos/i18n';
import {px} from '@zos/utils';
import {vibroCallback} from '../utils';

export const {width: DEVICE_WIDTH, height: DEVICE_HEIGHT} = getDeviceInfo()

export const STANDARD_BUTTON_SIZE = px(88)

export const COLORS = {
    // see https://www.figma.com/design/bY5cr0QN41npTOTO642Did/Zepp-OS-3.0-Library-Circular-(Community)?node-id=31-3&node-type=canvas
    SYS:       {
        BUTTON:                   0x515151,
        BUTTON_PRESSED:           0x313131,
        BUTTON_HIGHLIGHT:         0x0986D4,
        BUTTON_HIGHLIGHT_PRESSED: 0x234F7C,
        HIGHLIGHT:                0x0986D4,
        HIGHLIGHT_DISABLED:       0x10283F,
        PAGE_BACKGROUND:          0x000000,
        SCROLL_BAR:               0xA0A0A0
    },
    TEXT:      {
        BUTTON:   0xFFFFFF,
        LINK:     0x059AF7,
        TITLE:    0xFFFFFF,
        WARNING:  0xD14221,
        SUBTITLE: 0xB2B2B2
    },
    AUXILIARY: {
        AUX_01: 0x03B5AA,
        AUX_02: 0x7B9E89,
        AUX_03: 0x399E5A,
        AUX_04: 0xF7B538,
        AUX_05: 0xE9C46A,
        AUX_06: 0xE09200,
        AUX_07: 0xF2559D,
        AUX_08: 0x7B29CC,
        AUX_09: 0x984CE5,
        AUX_10: 0xFB4B4E,
        AUX_11: 0xF20000,
        AUX_12: 0xDB5461,
        AUX_13: 0xFB4B4E,
        AUX_14: 0xDBDBDB,
        AUX_15: 0xCACFD6,
        AUX_16: 0xCF9D4F,
        AUX_17: 0xDE6D30,
        AUX_18: 0xAA2F2F,
        AUX_19: 0x8B4060,
        AUX_20: 0x9B3642,
        AUX_21: 0x3CA4CE,
        AUX_22: 0xDB6363,

        PAI_1: 0xDCBE4B,
        PAI_2: 0x6FCDF2,
        PAI_3: 0x37CCBD,

        HR_RELAX:     0x969DB8,
        HR_MAXIMUM:   0xC42742,
        HR_ANAEROBIC: 0xCE581A,
        HR_AEROBIC:   0xDFA032,
        HR_BURNING:   0x2EC06E,
        HR_WARM_UP:   0x229EBE
    }
}

// STYLES
export const COMMON_LAYOUT = {
    CONTAINERS: {
        fullScreenContainer(scrollEnabled = false, zIndex = 0) {
            return {
                x:             0,
                y:             0,
                w:             DEVICE_WIDTH,
                h:             DEVICE_HEIGHT,
                scroll_enable: scrollEnabled ? 1 : 0,
                z_index:       zIndex
            }
        },
        fullScreenWithBottomButtonContainer(scrollEnabled = false, zIndex = 0) {
            const props = COMMON_LAYOUT.CONTAINERS.fullScreenContainer(scrollEnabled, zIndex)
            props.h = DEVICE_HEIGHT - STANDARD_BUTTON_SIZE
            return props
        }
    },
    HEADERS:    {
        header(pageName = '', yShift = 0) {
            return {
                color:      COLORS.TEXT.TITLE,
                align_h:    align.CENTER_H,
                align_v:    align.CENTER_V,
                text_style: text_style.NONE,
                text:       getText(pageName),
                x:          DEVICE_WIDTH / 5,
                y:          px(40 + yShift),
                w:          DEVICE_WIDTH * 3 / 5,
                h:          px(40),
                text_size:  px(35)
            }
        }
    },
    BUTTONS:    {
        bottomButton(src = '', pressedSrc = '', clickCallback, wrapWithVibro = true) {
            return {
                x:          0,
                y:          DEVICE_HEIGHT - STANDARD_BUTTON_SIZE,
                w:          DEVICE_WIDTH,
                h:          STANDARD_BUTTON_SIZE,
                alpha:      0,
                normal_src: src,
                press_src:  pressedSrc,
                click_func: wrapWithVibro ? vibroCallback(clickCallback) : clickCallback
            }
        }
    }
}