import './commands'
import 'cypress-iframe'
import '@faker-js/faker'

import registerCypressGrep from 'cypress-grep'



Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

const env = Cypress.env()

Object.keys(env)
  .reduce((env, key) => {
    if (key.includes('.')) {
      const [parent, child] = key.split('.')
      if (!env[parent]) {
        env[parent] = {}
      }
      env[parent][child] = env[key]
      delete env[key]
    }
    return env
  }, env)

Cypress.env(env)

console.log(env)