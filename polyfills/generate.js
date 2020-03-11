const path = require('path')
const fs = require('fs')

const {
  list,
  targets,
} = require('core-js-compat')({
  targets: 'IE 11',
  filter: /^(es|web)\./,
})

const modulesToPolyfill = Object
  .keys(targets)
  .map(moduleName => `import 'core-js/modules/${moduleName}'`)

modulesToPolyfill.push(`
// Specialized Packages:
import 'promise-polyfill/src/polyfill'
import 'whatwg-fetch/fetch'
import 'url-polyfill'
import assign from 'object-assign'
Object.assign = assign
`)

const POLYFILLS_OUT = path.resolve(__dirname, 'polyfill-nomodule.js')

fs.writeFileSync(POLYFILLS_OUT, modulesToPolyfill.join('\n'), { encoding: 'utf-8' })
