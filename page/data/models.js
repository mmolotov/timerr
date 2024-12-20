import {getText} from '@zos/i18n';
import {log as Logger} from '@zos/utils';

const logger = Logger.getLogger('timerr');

export class Page {
    constructor(name, url) {
        this.name = name
        this.url = url
    }

    getUrl(deviceFamily) {
        let url = 'page/devices/' + deviceFamily + '/' + this.url
        return url
    }
}

export class TimeUnit {
    constructor(code, text) {
        this.code = code;
        this.text = text;
    }

    toSeconds() {
        throw new Error('not implemented')
    }
}

export class Second extends TimeUnit {

    constructor() {
        super('SEC', getText('unit_second'));
    }

    toSeconds() {
        return 1;
    }
}

export class Minute extends TimeUnit {
    constructor() {
        super('MIN', getText('unit_minute'));
    }

    toSeconds() {
        return 60;
    }
}

export class Hour extends TimeUnit {
    constructor() {
        super('HOUR', getText('unit_hour'));
    }

    toSeconds() {
        return 60 * 60;
    }
}

export class TimeSpan {

    constructor(value, unit, img = null, imgPressed = null) {
        this.value = value;
        this.unit = unit;
        this.valueSeconds = value * unit.toSeconds();
        this.img = img
        this.imgPressed = imgPressed
    }

    getDisplayName() {
        return this.value + ' ' + this.unit.text
    }
}

export class ZeroSpan extends TimeSpan {

    constructor(unit, img, imgPressed) {
        super(0, unit, img, imgPressed)
    }

    getDisplayName() {
        return '-'
    }
}

