# 🍹 bert
A task manager inspired on Gulp.

![](./assets/bert-bg.png)

## Features
- [x] Structure to cli `> bert [command]`.
- [x] **DotBert**: How to read and how to work.
- [x] Run process with:  `<engine>.sh`.
- [x] Run this process on gulp.

## Usage
```bash
# Install bert.js
npm install --global bert.js
# Install in you proyect
npm install --save-dev bert.js
# Run It
bert
```

## Quick start

### Step 1: Write a `.bert.js` file

```javascript
const bert = require('bert.js')

const node = bert.agent('node', {image: 'node:7.7.0'})

bert.task('taskInfo', () => {
    node.sh('node --version') 
    bert.sh('node --version') 
})
```

### Run the task

```bash
$ bert -V taskInfo
[bert] Prepare agent node (node:7.7.0)
[bert:run] > docker pull node:7.7.0
[bert:run] > docker run -t -d -u 112:116 -w ******** -v ******** -v ******** -e ******** --entrypoint cat node:7.7.0
[bert:run] node> node --version
v7.7.0
[bert:run] > node --version
v7.6.0
```

### Run the task on clear environment

```bash
$ bert -V --empty taskInfo
[WARNING] This is not possible load local agent without docker.
[bert] Prepare agent node (node:7.7.0)
[bert:run] > docker pull node:7.7.0
[bert:run] > docker run -t -d -u 112:116 -w ******** -v ******** -v ******** -e ******** --entrypoint cat node:7.7.0
[bert:run] node> node --version
v7.7.0
```

### Run silet task

```bash
$ bert taskInfo
node> node --version
v7.7.0
> node --version
v7.6.0
```

### ✖ Optional: Clear rm you agents

```bash
$ bert -V --clear
[bert] Prepare to remove node (node:7.7.0)
[bert:run] > docker stop --time=1 ********
[bert:run] > docker rm -f ********
```

Features (Commands):
- [ ] Help
- [ ] Init a project with Bert

## Feature: Help
Show a list to help.

    $ bert [help|h|--help|-h]

## ✖ Feature: Init

Initialize a Bert file (`.bert.js`).

    $ bert init


## Espect .bert.js file

```javascript
const bert = require('bert.js')

/* EXAMPLES WITH DOCKER */
/* ==================== */

bert.stage('node')
// CMD Equivalent: docker create node:latest

bert.stage('node', {
  image: 'node:7.7.0'
})
// CMD Equivalent: docker create  node:7.7.0

bert.stage('node', {
  tag: '7.7.0'
})
// CMD Equivalent: docker create node:7.7.0

bert.stage('pepe', {
  image: 'node:7.7.0'
})
// CMD Equivalent: docker create node:7.7.0

```


## What is an Agent

## Project Structure

- `bin/`: The script to use bert on console.
- `lib/`:
    - `dotBert/`: Working with the `.bert.js` file.
    - `engine/`: Working with the diferent engines.
        - `docker/`: working with the docker engine. 
