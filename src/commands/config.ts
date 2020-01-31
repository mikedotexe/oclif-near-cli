import {flags} from '@oclif/command'
import TranslatableCommand from "../translatable-command"

enum Questions {
  LangCode = "askLangCode",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

export default class NearConfig extends TranslatableCommand {
  static description = 'experience config options'
  // tkDescription = 'cmdDescription' // it seems that parent static members will not be as easy as questions

  static examples = [
    `$ near nearconfig
hello world from ./src/hello.ts!
`,
  ];

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = []

  async run() {
    const inquirer = require('inquirer');
    const self: TranslatableCommand = this
    const answers = await inquirer.prompt([
      {
          type: 'input',
          name: 'langcode',
          // "What's your language code"
          message: this.t(Questions.LangCode.toString()),
          default: function() {
              return 'en';
          }
      },
      {
          type: 'input',
          name: 'first_name',
          message: "What's your name?",
          default: function() {
              return 'friend';
          }
      },
      {
        type: 'list',
        name: 'theme',
        message: 'How shall we store/load keys and configuration?',
        choices: [
          new inquirer.Separator(),
          new inquirer.Separator('Home directory: ~/.near'),
          new inquirer.Separator('Project directory: ./near'),
          new inquirer.Separator(),
          {
            name: 'Home directory\'s .near folder, then project directory',
            value: 'home-project'
          },
          {
            name: 'Only the home directory (~/.near)',
            value: 'home'
          },
          {
            name: 'Windows Credential Manager',
            disabled: 'Currently unavailable'
          }
        ]
      },
      {
        type: 'confirm',
        name: 'keychain',
        message: "Are you using Mac and want to try Keychain Access? (alpha)",
      },        
    ])
    .then(function (answers: any) {
      return answers
    });    
    this.log(JSON.stringify(answers, null, '  '));
    console.log('This is where we write the config file')
    this.langcode = answers.langcode
  }
}
