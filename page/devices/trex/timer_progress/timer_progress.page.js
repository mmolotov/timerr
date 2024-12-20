import TimerProgressPage from '../../../common/timer_progress/timer_progress.page.template'
import * as layout from './timer_progress.page.layout';
import {log as Logger} from '@zos/utils';
import {CONSTANTS} from '../../../constants/constants';
import {COLORS} from '../../../common/common.layout';

const logger = Logger.getLogger('timerr');

TimerProgressPage({
    //data

    //style
    headerStyle:                  layout.HEADER_STYLE(CONSTANTS.pages.TIMER_PROGRESS.name),
    remainingTimeStyleFunction:   layout.REMAINING_TIME_STYLE_FUNCTION,
    cancelButtonStyleFunction:    layout.CANCEL_BUTTON_FUNCTION,
    pauseButtonStyleFunction:     layout.PAUSE_BUTTON_FUNCTION,
    resumeButtonStyleFunction:    layout.RESUME_BUTTON_FUNCTION,
    stopButtonStyleFunction:      layout.STOP_BUTTON_FUNCTION,
    canvasLayoutStyle:            layout.TIMER_PROGRESS_CIRCLE.CANVAS_LAYOUT_STYLE,
    timerDisplayTextAccentColors: [COLORS.TEXT.TITLE, COLORS.TEXT.WARNING],

    //handlers
    createTimerProgressBarFunction: createTimerProgressCircle
})

function createTimerProgressCircle(canvas, progress) {
    const tickWidth = layout.TIMER_PROGRESS_CIRCLE.TICKS.W
    const tickLength = layout.TIMER_PROGRESS_CIRCLE.TICKS.H
    const tickHalfWidth = tickWidth / 2;
    canvas.setPaint({
        line_width: tickWidth
    })
    const numTicks = layout.TIMER_PROGRESS_CIRCLE.TICKS.TOTAL
    const radius = layout.TIMER_PROGRESS_CIRCLE.CIRCLE.RADIUS;
    const centerX = radius + tickHalfWidth;
    const centerY = radius + tickHalfWidth;
    let pastTicks = Math.min(120, Math.max(0, numTicks / 100 * progress))
    for (let i = 0; i < numTicks; i++) {
        const angle = layout.TIMER_PROGRESS_CIRCLE.CIRCLE.TICK_ANGLE_FUNCTION(i);

        let startX = centerX + (radius - tickHalfWidth) * Math.cos(angle);
        let startY = centerY + (radius - tickHalfWidth) * Math.sin(angle);
        let endX = centerX + (radius - tickLength) * Math.cos(angle);
        let endY = centerY + (radius - tickLength) * Math.sin(angle);
        canvas.drawLine({
            x1:    startX,
            y1:    startY,
            x2:    endX,
            y2:    endY,
            color: i < pastTicks ? COLORS.SYS.HIGHLIGHT_DISABLED : COLORS.SYS.HIGHLIGHT
        })
    }
}