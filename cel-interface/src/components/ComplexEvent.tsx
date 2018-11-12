import * as React from "react"
import { ComplexEventContainerProps } from "./ComplexEventContainer"

export interface ComplexEventProps {
  value: string
  eventsId: number[]
  data: { id: number; name: string; value: number; date: Date }[]
}

export interface ComplexEventState {
  // eventsId: number[]
  // data: { id: number; name: string; value: number; date: Date }[]
  events: { id: number; name: string; value: number; date: Date }[]
}

class ComplexEvent extends React.Component<
  ComplexEventProps,
  ComplexEventState
> {
  events = this.getData()
  state = { events: this.events }

  getData() {
    let events = []
    let event
    for (let index = 0; index < this.props.eventsId.length; index++) {
      event = this.props.data[this.props.eventsId[index]]
      events.push(event)
    }
    events.sort(
      (e1, e2) =>
        e1.date.getDate() < e2.date.getDate()
          ? -1
          : e1.date.getDate() > e2.date.getDate()
            ? 1
            : 0,
    )
    return events
  }

  render() {
    return (
      <div>
        <p>Complex event {this.props.value}</p>
        <p>Events:</p>
        {this.state.events.map(event => (
          <div
          // style={{
          //   display: "inline-flex",
          //   flexDirection: "row-reverse",
          // }}
          >
            <h5>Event</h5>
            <p>Event name: {event.name}</p>
            <p>Event value: {event.value}</p>
            <p>Event date: {event.date.getDay()}</p>
          </div>
        ))}
      </div>
    )
  }
}

export default ComplexEvent
