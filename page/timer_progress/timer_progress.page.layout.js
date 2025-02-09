import {px} from '@zos/utils';
import {align, prop, text_style} from '@zos/ui'

import {COLORS, COMMON_LAYOUT, DEVICE_HEIGHT, DEVICE_WIDTH, headerY} from '../common.layout';
import {CONSTANTS} from '../common';
import {vibroCallback} from '../../utils';

const tickWidth = px(4)
const tickHeight = px(25)
const tickHalfWidth = tickWidth / 2;
const ticksTotal = 120

const circleRadius = (Math.min(DEVICE_HEIGHT, DEVICE_WIDTH) - tickWidth) / 2
const circeCenterX = DEVICE_WIDTH / 2
const circeCenterY = DEVICE_HEIGHT / 2

export const timerDisplaySize = px(80)
export const circleButtonSize = px(116)
const circleButtonPaddingX = DEVICE_WIDTH * 0.05

const CONTROLS = {
    CANVAS_LAYOUT: {
        x: 0,
        y: 0,
        w: DEVICE_WIDTH,
        h: DEVICE_HEIGHT
    },
    TICKS:         {
        COLOR_ACTIVE:    COLORS.SYS.HIGHLIGHT,
        COLOR_IN_ACTIVE: COLORS.SYS.HIGHLIGHT_DISABLED
    },
    headerY:       DEVICE_HEIGHT - circleRadius * 2 + tickHeight + headerY,
    calculateAngleForTick(i) {
        return (-i * 3 + 90) * Math.PI / 180
    },
    remainingTimeLabel(value = '') {
        return {
            x:          0,
            y:          circeCenterY - timerDisplaySize / 2,
            w:          DEVICE_WIDTH,
            h:          timerDisplaySize,
            color:      COLORS.TEXT.TITLE,
            text_size:  px(60),
            align_h:    align.CENTER_H,
            align_v:    align.CENTER_V,
            text_style: text_style.NONE,
            text:       value
        }
    },
    circleButton(normalSrc = '', pressSrc = '', clickCallback, left = true) {
        return {
            x:          left ? DEVICE_WIDTH / 2 - circleButtonSize - circleButtonPaddingX : DEVICE_WIDTH / 2 + circleButtonPaddingX,
            y:          circeCenterY + circleButtonSize / 2,
            w:          circleButtonSize,
            h:          circleButtonSize,
            normal_src: normalSrc,
            press_src:  pressSrc,
            click_func: vibroCallback(clickCallback)
        }
    },
    cancelButton(clickCallback) {
        return CONTROLS.circleButton(CONSTANTS.images.CANCEL, CONSTANTS.images.CANCEL_PRESSED, clickCallback, true)
    },
    pauseButton(clickCallback) {
        return CONTROLS.circleButton(CONSTANTS.images.PAUSE, CONSTANTS.images.PAUSE_PRESSED, clickCallback, false)
    },
    resumeButton(clickCallback) {
        return CONTROLS.circleButton(CONSTANTS.images.RESUME, CONSTANTS.images.RESUME_PRESSED, clickCallback, false)
    },
    stopButton(clickCallback) {
        return COMMON_LAYOUT.BUTTONS.bottomButton(CONSTANTS.images.STOP, CONSTANTS.images.STOP_PRESSED, clickCallback)
    },
    createTimerProgress(canvas, progress) {
        canvas.setPaint({
            line_width: tickWidth
        })
        let pastTicks = Math.min(ticksTotal, Math.max(0, ticksTotal / 100 * progress))
        for (let i = 0; i < ticksTotal; i++) {
            const angle = CONTROLS.calculateAngleForTick(i);
            let startX = circeCenterX + (circleRadius - tickHalfWidth) * Math.cos(angle);
            let startY = circeCenterY + (circleRadius - tickHalfWidth) * Math.sin(angle);
            let endX = circeCenterX + (circleRadius - tickHeight) * Math.cos(angle);
            let endY = circeCenterY + (circleRadius - tickHeight) * Math.sin(angle);
            canvas.drawLine({
                x1:    startX,
                y1:    startY,
                x2:    endX,
                y2:    endY,
                color: i < pastTicks ? COLORS.SYS.HIGHLIGHT_DISABLED : COLORS.SYS.HIGHLIGHT
            })
        }
    },
    switchTimerDisplayColor(timerLabel, isWarning = false) {
        timerLabel.setProperty(prop.MORE, {
            color: isWarning ? COLORS.TEXT.WARNING : COLORS.TEXT.TITLE
        })
    },
    setTimerDisplayText(timerLabel, text = '', isWarning = false) {
        timerLabel.setProperty(prop.MORE, {
            text: text
        })
        CONTROLS.switchTimerDisplayColor(timerLabel, isWarning)
    }
}
export {CONTROLS}