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
$ near-cli COMMAND
running command...
$ near-cli (-v|--version|version)
near/0.0.0 darwin-x64 node-v10.16.0
$ near-cli --help [COMMAND]
USAGE
  $ near-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`near-cli config`](#near-cli-config)
* [`near-cli generate-keypair [ACCOUNTID]`](#near-cli-generate-keypair-accountid)
* [`near-cli hello [FILE]`](#near-cli-hello-file)
* [`near-cli help [COMMAND]`](#near-cli-help-command)

## `near-cli config`

experience config options

```
USAGE
  $ near-cli config

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ near nearconfig
  hello world from ./src/hello.ts!
```

_See code: [src/commands/config.ts](https://github.com/mikedotexe/near-cli/blob/v0.0.0/src/commands/config.ts)_

## `near-cli generate-keypair [ACCOUNTID]`

describe the command here

```
USAGE
  $ near-cli generate-keypair [ACCOUNTID]

ARGUMENTS
  ACCOUNTID  Specify the account id

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ near generate-keypair doomslug
       Looks for a Keychain entry for the user.
```

_See code: [src/commands/generate-keypair.ts](https://github.com/mikedotexe/near-cli/blob/v0.0.0/src/commands/generate-keypair.ts)_

## `near-cli hello [FILE]`

describe the command here changedhello

```
USAGE
  $ near-cli hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ nearZ hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/mikedotexe/near-cli/blob/v0.0.0/src/commands/hello.ts)_

## `near-cli help [COMMAND]`

display help for near-cli

```
USAGE
  $ near-cli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_
<!-- commandsstop -->
