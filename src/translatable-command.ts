import Command from "@oclif/command/lib/command"
import {Config} from "@oclif/config"
import * as fs from 'fs'
// TODO: add the colors like Peter has

export default abstract class TranslatableCommand extends Command {
  private _langcode: string
  private _configLocation: string
  static configFilename = '.env'
  
  get langcode(): string {
    return this._langcode;
  }

  set langcode(lang: string) {
    // guess at locale/language (en_US.UTF-8 » en)
    // TODO: make sure this assumption is correct about the ISO standard and underscore
    const abbreviatedLang = (process.env.LANG as string).indexOf('_') === -1 ? process.env.LANG as string : (process.env.LANG as string).substr(0, (process.env.LANG as string).indexOf('_'))
    this.log(`Setting language code to: ${abbreviatedLang}`)
    this._langcode = abbreviatedLang
    
  }  
  
  constructor(argv: string[], config: Config.IConfig){
    super(argv, config)
    this.langcode = process.env.LANG
    this.configLocation = ''
    this.findConfig()
    // replace so /first/second/../third becomes /first/third
    this.configLocation = this.configLocation.replace(/(\/.*)\/.*\/\.\./, '$1')
    this.log(`Configuration location: ${this.configLocation}`)
  }
  
  findConfig(): void {
    // get config location (.env)
    for (let path of [`${__dirname}/../${TranslatableCommand.configFilename}`, `${process.env.HOME}/${TranslatableCommand.configFilename}`]) {
      this.checkPathForConfig(path)
      if (this.configLocation !== '') break
    }
    
  }
  
  checkPathForConfig(path: string): void {
    this.log(`Looking for config at: ${path}`)
    try {
      fs.accessSync(path, fs.constants.F_OK | fs.constants.R_OK)
      this.log('File exists and is readable')
      try {
        fs.accessSync(path, fs.constants.W_OK)
        console.log('…and is writable')
      } catch (err) {
        if (err) {
          this.warn(`Your configuration file isn't writable. Some commands may have issues.`)
        }
        this.configLocation = path
      }    
    } catch (err) {
      switch (err.code) {
        case 'ENOENT':
          // file doesn't exist
          this.log(`Couldn't find config file at ${path}`)
          return
        case 'EACCES':
          // permission denied
          this.warn(`The config file ${path} cannot be accessed, please check the file permissions.`)
          return
      }
    }
  }
  
  writeKeyValToConfig(key: string, val: string): void {
        
  }
}
