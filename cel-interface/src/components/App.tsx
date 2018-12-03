import * as React from "react"
import { Component } from "react"
import QueryInput from "./QueryInput"
import QueryList from "./QueryList"
import SetContainer from "./SetContainer"
import Set from "./Set"

import { Row, Col, Label, Badge, Button } from "react-bootstrap"
import { database, lorem, random, date } from "faker/locale/en_US"
import { max } from "moment"

export interface AppProps {}

// complex event pasa a ser query con evento que gatillo
//  en el dia cuantas veces se ha gatillado ()
export interface AppState {
  activeQueryId: number
  activeSetId: number

  queries: { id: number; value: string; color: string; description: string }[]
  sets: { id: number; queryId: number }[]
  complexEvents: {
    id: number
    queryId: number
    eventsId: number[]
    setId: number
  }[]
  showQueryList: boolean
}

class App extends React.Component<AppProps, AppState> {
  queryNumber: number = 20
  setNumber: number = 100
  dataNumber: number = 5000

  information = this.createData(
    this.queryNumber,
    this.setNumber,
    this.dataNumber,
  )

  state = {
    activeQueryId: 0,
    activeSetId: 0,
    queries: this.information.queries,
    sets: this.information.sets,
    complexEvents: this.information.complexEvents,
    data: this.information.data,
    showQueryList: true,
  }

  createData(queryNumber: number, setNumber: number, dataNumber: number) {
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

    // Create Complex Events and sets
    let queryId
    let complexEvents = []
    let queriesLength = queries.length
    let dataLength = data.length
    let eventsId
    let eventsLength
    let sets = []
    let complexEventNumber
    let eventNumber
    let subEventsId

    for (let setIndex = 1; setIndex < setNumber; setIndex++) {
      eventsId = []
      queryId = queries[Math.floor(Math.random() * queriesLength)].id
      eventsLength = random.number(10) + 1
      for (let number = 0; number < eventsLength; number++) {
        eventsId.push(data[Math.floor(Math.random() * dataLength)].id)
      }
      complexEventNumber = random.number(eventsLength * eventsLength) + 2
      // For each complex Event that belongs to this set
      for (
        let complexEventIndex = 1;
        complexEventIndex < complexEventNumber;
        complexEventIndex++
      ) {
        eventNumber = random.number(eventsLength) + 1
        subEventsId = []
        for (let eventIndex = 0; eventIndex < eventNumber; eventIndex++) {
          subEventsId.push(eventsId[Math.floor(Math.random() * eventsLength)])
        }
        complexEvents.push({
          id: complexEventIndex,
          queryId: queryId,
          setId: setIndex,
          eventsId: subEventsId,
        })
      }

      sets.push({
        id: setIndex,
        queryId: queryId,
      })
    }

    let information = {
      queries: queries,
      sets: sets,
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
    let activeQueryId = id
    let activeSetId = 0

    this.setState({ activeQueryId, activeSetId })
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
    const sets = this.state.sets.filter(set => set.queryId != id)
    const queries = this.state.queries.filter(query => query.id != id)
    let activeQueryId = 0
    this.setState({ complexEvents, queries, sets, activeQueryId })
  }

  handleSetSelection = (id: number) => {
    let activeSetId = id
    this.setState({ activeSetId })
  }

  handleCreateSet = (queryId: number, value: string) => {
    // const complexEvents = [...this.state.complexEvents]
    // complexEvents.push({
    //   id: this.complexEventNumber++,
    //   queryId: queryId,
    //   eventsId: [],
    // })
    // this.setState({ complexEvents })
  }

  getQuery = (id: number) => {
    let query = this.state.queries.filter(query => query.id == id)[0]
    if (query) {
      return query
    } else return null
  }

  renderSetDescription() {
    let set = this.state.sets.filter(set => set.id == this.state.activeSetId)
    if (set.length != 0) {
      let query = this.state.queries.filter(
        query => query.id == set[0].queryId,
      )[0]
      if (query) {
        return (
          <Set
            id={set[0].id}
            queryValue={query.value}
            queryColor={query.color}
            complexEvents={this.state.complexEvents}
            data={this.state.data}
          />
        )
      } else return undefined
    } else {
      return undefined
    }
  }

  render() {
    return (
      <div className="container">
        <h1>
          <Label bsStyle="primary">CEL Interface</Label>
        </h1>
        <Row>
          <Col sm={6}>
            <QueryList
              activeQueryId={this.state.activeQueryId}
              onQuerySelection={this.handleQuerySelection}
              onCreateQuery={this.handleCreateQuery}
              onDelete={this.handleDeleteQuery}
              queries={this.state.queries}
              show={this.state.showQueryList}
            />
          </Col>
          <Col sm={6}>{this.renderSetDescription()}</Col>
        </Row>

        <Row>
          <SetContainer
            activeSetId={this.state.activeSetId}
            queryId={this.state.activeQueryId}
            complexEvents={this.state.complexEvents}
            sets={this.state.sets}
            queries={this.state.queries}
            data={this.state.data}
            onCreateSet={this.handleCreateSet}
            onSetSelection={this.handleSetSelection}
          />
        </Row>
      </div>
    )
  }
}

export default App
