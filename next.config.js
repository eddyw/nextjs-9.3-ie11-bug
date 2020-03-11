const path = require('path')

const POLYFILL_NOMODULE = path.resolve(
  __dirname,
  'polyfills',
  'polyfill-nomodule.js'
)

module.exports = (_, config) => {
  config.webpack = (options) => {
    const originalEntry = options.entry
    options.entry = async () => {
      const entries = await originalEntry()

      if (entries['static/runtime/polyfills.js']) {
        entries['static/runtime/polyfills.js'] = [
          POLYFILL_NOMODULE,
        ]
      }
      return entries;
    }
    return options
  }

  return config
}
