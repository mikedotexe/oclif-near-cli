near
====

Interact with NEAR Protocol, a blockchain great for building smart contracts and so much more.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/near.svg)](https://npmjs.org/package/near)
[![Downloads/week](https://img.shields.io/npm/dw/near.svg)](https://npmjs.org/package/near)
[![License](https://img.shields.io/npm/l/near.svg)](https://github.com/mikedotexe/near-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g near
$ near COMMAND
running command...
$ near (-v|--version|version)
near/0.0.0 darwin-x64 node-v10.16.0
$ near --help [COMMAND]
USAGE
  $ near COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`near hello [FILE]`](#near-hello-file)
* [`near help [COMMAND]`](#near-help-command)

## `near hello [FILE]`

describe the command here

```
USAGE
  $ near hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ near hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/mikedotexe/near-cli/blob/v0.0.0/src/commands/hello.ts)_

## `near help [COMMAND]`

display help for near

```
USAGE
  $ near help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_
<!-- commandsstop -->
