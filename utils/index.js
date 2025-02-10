import {Vibrator, VIBRATOR_SCENE_TIMER} from '@zos/sensor';
import {pauseDropWristScreenOff, pausePalmScreenOff, resetDropWristScreenOff, resetPalmScreenOff} from '@zos/display'
import {LocalStorage} from '@zos/storage'
import {log as Logger} from '@zos/utils';

export const logger = Logger.getLogger('timerr');
const VIBRO = new Vibrator()

export function doLongVibro() {
    logger.debug('* * * * long vibro * * * *')
    const vibrationType = VIBRO.getType()
    VIBRO.start([
        {
            type:     vibrationType.URGENT,
            duration: 100
        },
        {
            type:     vibrationType.URGENT,
            duration: 100
        },
        {
            type:     vibrationType.URGENT,
            duration: 100
        }
    ])
}

export function doShortVibro() {
    logger.debug('* * * * short vibro * * * *')
    const vibrationType = VIBRO.getType()
    VIBRO.start([
        {
            type:     vibrationType.GENTLE_SHORT,
            duration: 100
        }
    ])
}

export function startVibration() {
    logger.debug('* * * * start vibro * * * *')
    VIBRO.stop()
    VIBRO.setMode(VIBRATOR_SCENE_TIMER)
    VIBRO.start(VIBRATOR_SCENE_TIMER)
}

export function stopVibration() {
    logger.debug('- - - - stop vibro - - - -')
    VIBRO.stop()
}

export function vibroCallback(callback) {
    return arg => {
        doShortVibro()
        callback(arg)
    }
}

export function formatNumberForPicker(number, places = 2) {
    return String(number).padStart(places, '0')
}

export function pauseScreenOff() {
    const duration = {
        duration: 0
    }
    pausePalmScreenOff(duration)
    pauseDropWristScreenOff(duration)
}

export function resetScreenOff() {
    resetPalmScreenOff()
    resetDropWristScreenOff()
}

const STORAGE = new LocalStorage()

export function saveInStorage(key = '', value) {
    logger.debug('save value in storage: ', key, value)
    STORAGE.setItem(key, value)
}

export function getFromStorage(key = '', fallback) {
    return STORAGE.getItem(key, fallback)
}