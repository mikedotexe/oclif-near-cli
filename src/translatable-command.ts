import Command from "@oclif/command/lib/command"
// import {Config} from "@oclif/config/lib/config"
import * as fs from 'fs'
import {IConfig} from "@oclif/config/lib"
// TODO: add the colors like Peter has

export default abstract class TranslatableCommand extends Command {
  private _langcode: string
  private _configLocation: string
  static configFilename = '.env'
  static description: string | undefined;
  
  /*
  tkDescription: string | undefined;
  
  get tkDescription(): string {
    return this.description.toString()
  }
  
  set tkDescription(key: string): void {
    this.log('top of setter for tkDescription')
    // this.description = this.t(key)
    this.description = this.t(key)
  }
  */

  get configLocation(): string {
    return this._configLocation
  }
  
  set configLocation(path: string) {
    // replace so /first/second/../third becomes /first/third
    this._configLocation = path.replace(/(\/.*)\/.*\/\.\./, '$1')
  }
  
  get langcode(): string {
    return this._langcode
  }

  set langcode(lang: string) {
    // guess at locale/language (en_US.UTF-8 » en)
    // TODO: make sure this assumption is correct about the ISO standard and underscore
    const abbreviatedLang = (process.env.LANG as string).indexOf('_') === -1 ? process.env.LANG as string : (process.env.LANG as string).substr(0, (process.env.LANG as string).indexOf('_'))
    this.log(`Setting language code to: ${abbreviatedLang}`)
    this._langcode = abbreviatedLang
  }

  // constructor(argv: string[], config: Config.IConfig){
  constructor(argv: string[], config: IConfig){
    super(argv, config)
    this._langcode = '' // or else TS throws
    this._configLocation = '' // or else TS throws
    this.langcode = process.env.LANG as string
    this.configLocation = ''
    this.findConfig()
    this.log(`Configuration location: ${this.configLocation}`)
    TranslatableCommand.description = ''
  }
  
  t(translationKey: string): string {
    let ret: string = ''
    const langFilePath = `${__dirname}/../lang/${this._langcode}.json`
    try {
      fs.accessSync(langFilePath, fs.constants.F_OK | fs.constants.R_OK)
      const langJSON = require(langFilePath);
      this.log(`The value for key '${translationKey}' for language '${this._langcode}' is '${langJSON[translationKey]}'`)
      ret = langJSON[translationKey]
    } catch (err) {
      this.warn(`Could not find/use language file: ${langFilePath}: ${err}`)
    }  
    return ret
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
        // TODO: write json file for configuration/preferences
  }
}
