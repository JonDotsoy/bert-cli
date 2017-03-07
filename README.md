# 🍹 Bert
A task manager inspired on Gulp.

> This document content the specifications to build the client to Bert.

## Quick start

### Step 1: Write a `.bert.js` file

```javascript
const bert = require('bert')

const node = bert.agent('node', {image: 'node:7.7.0'})

bert.task('taskInfo', () => {
    node.sh('node --version') 
    bert.sh('node --version') 
})
```

### Run the next script

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

### Optional: Clear rm you agents

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

## Feature: Init

Initialize a Bert file (`.bert.js`).

    $ bert init


## Espect .bert.js file

```javascript
const bert = require('bert')

/* EXAMPLES WITH DOCKER */
/* ==================== */

bert.stage('node')
// CMD Equivalent: docker create node:latest
/* Content .bertlook.json
{
  "stages": {
    "node": "36c4536996ca5615dcf9911f068786dc/a441b15fe9a3cf56661190a0b93b9dec7d04127288cc87250967cf3b52894d11"
  }
}
*/

bert.stage('node', {
  image: 'node:7.7.0'
})
// CMD Equivalent: docker create  node:7.7.0
/* Content .bertlook.json
{
  "stages": {
    "node": "36c4536996ca5615dcf9911f068786dc/a441b15fe9a3cf56661190a0b93b9dec7d04127288cc87250967cf3b52894d11"
  }
}
*/

bert.stage('node', {
  tag: '7.7.0'
})
// CMD Equivalent: docker create node:7.7.0
/* Content .bertlook.json
{
  "stages": {
    "node": "36c4536996ca5615dcf9911f068786dc/a441b15fe9a3cf56661190a0b93b9dec7d04127288cc87250967cf3b52894d11"
  }
}
*/

bert.stage('pepe', {
  image: 'node:7.7.0'
})
// CMD Equivalent: docker create node:7.7.0
/* Content .bertlook.json
{
  "stages": {
    "pepe": "36c4536996ca5615dcf9911f068786dc/a441b15fe9a3cf56661190a0b93b9dec7d04127288cc87250967cf3b52894d11"
  }
}
*/

```


