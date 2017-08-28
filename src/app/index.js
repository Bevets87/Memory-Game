import Model from './model'
import Controller from './controller'
import View from './view'

function App () {
  var self = this

  self.model = new Model()
  self.view = new View()
  self.controller = new Controller(self.model, self.view)
}

export default App
