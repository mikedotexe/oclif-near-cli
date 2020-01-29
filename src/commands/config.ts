import {flags} from '@oclif/command'
import {inquirer} from 'inquirer';
import TranslatableCommand from '../translatable-command'

// export default class Config extends Command {
export default class NearConfig extends TranslatableCommand {
  // var inquirer = require('inquirer')
  static description = 'describe the command here'

  static examples = [
    `$ near config
hello world from ./src/hello.ts!
`,
  ];
  
  // todo add dotenv dependency
  // 

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  static args = [{lang: 'file'}]

  async run() {
      const inquirer = require('inquirer');
      inquirer.prompt([
        {
            type: 'input',
            name: 'langcode',
            message: "What's your language code",
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
        // {
        //   type: 'checkbox',
        //   name: 'keyLocation',
        //   message: 'Where shall we store/load keys and configuration?',
        //   choices: [
        //     {name: 'Check home directory\'s .near/ folder, then project directory', value: 'circleci'},
        //     {name: 'Always the home directory', value: 'appveyor'},
        //     {name: 'Always the project directory', value: 'codecov'},
        //     {name: 'travisci (continuous integration/delivery service)', value: 'travisci'},
        //   ],
        //   // filter: ((arr: string[]) => _.keyBy(arr)) as any,
        // },
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
            // {
            //   name: 'OS X Keychain',
            //   value: 'keychain'
            // },
            // {
            //   name: 'Windows Credential Manager',
            //   disabled: 'Currently unavailable'
            // }
          ]
        },
        {
          type: 'confirm',
          name: 'keychain',
          message: "Are you using Mac and want to try Keychain Access? (alpha)",
        },        
      ])
      .then(answers => {
        this.langcode = answers.langcode;
        console.log(JSON.stringify(answers, null, '  '));
        this.log("langcode: ", this.langcode);
        const {args, flags} = this.parse(NearConfig)
    
        const name = flags.name || 'world'
        this.log(`hello config ${name} from ./src/commands/config.ts`)
          this.log(this.langcode);
        if (args.file && flags.force) {
          this.log(`you input --force and --file: ${args.file}`)
        }
        console.log("dirname", __dirname);

      });    
    
  }
}
