export class Duco {

    constructor (options) {
        this.username = options.username || 'axorax';
        this.threads = String(options.threads).toLowerCase()=='max'?window.navigator.hardwareConcurrency:options.threads||1;
        this.rigid = options.rigid || 'duco.js';
        this.key = options.key || '';
        this.id = options.id || ('duco-js-' + String(Math.random().toString(36).slice(2, 12)));
        this.createdTimestamp = new Date();
        this.startedTimestamp = null;
        this.stoppedTimestamp = null;
        this.running = false;
        this.changed = false;
        this.data = null;
        this.url = `webminer.html?username=${this.username}&threads=${this.threads}&rigid=${this.rigid}&keyinput=${this.key}`;
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

    delete() {
        document.querySelectorAll(`#${this.id}`).forEach(e=>e.remove());
    }

    deleteAfter(time) {
        setTimeout(() => {
            this.delete();
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
        this.url = `webminer.html?username=${this.username}&threads=${this.threads}&rigid=${this.rigid}&keyinput=${this.key}`;
        this.changed = true;
        this.stop();
        if (options.start) this.start();
    }

    changeAfter(options, time) {
        setTimeout(() => {
            this.change(options);
        }, time)
    }

    onRemove(code) {
        const g = this.id;
        const x = new MutationObserver(function(y) {
            y.forEach(function(z) {
                z.removedNodes.forEach(function(a) {
                    if(a.id == g) {
                        x.disconnect();
                        code();
                    }
                });
            });
        });
        x.observe(document.querySelector("body"), { subtree: false, childList: true });
    }

    onRemoveCreateNew() {
        this.onRemove(() => {
            const n = new Duco({
                username: this.username,
                threads: this.threads,
                rigid: this.rigid,
                key: this.key,
                id: this.id
            });
            n.start();
            n.onRemoveCreateNew();
        });
    }

    get(getData = '', extra = '') {
        let fetchUrl = '';

        switch (getData) {
            case '':
                fetchUrl = `v2/users/${this.username}`;
                break;
            case 'transactions':
                fetchUrl = `transactions?username=${this.username}`;
                break;
            case 'user':
                fetchUrl = `users/${this.username}`;
                break;
            case 'balance':
                fetchUrl = `balances/${this.username}`;
                break;
            case 'miners':
                fetchUrl = `miners/${this.username}`;
                break;
            case 'pools':
                fetchUrl = `all_pools`;
                break;
            case 'stats':
                fetchUrl = `statistics`;
                break;
            case 'shop':
                fetchUrl = `shop_items`;
                break;
            case 'latestTransactions':
                fetchUrl = `user_transactions/${this.username}`;
                break;
            case 'hash':
                fetchUrl = `transactions/${extra}`;
                break;
            case 'id':
                fetchUrl = `id_transactions/${extra}`;
        }

        return new Promise((resolve, reject) => {
            fetch('https://server.duinocoin.com/' + String(fetchUrl)).then(res => {
                if (!res.ok) {
                    throw Error('Failed to fetch data')
                }
                return res.json();
            }).then(data => {
                this.data = data;
                resolve(data);
            }).catch(() => {
                reject(`Failed to fetch data about '${this.username}'`);
            })
        })
    }

    auth(options) {
        return new Promise((resolve, reject) => {
            fetch(`https://server.duinocoin.com/auth/${this.username}?password=${options.password}`).then(res => {
                if (!res.ok) {
                    throw Error('Failed to fetch data')
                }
                return res.json();
            }).then(data => {
                this.data = data;
                resolve(data);
            }).catch(() => {
                reject(`Failed to fetch data about '${this.username}'`);
            })
        })
    }

    buy(options) {
        return new Promise((resolve, reject) => {
            fetch(`https://server.duinocoin.com/shop_buy/${this.username}?item=${options.item}&password=${options.password}`).then(res => {
                if (!res.ok) {
                    throw Error('Failed to fetch data')
                }
                return res.json();
            }).then(data => {
                this.data = data;
                resolve(data);
            }).catch(() => {
                reject(`Failed to fetch data about '${this.username}'`);
            })
        })
    }

    send(options) {
        return new Promise((resolve, reject) => {
            fetch(`https://server.duinocoin.com/transaction?username=${this.username}&password=${options.password}&recipient=${options.recipient}&amount=${String(options.amount)}&memo=${options.memo}`).then(res => {
                if (!res.ok) {
                    throw Error('Failed to fetch data')
                }
                return res.json();
            }).then(data => {
                this.data = data;
                resolve(data);
            }).catch(() => {
                reject(`Failed to fetch data about '${this.username}'`);
            })
        })
    }

    exchange(options) {
        return new Promise((resolve, reject) => {
            fetch(`https://server.duinocoin.com/exchange_request/?username=${this.username}&password=${options.password}&email=${options.email}&type=${options.type}&amount=${options.amount}&coin=${options.coin}&address=${options.address}`).then(res => {
                if (!res.ok) {
                    throw Error('Failed to fetch data')
                }
                return res.json();
            }).then(data => {
                this.data = data;
                resolve(data);
            }).catch(() => {
                reject(`Failed to fetch data about '${this.username}'`);
            })
        })
    }
}

export default Duco;