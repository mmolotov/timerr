import {Hour, Minute, Page, Second} from '../data/models'

export const CONSTANTS = {
    session: {
        timer: 'timer',
        interval: 'interval',
    },
    timeUnits: {
        SEC:  new Second(),
        MIN:  new Minute(),
        HOUR: new Hour()
    },
    i18n:      {
        APP_NAME:    'appName',
        UNIT_SECOND: 'unit_second',
        UNIT_MINUTE: 'unit_minute',
        UNIT_HOUR:   'unit_hour'
    },
    pages:     {
        SELECT_TIMER:    new Page('select_timer', 'selection_pages/select_timer.page'),
        SELECT_INTERVAL: new Page('select_interval', 'selection_pages/select_interval.page'),
        CREATE_TIMER:    new Page('create_timer', 'creation_pages/create_timer.page'),
        CREATE_INTERVAL: new Page('create_interval', 'creation_pages/create_interval.page'),
        TIMER_PROGRESS:  new Page('timer_progress', 'timer_progress/timer_progress.page'),
    },
    images:    {
        // bottom rectangle buttons
        PLUS:            'plus_button.png',
        PLUS_PRESSED:    'plus_button_pressed.png',
        CONFIRM:         'confirm_button.png',
        CONFIRM_PRESSED: 'confirm_button_pressed.png',
        STOP:            'stop_button.png',
        STOP_PRESSED:    'stop_button_pressed.png',

        // circle buttons
        CLOCK_BUTTON:         'clock_button.png',
        CLOCK_BUTTON_PRESSED: 'clock_button_pressed.png',
        CANCEL:               'cancel_button.png',
        CANCEL_PRESSED:       'cancel_button_pressed.png',
        PAUSE:                'pause_button.png',
        PAUSE_PRESSED:        'pause_button_pressed.png',
        RESUME:               'resume_button.png',
        RESUME_PRESSED:       'resume_button_pressed.png',
    }
}
