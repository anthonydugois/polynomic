const context = require.context("../packages", true, /\S+\/test\.js$/)
context.keys().forEach(context)
