import {back} from '@zos/router';
import {createWidget, deleteWidget, prop, widget} from '@zos/ui';
import {log as Logger} from '@zos/utils';
import {CONSTANTS} from '../../constants/constants';
import {pauseDropWristScreenOff, pausePalmScreenOff, resetDropWristScreenOff, resetPalmScreenOff} from '@zos/display'
import {doLongVibro, formatNumberForPicker as _00, startVibration, stopVibration, vibroCallback} from '../../../utils/index'
import {Time} from '@zos/sensor';

const logger = Logger.getLogger('timerr')
const MILLI = 1_000
const PROCESS_DELAY_MS = 200
const TIME = new Time()

function TimerProgressPage(args) {
    const {
        //style
        headerStyle,
        remainingTimeStyleFunction,
        cancelButtonStyleFunction,
        pauseButtonStyleFunction,
        resumeButtonStyleFunction,
        stopButtonStyleFunction,
        canvasLayoutStyle,
        timerDisplayTextAccentColors,

        //
        createTimerProgressBarFunction
    } = args

    Page({
        onInit() {
        },
        build() {
            this.processes = []
            this.timerSeconds = getApp()._options.globalData[CONSTANTS.session.timer].valueSeconds
            this.intervalSeconds = getApp()._options.globalData[CONSTANTS.session.interval].valueSeconds
            logger.debug('start with timer : ' + this.timerSeconds)
            logger.debug('start with interval : ' + this.intervalSeconds)

            this.pauseScreenOff()
            this.renderWidgets()

            this.start = TIME.getTime()
            this.end = this.start + secondsToMillis(this.timerSeconds + 1)
            this.remainingSeconds = getRemainingSeconds(this.end)
            this.startTimer()
        },
        onDestroy() {
            stopVibration()
            this.resetScreenOff()
        },
        pauseScreenOff() {
            const duration = {
                duration: 0
            }
            pausePalmScreenOff(duration)
            pauseDropWristScreenOff(duration)
        },
        resetScreenOff() {
            resetPalmScreenOff()
            resetDropWristScreenOff()
        },
        renderWidgets() {
            this.canvas = createWidget(widget.CANVAS, canvasLayoutStyle)
            this.updateTimerProgressBar(0)
            createWidget(widget.TEXT, headerStyle)
            this.timerDisplay = createWidget(widget.TEXT, remainingTimeStyleFunction(getRemainingTimeText(this.timerSeconds)))
            this.cancelButton = this.createCancelButton(cancelButtonStyleFunction(vibroCallback(() => back())))
            this.pauseButton = this.createPauseButton()
        },
        updateTimerProgressBar(progress) {
            this.canvas.clear(canvasLayoutStyle)
            createTimerProgressBarFunction(this.canvas, progress)
        },
        createCancelButton(options) {
            return createWidget(widget.BUTTON, options)
        },
        createPauseButton() {
            return createWidget(widget.BUTTON, pauseButtonStyleFunction(vibroCallback((button) => {
                this.stopProcesses()
                this.pause = TIME.getTime()
                this.resumeButton = this.createResumeButton()
                deleteWidget(button)
            })))
        },
        createResumeButton() {
            return createWidget(widget.BUTTON, resumeButtonStyleFunction(vibroCallback((button) => {
                this.pauseButton = this.createPauseButton()
                const pauseTime = TIME.getTime() - this.pause
                this.end += pauseTime
                this.lastReminderTime += pauseTime
                this.startTimer()
                deleteWidget(button)
            })))
        },
        startTimer() {
            logger.debug('start time: ', this.start, ' end time:', this.end)

            const process = setInterval(() => {
                const remainingSeconds = getRemainingSeconds(this.end)
                this.setTimerDisplayText(getRemainingTimeText(remainingSeconds))
                if (remainingSeconds === 0) {
                    this.stopProcesses()
                    this.deleteAdditionalButtons()
                    this.createCancelButton(stopButtonStyleFunction(vibroCallback(() => back())))
                    this.startTimerDisplayBlinking()
                    startVibration()
                } else {
                    this.notifyOnInterval(remainingSeconds)
                }
                if (this.remainingSeconds != remainingSeconds) {
                    this.remainingSeconds = remainingSeconds
                    this.updateTimerProgressBar(getProgress(remainingSeconds, this.timerSeconds))
                }
            }, PROCESS_DELAY_MS)
            this.processes.push(process)
        },
        setTimerDisplayText(textValue) {
            this.timerDisplay.setProperty(prop.MORE, {
                text: textValue
            })
        },
        switchTimerDisplayColor(isWarning) {
            this.timerDisplay.setProperty(prop.MORE, {
                color: isWarning ? timerDisplayTextAccentColors[1] : timerDisplayTextAccentColors[0]
            })
        },
        stopProcesses() {
            this.processes.forEach(i => clearInterval(i))
        },
        deleteAdditionalButtons() {
            deleteWidget(this.cancelButton)
            deleteWidget(this.pauseButton)
            deleteWidget(this.resumeButton)
        },
        startTimerDisplayBlinking() {
            let switcher = true
            let interval = setInterval(() => {
                this.switchTimerDisplayColor(switcher)
                switcher = !switcher
            }, PROCESS_DELAY_MS)
            this.processes.push(interval)
        },
        notifyOnInterval() {
            if (this.intervalSeconds > 0) {
                if (this.lastReminderTime) {
                    const now = TIME.getTime()
                    if (now - this.lastReminderTime >= secondsToMillis(this.intervalSeconds)) {
                        doLongVibro()
                        this.switchTimerDisplayColor(true)
                        this.lastReminderTime = now
                    } else {
                        this.switchTimerDisplayColor(false)
                    }
                } else {
                    this.lastReminderTime = this.start
                }
            }
        }
    })
}

function getProgress(remainingSeconds, totalSeconds) {
    if (remainingSeconds <= 0) {
        return 100
    }
    return Math.min(100, Math.floor((totalSeconds - remainingSeconds) / totalSeconds * 100))
}

function getRemainingSeconds(endTime) {
    return Math.floor(Math.max(0, endTime - TIME.getTime()) / MILLI)
}

function getRemainingTimeText(valueSeconds) {
    const remainingHours = Math.floor(valueSeconds / CONSTANTS.timeUnits.HOUR.toSeconds())
    const remainingMinutes = Math.floor(valueSeconds % CONSTANTS.timeUnits.HOUR.toSeconds() / CONSTANTS.timeUnits.MIN.toSeconds())
    const remainingSeconds = valueSeconds % CONSTANTS.timeUnits.MIN.toSeconds()
    if (remainingHours > 0) {
        return `${_00(remainingHours)}:${_00(remainingMinutes)}:${_00(remainingSeconds)}`
    }
    return `${_00(remainingMinutes)}:${_00(remainingSeconds)}`
}

function secondsToMillis(seconds) {
    return seconds * MILLI
}

export default TimerProgressPage
