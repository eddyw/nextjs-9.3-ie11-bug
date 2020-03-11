module.exports = (_, config) => {
  config.webpack = (options) => {
    const originalEntry = options.entry
    options.entry = async () => {
      const entries = await originalEntry()

      if (entries['static/runtime/polyfills.js']) {
        console.log(require.resolve('core-js/stable'))
        entries['static/runtime/polyfills.js'] = [
          require.resolve('core-js/stable'),
          entries['static/runtime/polyfills.js'],
        ]
      }
      return entries;
    }
    return options
  }

  return config
}
