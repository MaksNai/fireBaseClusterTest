import { Component } from 'react'

interface testDataClass {
  taskText: string
  taskCompleted: boolean
}

export class Greeting extends Component {
//   constructor(props: testDataClass) {
//     super(props)
//     this.state = {}
//   }

  state: Readonly<{}> = {}

  render() {
    return <h1>Hello!</h1>
  }
}
