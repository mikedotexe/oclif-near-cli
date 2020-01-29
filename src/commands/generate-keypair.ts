import {flags} from '@oclif/command'
import {inquirer} from 'inquirer';
import TranslatableCommand from '../translatable-command'
const sh = require('shelljs') // import right?
// import {connect as nearConnect, KeyPair, keyStores} from 'nearlib'
// import {KeyPair} from 'nearlib/src.ts/utils'
// import {KeyPair} from 'nearlib'
// import {inspect} from 'util'
// const path = require('path')
// const npmPath = require('npm-run-path')
// const tmp = require('tmp')
// const os = require('os')

export default class GenerateKeypair extends TranslatableCommand {
  static description = 'describe the command here'

  static examples = [
    `$ near generate-keypair doomslug

`,
  ];

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = [{name: 'accountId', description: 'Specify the account id'}]

  async run() {
    const {args, flags} = this.parse(GenerateKeypair)
    // this.log('args', args)
    // this.log('flags', flags)

    const accountId = args.accountId || 'friend'
    
    // TODO: use nearlib when I get off the plane
    const secret = Math.floor(Math.random() * Math.floor(19))
    // sh.set('-ev') // TODO: what is this again? seems to make it very verbose

    /*
    try {
      const keyCheckCode = sh.exec(`security find-generic-password -a ${accountId}`, {silent: true}).code
      // const keyCheckCode = sh.exec(`security find-generic-password -a blah`, {silent: true}).code
      this.log(`keyCheckCode: ${keyCheckCode}`)
    } catch (e) {
      this.log(`error: ${e}`)
    }
    */
    const self = this
    sh.exec(`security find-generic-password -a ${accountId}`, {silent: true}, function(code: number, stdout, stderr) {
      if (code === 44) {
        self.log(`No existing keychain account for ${accountId}, creating it.`)
        sh.exec(`security add-generic-password -a ${accountId} -s near-cli -w ${secret}`, {silent: true})
      } else if (code === 0) {
        self.log(`Found existing account for ${accountId}`)
        const inquirer = require('inquirer');
        inquirer.prompt([
          {
            type: 'confirm',
            name: 'overwriteKeychainAccount',
            message: `Overwrite value for keychain account ${accountId}?`,
          },
        ])
        .then(answers => {
          // self.log(`answers: ${answers}`)
          // self.log(`answers.overwriteKeychainAccount: ${answers.overwriteKeychainAccount}`)
          // inspect(answers)
          if (answers.overwriteKeychainAccount === false) {
            self.log('Aborting saving to keychain')
            return
          }
          self.log(`Deleting generic password keychain account ${accountId}`)
          sh.exec(`security delete-generic-password -a ${accountId}`, {silent: true})
          self.log(`Creating generic password keychain for account ${accountId}`)
          sh.exec(`security add-generic-password -a ${accountId} -s near-cli -w ${secret}`, {silent: true})
          // for testing
          sh.exec(`security find-generic-password -wa ${accountId}`, {silent: true}, function(code: number, stdout, stderr) {
            self.log("code: ", code);
            self.log("stdout: ", stdout);
            self.log("stderr: ", stderr);
          })
        });
      }
    });
    return

    // let near = await require('../utils/connect')(argv);
    // if (args.accountId) {
      // const { deps: { keyStore }} = near.config;
      // const existingKey = await keyStore.getKey(argv.networkId, argv.accountId);
      // if (existingKey) {
      //   console.log(`Account has existing key pair with ${existingKey.publicKey} public key`);
      // } else {
      //   const keyPair = KeyPair.fromRandom('ed25519');
      //   inspect(keyPair);
        
        // await keyStore.setKey(argv.networkId, argv.accountId, keyPair);
        // console.log(`Generated key pair with ${keyPair.publicKey} public key`);
      // }
    // }
  }
}