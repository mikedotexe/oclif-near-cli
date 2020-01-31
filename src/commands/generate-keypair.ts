import {flags} from '@oclif/command'
import TranslatableCommand from '../translatable-command'
const sh = require('shelljs') // import right?

export default class GenerateKeypair extends TranslatableCommand {
  static description = 'describe the command here'

  static examples = [
    `$ near generate-keypair doomslug
    Looks for a Keychain entry for the user.`,
  ];

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = [{name: 'accountId', description: 'Specify the account id'}]

  async run() {
    const {args, flags} = this.parse(GenerateKeypair)

    const accountId = args.accountId || 'friend'
    
    // TODO: use nearlib for creation of this
    // Right now grab a random number to add to the end of the mock password
    const secret = Math.floor(Math.random() * Math.floor(19))
    // sh.set('-ev') // Make it verbose

    const self = this
    sh.exec(`security find-generic-password -a ${accountId}`, {silent: true}, function(code: number, stdout: any, stderr: any) {
      if (code === 44) {
        self.log(`No existing keychain account for '${accountId}', creating it.`)
        sh.exec(`security add-generic-password -a ${accountId} -s near-cli -w mypassword${secret}`, {silent: true})
      } else if (code === 0) {
        self.log(`Found existing account for '${accountId}'`)
        const inquirer = require('inquirer');
        inquirer.prompt([
          {
            type: 'confirm',
            name: 'overwriteKeychainAccount',
            message: `Overwrite value for keychain account '${accountId}'?`,
          },
        ])
        .then(function (answers: any) {
          if (answers.overwriteKeychainAccount === false) {
            self.log('Aborting saving to keychain')
            return
          }
          self.log(`Deleting generic password keychain account '${accountId}'`)
          sh.exec(`security delete-generic-password -a ${accountId}`, {silent: true})
          self.log(`Creating generic password keychain for account '${accountId}'`)
          sh.exec(`security add-generic-password -a ${accountId} -s near-cli -w mypassword${secret}`, {silent: true})
          // for testing
          sh.exec(`security find-generic-password -wa ${accountId}`, {silent: true}, function(code: number, stdout: any, stderr: any) {
            // self.log("code: ", code);
            self.log("stdout: ", stdout);
            // self.log("stderr: ", stderr);
          })
        });
      }
    });
    return
  }
}