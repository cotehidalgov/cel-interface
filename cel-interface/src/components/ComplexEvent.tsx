import * as React from "react"

export interface ComplexEventProps {
  value: string
}

export interface ComplexEventState {}

class ComplexEvent extends React.Component<
  ComplexEventProps,
  ComplexEventState
> {
  render() {
    return <div>{this.props.value}</div>
  }
}

export default ComplexEvent
