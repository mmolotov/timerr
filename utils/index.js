import {Vibrator, VIBRATOR_SCENE_DURATION_LONG, VIBRATOR_SCENE_SHORT_LIGHT, VIBRATOR_SCENE_TIMER} from '@zos/sensor';
import {log as Logger} from '@zos/utils';

const logger = Logger.getLogger('timerr');
const VIBRO = new Vibrator()

export function assets(type) {
  return (path) => type + '/' + path;
}

export function doShortVibro() {
  logger.debug('* * * * short vibro * * * *')
  VIBRO.stop()
  VIBRO.setMode(VIBRATOR_SCENE_DURATION_LONG)
  VIBRO.start(VIBRATOR_SCENE_DURATION_LONG)
}

export function doLongVibro() {
  logger.debug('* * * * long vibro * * * *')
  VIBRO.stop()
  VIBRO.setMode(VIBRATOR_SCENE_SHORT_LIGHT)
  VIBRO.start(VIBRATOR_SCENE_SHORT_LIGHT)
}

export function startVibration() {
  logger.debug('* * * * endless vibro * * * *')
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