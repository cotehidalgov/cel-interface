import * as React from "react"
import { Component } from "react"
import QueryInput from "./QueryInput"
import QueryList from "./QueryList"
import ComplexEventContainer from "./ComplexEventContainer"
import { Row, Col, Label, Badge } from "react-bootstrap"
import { database, lorem, random, date } from "faker/locale/en_US"
import { max } from "moment"

export interface AppProps {}

export interface AppState {
  queries: { id: number; value: string; color: string; description: string }[]
  complexEvents: {
    id: number
    value: string
    queryId: number
    eventsId: number[]
  }[]
  showQueryInput: boolean
  showQueryList: boolean
}

class App extends React.Component<AppProps, AppState> {
  queryNumber: number = 10
  complexEventNumber: number = 13
  dataNumber: number = 5000

  information = this.createData(
    this.queryNumber,
    this.complexEventNumber,
    this.dataNumber,
  )

  state = {
    queries: this.information.queries,
    complexEvents: this.information.complexEvents,
    data: this.information.data,
    showQueryInput: true,
    showQueryList: true,
  }

  createData(
    queryNumber: number,
    complexEventNumber: number,
    dataNumber: number,
  ) {
    // Create Queries
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

    // Create Data
    let dataName
    let dataDate
    let data = []
    for (let index = 1; index < dataNumber; index++) {
      dataName = lorem.word()
      value = random.number()
      dataDate = date.past(5)
      data.push({ id: index, name: dataName, value: value, date: dataDate })
    }

    // Create Complex Events
    let queryId
    let complexEvents = []
    let queriesLength = queries.length
    let eventsId
    for (let index = 1; index < complexEventNumber; index++) {
      eventsId = []
      value = database.engine()
      queryId = queries[Math.floor(Math.random() * queriesLength)].id
      for (let number = 0; number < random.number(5) + 1; number++) {
        eventsId.push(data[Math.floor(Math.random() * data.length)].id)
      }
      complexEvents.push({
        id: index,
        value: value,
        queryId: queryId,
        eventsId: eventsId,
      })
    }

    let information = {
      queries: queries,
      complexEvents: complexEvents,
      data: data,
    }
    return information
  }

  getRandomColor() {
    let colorValues: string[] = [
      "#A0C0E8",
      "#939EAB",
      "#89A2C1",
      "#BFC4CB",
      "#9AC3F7",
      "#c0d6f9",
      "#c4c9d1",
      "#7e8a9e",
      "#bcbcbc",
      "#dbe7ff",
      "#6a83b5",
    ]

    return colorValues[Math.floor(Math.random() * colorValues.length)]
  }

  handleQuerySelection = (id: number) => {
    let showQueryInput = false
    if (id === 0) {
      showQueryInput = true
    }
    this.setState({ showQueryInput })
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

  // bug: press query and then ce
  handleComplexEventSelection = (id: number) => {
    let showQueryList = false
    let showQueryInput = false
    if (id === 0) {
      showQueryList = true
      showQueryInput = true
    }
    this.setState({ showQueryList })
    this.setState({ showQueryInput })
  }

  handleCreateComplexEvent = (queryId: number, value: string) => {
    const complexEvents = [...this.state.complexEvents]
    complexEvents.push({
      id: this.complexEventNumber++,
      value: value,
      queryId: queryId,
      eventsId: [],
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
            <h2 style={{ display: "-webkit-box" }}>
              <Label bsStyle="default">Query list</Label>
              <p>
                <Badge>{this.state.queries.length}</Badge>
              </p>
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
            show={this.state.showQueryList}
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
            data={this.state.data}
            onCreateComplexEvent={this.handleCreateComplexEvent}
            onComplexEventSelection={this.handleComplexEventSelection}
          />
        </Row>
      </div>
    )
  }
}

export default App
