// import {inspect} from 'util'
//
// export function inspectResponse(response: any) {
//   return inspect(response, { showHidden: false, depth: null, colors: true })
// }
//
import * as fs from 'fs'

export function generateConfig(filePath: string) {
  const config = fs.readFileSync(filePath).toString()
  return JSON.parse(config)
}

export function exists(path: string): Promise<boolean> {
    return new Promise(resolve => resolve(fs.existsSync(path)))
}

export function loadJSON(path: string): Promise<any> {
    // debug('loadJSON %s', path)
    // let loadJSON
    // try { loadJSON = require('load-json-file') } catch {}
    // if (loadJSON) return loadJSON.sync(path)
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, d) => {
            try {
                if (err) reject(err)
                else resolve(JSON.parse(d))
            } catch (error) {
                reject(error)
            }
        })
    })
}