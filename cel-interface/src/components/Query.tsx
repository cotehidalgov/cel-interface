import * as React from "react"

export interface QueryProps {
  value: string
}

export interface QueryState {}

class Query extends React.Component<QueryProps, QueryState> {
  render() {
    return (
      <div>
        {this.props.value.split("\n").map(line => (
          <React.Fragment>
            {line} <br />
          </React.Fragment>
        ))}
      </div>
    )
  }
}

export default Query
