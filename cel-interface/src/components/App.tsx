import * as React from "react"
import { Component } from "react"
import QueryInput from "./QueryInput"
import QueryList from "./QueryList"
import ComplexEventContainer from "./ComplexEventContainer"
import { Row, Col, Label } from "react-bootstrap"

export interface AppProps {}

export interface AppState {
  queries: { id: number; value: string; color: string }[]
  complexEvents: { id: number; value: string; queryId: number }[]
}

class App extends React.Component<AppProps, AppState> {
  queryNumber: number = 6
  complexEventsNumber: number = 13

  state = {
    queries: [
      { id: 1, value: "SELECT ALL T FROM STREAM", color: "#A0C0E8" },
      { id: 2, value: "SELECT ANY (H, T) FROM STREAM", color: "#939EAB" },
      { id: 3, value: "SELECT ALL (H, T) FROM STREAM", color: "#89A2C1" },
      { id: 4, value: "SELECT T FROM STREAM", color: "#BFC4CB" },
      { id: 5, value: "SELECT MAX T FROM STREAM", color: "#9AC3F7" },
    ],
    complexEvents: [
      { id: 1, value: "ComplexEvent 1", queryId: 1 },
      { id: 2, value: "ComplexEvent 2", queryId: 2 },
      { id: 3, value: "ComplexEvent 3", queryId: 3 },
      { id: 4, value: "ComplexEvent 4", queryId: 4 },
      { id: 5, value: "ComplexEvent 5", queryId: 5 },
      { id: 6, value: "ComplexEvent 6", queryId: 5 },
      { id: 7, value: "ComplexEvent 7", queryId: 4 },
      { id: 8, value: "ComplexEvent 8", queryId: 2 },
      { id: 9, value: "ComplexEvent 9", queryId: 1 },
      { id: 10, value: "ComplexEvent 10", queryId: 3 },
      { id: 11, value: "ComplexEvent 11", queryId: 2 },
      { id: 12, value: "ComplexEvent 12", queryId: 4 },
    ],
  }

  handleCreateQuery = (queryInput: string) => {
    const queries = [...this.state.queries]
    queries.push({
      id: this.queryNumber++,
      value: queryInput,
      color: "#BFC4CB",
    })
    this.setState({ queries })
  }

  handleDeleteQuery = (id: number) => {
    const queries = this.state.queries.filter(query => query.id != id)
    this.setState({ queries })
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
            <QueryInput onCreateQuery={this.handleCreateQuery} />
          </Col>
          <Col sm={6}>
            <QueryList
              onDelete={this.handleDeleteQuery}
              queries={this.state.queries}
            />
          </Col>
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
