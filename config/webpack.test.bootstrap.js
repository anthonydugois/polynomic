const context = require.context("../lib", true, /\S+\/test\.js$/)
context.keys().forEach(context)
