import * as React from "react"

export interface ComplexEventProps {
  value: string
  color: string
}

export interface ComplexEventState {}

class ComplexEvent extends React.Component<
  ComplexEventProps,
  ComplexEventState
> {
  // state = { name: "Complex Event 1" }

  render() {
    return (
      <div>
        {this.props.value.split("\n").map(line => (
          <React.Fragment>
            <div style={{ width: "20vh" }}>
              {line} <br />
            </div>
          </React.Fragment>
        ))}
      </div>
    )
  }
}

export default ComplexEvent
