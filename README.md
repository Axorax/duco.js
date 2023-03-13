# `duco.js`
Easily implement a duino coin miner to your website

duco.js is a JavaScript library that allows you to create a duino coin miner for your website.

## Installation
**With npm**
```
npm i duco
```
**Via CDN**

unpkg
```js
import { Duco } from 'https://www.unpkg.com/duco';
```
jsdelivr
```js
import { Duco } from 'https://cdn.jsdelivr.net/npm/duco';
```

## Usage
### **Basics**

**Full code to create and start a miner**
```js
const miner = new Duco({
    username: 'axorax'
})

miner.start()
```

**Create a new miner**
```js
const miner = new Duco({
    username: 'axorax',
    threads: 1,
    rigid: 'duco-js-miner',
    key: 'mySecretKey',
    id: 'my-cool-miner'
})
```

threads, rigid, id and key are optional but username is required. If no username is provided, then the created miner will have username set to 'axorax' by default. This will make the miner mine for the user named axorax.

* \<required\> username - Person who the miner will mine for.

* \[optional\] threads - Amount of threads that should be used.

* \[optional\] rigid - Gives the miner an id that appears in your miner list.

* \[optional\] key - Only needed if you have an active key.

* \[optional\] id - Gives the miner a HTML id tag.

The bare minimum to create a miner is:
```js
const miner = new Duco({
    username: 'axorax'
})
```

The default values are:
```js
username: 'axorax',
threads: 1,
rigid: 'duco.js',
key: '',
id: <randomly-generated>
```

**Set `threads` to maximum amount a user has**

We recommend not using this and just leaving threads to `1`.
```js
const miner = new Duco({
    username: 'axorax',
    threads: 'hardwareConcurrency'
})
```

**Start miner**
```js
miner.start()
```

**Start miner after a certain time**
```js
miner.startAfter(5000)
```
The time must be passed in milliseconds. In the above example, it will start the miner after 5 seconds (5000ms = 5s)

**Stop miner**
```js
miner.stop()
```

**Stop miner after a certain time**
```js
miner.stopAfter(5000)
```

**Change already created miner**
```js
miner.change({
    username: 'changed_username',
    threads: 2,
    rigid: 'myCoolMiner',
    key: 'superSecret'
})
```

After changing the miner, it will not start automatically.

**Change miner and start automatically**
```js
miner.change({
    username: 'changed_username',
    threads: 2,
    rigid: 'myCoolMiner',
    key: 'superSecret',
    start: true
})
```

Set the value of `start` to true to make the miner start automatically after being changed.

**Change already created miner after a certain time**
```js
miner.changeAfter({
    username: 'changed_username',
    threads: 2,
    rigid: 'myCoolMiner',
    key: 'superSecret'
}, 5000)
```

This works similar to `miner.change()` but you need to also provide a time in milliseconds after the curly braces `{}`. In the given example, the miner will get changed after 5 seconds (5000ms = 5s)

**Get values used in a miner**
```js
let minerUsername = miner.username;
let minerThreads = miner.threads;
let minerId = miner.id;
// you can get all values like that
```

**Get time when miner was created**
```js
miner.createdTimestamp
```

**Get time when miner was started**
```js
miner.startedTimestamp
```

**Get time when miner was stopped**
```js
miner.stoppedTimestamp
```

**Check if miner is running**
```js
miner.running
```

**Check if miner was changed**
```js
miner.changed
```

**Add custom CSS to miner**
```js
miner.addStyle(`
    display: block;
    width: 500px:
    height: 400px;
`)
```

### **Via CDN**
```html
<script type="module">
import { Duco } from 'https://www.unpkg.com/duco';

const miner = new Duco({
    username: 'axorax',
    threads: 1,
    rigid: 'duco-js-miner',
    key: 'mySecretKey' 
})

miner.start()
</script>
```

### **Via CDN in another file**
If you want to use the library in another file then the code will be as follows:

```html
<script type="module" src="./script.js"></script>
```

```js
import { Duco } from 'https://www.unpkg.com/duco';

const miner = new Duco({
    username: 'axorax',
    threads: 1,
    rigid: 'duco-js-miner',
    key: 'mySecretKey' 
})

miner.start()
```

### **With npm**
```js
import { Duco } from './node_modules/duco/index.js';

const miner = new Duco({
    username: 'axorax',
    threads: 1,
    rigid: 'duco-js-miner',
    key: 'mySecretKey' 
})

miner.start()
```

---

[Support me on Patreon](https://www.patreon.com/axorax) - 
[Check out my socials](https://github.com/axorax/socials)
