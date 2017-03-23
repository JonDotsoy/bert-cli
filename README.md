# 🍹 bert
A child process to work with [Docker][].

## What does Bert?
Bert is a module to NodeJS, this provides an easily API to work with [child_process][] on you local machino or a container inside [Docker][].

![🍹 > bert](./assets/bert-bg.png)

> ### goals for bert
> Please get a 🍹 drink and write your goal to bert on a [new issue][].

## How to use
```bash
# Install bert.js
npm install --global bert.js
# Install in you proyect
npm install --save-dev bert.js
# Run It
bert
```

### A Example

```javascript
const bert = require('bert.js')

// Prepare the agent to node 7.7.0
const node = bert.agent('node', { image: 'node:7.7.0' })

// Many things
node.sh(['node', '--version']) // v7.7.0
```


[new issue]: https://github.com/JonDotsoy/bert-cli/issues/new "New Issue"
[child_process]: https://nodejs.org/api/child_process.html "Child Process"
[Docker]: http://docker.io/ "A Better Way to Build Apps"
