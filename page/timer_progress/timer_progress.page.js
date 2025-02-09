import {back} from '@zos/router';
import {createWidget, deleteWidget, prop, widget} from '@zos/ui';
import {Time} from '@zos/sensor';

import {COMMON_LAYOUT} from '../common.layout';
import {CONTROLS} from './timer_progress.page.layout';
import {CONSTANTS} from '../common';
import {
    doLongVibro,
    formatNumberForPicker as _00,
    getFromStorage,
    logger,
    pauseScreenOff,
    resetScreenOff,
    startVibration,
    stopVibration
} from '../../utils';

const MS = 1_000;
const PROCESS_DELAY_MS = 200
const TIME = new Time()
const timerSeconds = getFromStorage(CONSTANTS.session.timer)
const intervalSeconds = getFromStorage(CONSTANTS.session.interval)

Page({
    onInit(params) {
        pauseScreenOff()
    },
    build() {
        logger.debug(timerSeconds, intervalSeconds)

        let timerProcess
        let pauseStartTime
        let lastReminderTime
        const header = createWidget(widget.TEXT, COMMON_LAYOUT.HEADERS.header(CONSTANTS.pages.TIMER_PROGRESS.name, 50))
        const canvas = createWidget(widget.CANVAS, CONTROLS.CANVAS_LAYOUT)
        const timerLabel = createWidget(widget.TEXT, CONTROLS.remainingTimeLabel(getRemainingTimeText(timerSeconds)))
        let cancelButton = createWidget(widget.BUTTON, CONTROLS.cancelButton((btn) => {
            back()
        }))
        let pauseButton = createPauseButton()
        let resumeButton
        CONTROLS.createTimerProgress(canvas, 0)

        const start = TIME.getTime()
        let end = start + secondsToMillis(timerSeconds + 1)
        let remainingSeconds = getRemainingSeconds(end)
        timerProcess = startTimer(end, timerLabel, canvas)

        function getRemainingTimeText(valueSeconds) {
            const remainingHours = Math.floor(valueSeconds / 360)
            const remainingMinutes = Math.floor(valueSeconds % 360 / 60)
            const remainingSeconds = valueSeconds % 60
            if (remainingHours > 0) {
                return `${_00(remainingHours)}:${_00(remainingMinutes)}:${_00(remainingSeconds)}`
            }
            return `${_00(remainingMinutes)}:${_00(remainingSeconds)}`
        }

        function createPauseButton() {
            return createWidget(widget.BUTTON, CONTROLS.pauseButton((btn) => {
                clearInterval(timerProcess)
                pauseStartTime = TIME.getTime()
                deleteWidget(btn)
                resumeButton = crateResumeButton()
            }))
        }

        function crateResumeButton() {
            return createWidget(widget.BUTTON, CONTROLS.resumeButton((btn) => {
                const pauseTime = TIME.getTime() - pauseStartTime
                end += pauseTime
                lastReminderTime += pauseTime
                timerProcess = startTimer(end, timerLabel, canvas)
                pauseButton = createPauseButton()
                deleteWidget(btn)
            }))
        }

        function secondsToMillis(seconds = 0) {
            return seconds * MS
        }

        function getRemainingSeconds(endTime = 0) {
            return Math.floor(Math.max(0, endTime - TIME.getTime()) / MS)
        }

        function getProgress(remainingSeconds, totalSeconds) {
            if (remainingSeconds <= 0) {
                return 100
            }
            return Math.min(100, Math.floor((totalSeconds - remainingSeconds) / totalSeconds * 100))
        }

        function setTimerDisplayText(timerLabel, text = '') {
            timerLabel.setProperty(prop.MORE, {
                text: text
            })
        }

        function deleteAdditionalButtons() {
            deleteWidget(cancelButton)
            deleteWidget(pauseButton)
            deleteWidget(resumeButton)
        }

        function startTimer(endTime = 0, timerLabel, canvas) {
            return setInterval(() => {
                const currentlyRemaining = getRemainingSeconds(endTime);
                setTimerDisplayText(timerLabel, getRemainingTimeText(currentlyRemaining))
                if (currentlyRemaining === 0) {
                    clearInterval(timerProcess)
                    deleteAdditionalButtons()
                    createWidget(widget.BUTTON, CONTROLS.stopButton(() => {
                        back()
                    }))
                    startVibration()
                    startTimerDisplayBlinking(timerLabel)
                } else {
                    notifyOnInterval(timerLabel)
                }
                if (remainingSeconds != currentlyRemaining) {
                    remainingSeconds = currentlyRemaining
                    updateTimerProgressBar(canvas, getProgress(currentlyRemaining, timerSeconds))
                }
            }, PROCESS_DELAY_MS)
        }

        function notifyOnInterval(timerLabel) {
            if (intervalSeconds > 0) {
                if (lastReminderTime) {
                    const now = TIME.getTime()
                    if (now - lastReminderTime >= secondsToMillis(intervalSeconds)) {
                        doLongVibro()
                        CONTROLS.switchTimerDisplayColor(timerLabel, true)
                        lastReminderTime = now
                    } else {
                        CONTROLS.switchTimerDisplayColor(timerLabel, false)
                    }
                } else {
                    lastReminderTime = start
                }
            }
        }

        function startTimerDisplayBlinking(timerLabel) {
            let switcher = true
            return setInterval(() => {
                CONTROLS.switchTimerDisplayColor(timerLabel, switcher)
                switcher = !switcher
            }, PROCESS_DELAY_MS)
        }

        function updateTimerProgressBar(canvas, progress) {
            canvas.clear(CONTROLS.CANVAS_LAYOUT)
            CONTROLS.createTimerProgress(canvas, progress)
        }
    },
    onDestroy() {
        stopVibration()
        resetScreenOff()
    }
})