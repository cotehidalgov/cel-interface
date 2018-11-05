import * as React from "react"
import { Component } from "react"
import QueryInput from "./QueryInput"
import QueryList from "./QueryList"
import ComplexEventContainer from "./ComplexEventContainer"
import { Row, Col, Label } from "react-bootstrap"
import { database, lorem, commerce } from "faker/locale/en_US"

export interface AppProps {}

export interface AppState {
  queries: { id: number; value: string; color: string; description: string }[]
  complexEvents: { id: number; value: string; queryId: number }[]
  showQueryInput: boolean
}

class App extends React.Component<AppProps, AppState> {
  queryNumber: number = 6
  complexEventsNumber: number = 13

  data = this.createData()

  state = {
    queries: this.data.queries,
    complexEvents: this.data.complexEvents,
    showQueryInput: true,
  }

  createData() {
    let queryNumber = 10
    let value
    let description
    let color
    let queries = []
    for (let index = 1; index < queryNumber; index++) {
      value = database.engine()
      description = lorem.sentence()
      color = this.getRandomColor()
      queries.push({
        id: index,
        value: value,
        description: description,
        color: color,
      })
    }

    let complexEventNumber = 13
    let queryId
    let complexEvents = []
    let queriesLength = queries.length
    for (let index = 1; index < complexEventNumber; index++) {
      value = database.engine()
      queryId = queries[Math.floor(Math.random() * queriesLength)].id
      complexEvents.push({
        id: index,
        value: value,
        queryId: queryId,
      })
    }

    let data = { queries: queries, complexEvents: complexEvents }
    return data
  }

  getRandomColor() {
    let colorValues: string[] = [
      "#A0C0E8",
      "#939EAB",
      "#89A2C1",
      "#BFC4CB",
      "#9AC3F7",
    ]

    return colorValues[Math.floor(Math.random() * colorValues.length)]
  }

  handleShowQueryInput = () => {
    if (!this.state.showQueryInput) {
      const showQueryInput = true
      this.setState({ showQueryInput })
      console.log(this.state.showQueryInput)
    }
  }

  handleCreateQuery = (queryInput: string, queryDescription: string) => {
    const queries = [...this.state.queries]
    queries.push({
      id: this.queryNumber++,
      value: queryInput,
      color: this.getRandomColor(),
      description: queryDescription,
    })
    this.setState({ queries })
  }

  handleQuerySelection = (id: number) => {
    let showQueryInput = false
    if (id === 0) {
      showQueryInput = true
    }
    this.setState({ showQueryInput })
  }

  handleDeleteQuery = (id: number) => {
    const complexEvents = this.state.complexEvents.filter(
      complexEvent => complexEvent.queryId != id,
    )
    const queries = this.state.queries.filter(query => query.id != id)
    const showQueryInput = true

    this.setState({ complexEvents })
    this.setState({ queries })
    this.setState({ showQueryInput })
  }

  handleCreateComplexEvent = (queryId: number, value: string) => {
    const complexEvents = [...this.state.complexEvents]
    complexEvents.push({
      id: this.complexEventsNumber++,
      value: value,
      queryId: queryId,
    })
    this.setState({ complexEvents })
  }

  render() {
    return (
      <div className="container">
        <h1>
          <Label bsStyle="primary">CEL Interface</Label>
        </h1>

        <Row>
          <Col sm={6}>
            <h2>
              <Label bsStyle="default">Query list</Label>
            </h2>
          </Col>
          <Col sm={6}>
            <h2>
              <Label bsStyle="default">Write your Query!</Label>
            </h2>
          </Col>
        </Row>
        <Row>
          <QueryList
            onQuerySelection={this.handleQuerySelection}
            onDelete={this.handleDeleteQuery}
            queries={this.state.queries}
          />
          <QueryInput
            onCreateQuery={this.handleCreateQuery}
            show={this.state.showQueryInput}
          />
        </Row>

        <Row>
          <ComplexEventContainer
            complexEvents={this.state.complexEvents}
            queries={this.state.queries}
            onCreateComplexEvent={this.handleCreateComplexEvent}
          />
        </Row>
      </div>
    )
  }
}

export default App
