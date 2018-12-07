import * as React from "react"
import { Component } from "react"
import QueryInput from "./QueryInput"
import QueryList from "./QueryList"
import SetContainer from "./SetContainer"
import Set from "./Set"

import { Row, Col, Label, Badge, Button } from "react-bootstrap"
import { database, lorem, random, date } from "faker/locale/en_US"
import { max } from "moment"
import Query from "./Query"

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
  queryNumber: number = 5
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
    let queryValues = [
      "SELECT follower_id \n FROM Tweets, Follows \n WHERE (T; F) \n FILTER T[content LIKE ‘%#VoteOption1%’] \n PARTITION BY [tweeter_id, followee_id] \n WITHIN 2 seconds",
      "SELECT LAST tweeter_id, follower_id \n FROM Retweets, Follows \n WHERE (((R; F) OR (F; R)); U) \n PARTITION BY [retweeter_id, follower_id], \n [tweeter_id, followee_id]",
    ]
    // Create Queries
    let value
    let description
    let color
    let queries = []
    for (let index = 1; index < queryNumber; index++) {
      value = queryValues[0]
      description = lorem.sentence()
      color = this.getRandomColor()
      queries.push({
        id: index,
        value: value,
        description: description,
        color: color,
      })
    }

    for (let index = queryNumber; index < queryNumber * 2; index++) {
      value = queryValues[1]
      description = lorem.sentence()
      color = this.getRandomColor()
      queries.push({
        id: index,
        value: value,
        description: description,
        color: color,
      })
    }

    let streamNames = ["Tweet", "Follow", "Retweet", "Like"]
    // Create Data
    let dataName
    let dataDate
    let data = []
    for (let index = 1; index < dataNumber; index++) {
      dataName = streamNames[Math.floor(Math.random() * streamNames.length)]

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
    if (window.confirm("Are you sure you wish to delete this item?")) {
      const activeQueryId = 0
      const complexEvents = this.state.complexEvents.filter(
        complexEvent => complexEvent.queryId != id,
      )
      const sets = this.state.sets.filter(set => set.queryId != id)
      const queries = this.state.queries.filter(query => query.id != id)
      this.setState({ complexEvents, queries, sets, activeQueryId })
    }
  }

  handleSetSelection = (id: number) => {
    let activeSetId = id
    this.setState({ activeSetId })
  }

  handleCreateSet = (queryId: number, value: string) => {}

  getQuery = (id: number) => {
    let query = this.state.queries.filter(query => query.id == id)[0]
    if (query) {
      return query
    } else return null
  }

  renderQueryDescription() {
    let query = this.state.queries.filter(
      query => query.id == this.state.activeQueryId,
    )[0]
    if (query && this.state.activeSetId == 0) {
      return (
        <div
          style={{
            background: "#F5F5F5",
            borderRadius: "4px",
            paddingLeft: "5px",
          }}
        >
          <h2
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Label bsStyle="default">Query description</Label>
            <button
              onClick={() => this.handleDeleteQuery(query.id)}
              type="button"
              style={{ position: "absolute", right: "0px" }}
              className="btn btn-danger "
            >
              Delete
            </button>
          </h2>
          <br />
          <Query value={query.value} color={query.color} />
          <br />
          <h4>
            <Label bsStyle="default">Statistics</Label>
          </h4>
          <p>New results 5 times a day</p>
        </div>
      )
    } else {
      return undefined
    }
  }

  renderSetDescription() {
    let set = this.state.sets.filter(set => set.id == this.state.activeSetId)[0]
    if (set) {
      let query = this.state.queries.filter(query => query.id == set.queryId)[0]
      if (query) {
        return (
          <Set
            id={set.id}
            queryValue={query.value}
            queryId={query.id}
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

  // Al apretar query, que aparsca query description con estadisticas
  // Luego de eso, poder apretar query y vovler a query description
  // Poner datos más bonitos

  render() {
    return (
      <div className="container">
        <h1>
          <Label bsStyle="primary">CEL Interface</Label>
        </h1>
        <Row>
          <Col sm={3}>
            <QueryList
              activeQueryId={this.state.activeQueryId}
              onQuerySelection={this.handleQuerySelection}
              onCreateQuery={this.handleCreateQuery}
              onDelete={this.handleDeleteQuery}
              queries={this.state.queries}
              show={this.state.showQueryList}
            />
          </Col>
          <Col sm={9}>
            <Row style={{ paddingLeft: "10px" }}>
              {this.renderQueryDescription()}
            </Row>
            <Row style={{ paddingLeft: "10px" }}>
              {this.renderSetDescription()}
            </Row>
          </Col>
        </Row>

        <Row />

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
