import {back} from '@zos/router'
import {createWidget, deleteWidget, prop, widget} from '@zos/ui'
import {Time, Vibrator, VIBRATOR_SCENE_TIMER} from '@zos/sensor'
import {pausePalmScreenOff, resetPalmScreenOff} from '@zos/display'

import {CONSTANTS, getText, zeroPad} from '../common'
import {COLORS, COMMON, TIMER_PROGRESS} from '../style/style'

const INTERVAL_MS = 200

Page({
    onInit() {
    },
    build() {
        this.vibro = new Vibrator()
        this.time = new Time()
        this.processes = {
            intervals: [],
            timeouts:  []
        }
        pausePalmScreenOff({
            duration: 0
        })
        this.buildUI()
    },

    onDestroy() {
        this.stopProcesses()
        this.vibro && this.vibro.stop()
        resetPalmScreenOff()
    },

    buildUI() {
        const header = createWidget(widget.TEXT, COMMON.HEADER_STYLE_Y(getText(CONSTANTS.i18n.TIMER_PROGRESS_HEADER), 70))
        this.timer = getApp()._options.globalData.timerModel.timer
        this.interval = getApp()._options.globalData.timerModel.interval
        this.timerDisplay = createWidget(widget.TEXT, TIMER_PROGRESS.TIMER_DISPLAY_STYLE(getTimerDisplayValue(this.timer.valueSeconds)))
        this.cancelButton = this.createCancelButton()
        this.pauseButton = this.createPauseButton()
        this.bars = createTimerProgressCircle()

        this.start = this.time.getTime()
        this.end = this.start + CONSTANTS.seconds.mili + this.timer.valueSeconds * CONSTANTS.seconds.mili
        this.startTimerProcess()
    },

    stopProcesses() {
        this.processes.intervals.forEach(i => clearInterval(i))
        this.processes.timeouts.forEach(t => clearTimeout(t))
    },

    startTimerProcess() {
        const process = setInterval(() => {
            const remainingSeconds = this.getRemainingSeconds()
            this.setDisplayValue(remainingSeconds)
            this.colorBars(remainingSeconds)
            if (remainingSeconds === 0) {
                this.stopProcesses()
                this.startBlinkInterval()
                this.createStopButton()
                this.deleteAdditionalButtons()
                this.doVibro()
            } else {
                this.notifyOnInterval(remainingSeconds)
            }
        }, INTERVAL_MS)
        this.processes.intervals.push(process)
    },

    startBlinkInterval() {
        let switcher = true
        let interval = setInterval(() => {
            this.switchTimerDisplayColor(switcher)
            switcher = !switcher
        }, 200);
        this.processes.intervals.push(interval)
        return interval
    },

    notifyOnInterval() {
        if (this.interval.valueSeconds > 0) {
            if (this.lastReminder) {
                const now = this.time.getTime()
                if (now - this.lastReminder >= this.interval.valueSeconds * CONSTANTS.seconds.mili) {
                    this.doVibro()
                    this.switchTimerDisplayColor(true)
                    this.lastReminder = now
                } else {
                    this.switchTimerDisplayColor(false)
                }
            } else {
                this.lastReminder = this.start
            }
        }
    },

    switchTimerDisplayColor(isWarning) {
        this.timerDisplay.setProperty(prop.MORE, {
            color: isWarning ? COLORS.TEXT.WARNING : COLORS.TEXT.TITLE
        })
    },

    setDisplayValue(seconds) {
        this.timerDisplay.setProperty(prop.MORE, {
            text: getTimerDisplayValue(seconds)
        })
    },

    colorBars(remainingSeconds) {
        const progress = Math.min(100, 100 - Math.floor(100 * remainingSeconds / this.timer.valueSeconds))
        for (let i = 0; i < progress; i++) {
            const bar = this.bars[i].bar
            const props = this.bars[i].props
            if (!props.processed) {
                bar.setProperty(prop.MORE, {
                    x:     props.x,
                    y:     props.y,
                    w:     props.w,
                    h:     props.h,
                    color: TIMER_PROGRESS.TIMER_PROGRESS_CIRCLE.bar_color_processed
                })
                props.processed = true
            }
        }
    },

    doVibro() {
        this.vibro.stop()
        this.vibro.setMode(VIBRATOR_SCENE_TIMER)
        this.vibro.start()
    },

    createStopButton() {
        return createWidget(widget.BUTTON,
                COMMON.STANDARD_BOTTOM_BUTTON_STYLE_ACTION(CONSTANTS.img.STOP, CONSTANTS.img.STOP_PRESSED, (arg) => {
                    getApp()._options.globalData.openMain = true
                    back()
                }))
    },

    createCancelButton() {
        return createWidget(widget.BUTTON, TIMER_PROGRESS.CANCEL_BUTTON((arg) => {
            this.doVibro()
            getApp()._options.globalData.openMain = true
            back()
        }))
    },

    createPauseButton() {
        return createWidget(widget.BUTTON,
                TIMER_PROGRESS.PAUSE_RESUME_BUTTON(CONSTANTS.img.PAUSE, CONSTANTS.img.PAUSE_PRESSED, (button) => {
                    this.doVibro()
                    this.stopProcesses()
                    this.pause = this.time.getTime()
                    this.resumeButton = this.createResumeButton()
                    deleteWidget(button)
                }))
    },

    createResumeButton() {
        return createWidget(widget.BUTTON,
                TIMER_PROGRESS.PAUSE_RESUME_BUTTON(CONSTANTS.img.RESUME, CONSTANTS.img.RESUME_PRESSED, (button) => {
                    this.doVibro()
                    const pauseTime = this.time.getTime() - this.pause
                    this.end += pauseTime
                    this.lastReminder += pauseTime
                    this.startTimerProcess()
                    this.pauseButton = this.createPauseButton()
                    deleteWidget(button)
                }))
    },

    deleteAdditionalButtons() {
        deleteWidget(this.cancelButton)
        deleteWidget(this.pauseButton)
        deleteWidget(this.resumeButton)
    },

    getRemainingSeconds() {
        return Math.floor(Math.max(0, this.end - this.time.getTime()) / CONSTANTS.seconds.mili)
    }
})

function createTimerProgressCircle() {
    let bars = {}
    let angle = 360

    for (let i = 0; i < 100; i += 1) {
        if (angle === 0) {
            angle = 180
        }
        const circleProps = TIMER_PROGRESS.TIMER_PROGRESS_CIRCLE
        const x = circleProps.center_x + circleProps.radius * Math.cos((-90 - i * 3.6) * Math.PI / 180)
        const y = circleProps.center_y + circleProps.radius * Math.sin((-90 - i * 3.6) * Math.PI / 180)
        const bar = createWidget(widget.FILL_RECT, {
            x:     x,
            y:     y,
            w:     circleProps.bar_width,
            h:     circleProps.bar_height,
            color: circleProps.bar_color,
            angle: angle
        })
        bars[i] = {bar: bar, props: {x: x, y: y, w: circleProps.bar_width, h: circleProps.bar_height, processed: false}}
        angle -= 3.6
    }
    return bars
}

function getTimerDisplayValue(valueSeconds) {
    const timerHours = Math.floor(valueSeconds / CONSTANTS.seconds.hour)
    const timerMinutes = Math.floor(valueSeconds % CONSTANTS.seconds.hour / CONSTANTS.seconds.min)
    const timerSeconds = valueSeconds % CONSTANTS.seconds.min
    if (timerHours > 0) {
        return `${_00(timerHours)}:${_00(timerMinutes)}:${_00(timerSeconds)}`
    }
    return `${_00(timerMinutes)}:${_00(timerSeconds)}`
}

function _00(value) {
    return zeroPad(value, 2)
}