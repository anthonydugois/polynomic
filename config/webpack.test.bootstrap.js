const context = require.context("../packages", true, /\S+\/test\/\S+\.js$/)
context.keys().forEach(context)
