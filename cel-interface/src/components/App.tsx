import * as React from "react"
import { Component } from "react"
import QueryInput from "./QueryInput"
import QueryList from "./QueryList"
import ComplexEventContainer from "./ComplexEventContainer"
import { Row, Col, Label } from "react-bootstrap"

export interface AppProps {}

export interface AppState {
  queries: { id: number; value: string }[]
  complexEvents: { id: number; value: string }[]
}

class App extends React.Component<AppProps, AppState> {
  idNumber: number = 6
  state = {
    queries: [
      { id: 1, value: "Query 1" },
      { id: 2, value: "Query 2" },
      { id: 3, value: "Query 3" },
      { id: 4, value: "Query 4" },
      { id: 5, value: "Query 5" },
    ],
    complexEvents: [
      { id: 1, value: "ComplexEvent 1" },
      { id: 2, value: "ComplexEvent 2" },
      { id: 3, value: "ComplexEvent 3" },
      { id: 4, value: "ComplexEvent 4" },
      { id: 5, value: "ComplexEvent 5" },
      { id: 6, value: "ComplexEvent 6" },
      { id: 7, value: "ComplexEvent 7" },
      { id: 8, value: "ComplexEvent 8" },
      { id: 9, value: "ComplexEvent 9" },
      { id: 10, value: "ComplexEvent 2" },
      { id: 11, value: "ComplexEvent 2" },
      { id: 12, value: "ComplexEvent 2" },
    ],
  }

  handleCreateQuery = (queryInput: string) => {
    const queries = [...this.state.queries]
    queries.push({ id: this.idNumber++, value: queryInput })
    this.setState({ queries })
  }

  handleDeleteQuery = (id: number) => {
    const queries = this.state.queries.filter(query => query.id != id)
    this.setState({ queries })
  }

  render() {
    return (
      <div className="container">
        <h1>
          <Label bsStyle="info">CEL Interface</Label>
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
          <ComplexEventContainer complexEvents={this.state.complexEvents} />
        </Row>
      </div>
    )
  }
}

export default App
