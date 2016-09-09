const context = require.context("../src", true, /\S+\/test\.js$/)
context.keys().forEach(context)
