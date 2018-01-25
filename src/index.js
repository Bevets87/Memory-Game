import Model from './app/model'
import Controller from './app/controller'
import View from './app/view'

import './theme/index.scss'

class App {
  constructor () {
    this.model = new Model()
    this.view = new View()
    this.controller = new Controller(this.model, this.view)
  }
}

new App()
