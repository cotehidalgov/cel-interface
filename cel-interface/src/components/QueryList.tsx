import * as React from "react"
import Query from "./Query"
import { Label, ListGroup, ListGroupItem, Button } from "react-bootstrap"
// import { Component } from 'react';

export interface QueryListProps {
  queries: { id: number; value: string }[]
  onDelete: (id: number) => void
}

export interface QueryListState {
  queries: { id: number; value: string }[]
}

class QueryList extends React.Component<QueryListProps, QueryListState> {
  state = {
    queries: this.props.queries,
  }

  componentWillReceiveProps(props: QueryListProps) {
    this.setState({ queries: props.queries })
  }

  handleDelete = (id: number) => {
    this.props.onDelete(id)
  }

  render() {
    return (
      <div>
        <h2>
          <Label bsStyle="default">Query list</Label>
        </h2>

        <div className="pre-scrollable" style={{ height: "40vh" }}>
          <ListGroup>
            {this.state.queries.map((query, idx) => (
              <a href="#" className="list-group-item" key={query.id}>
                <button
                  onClick={() => this.handleDelete(query.id)}
                  type="button"
                  className="btn btn-danger pull-right"
                >
                  Delete
                </button>
                <h4 className="list-group-item-heading">Query {query.id}</h4>
                <p className="list-group-item-text">
                  <Query value={query.value} />
                </p>
              </a>
            ))}
          </ListGroup>
        </div>
      </div>
    )
  }
}

export default QueryList
