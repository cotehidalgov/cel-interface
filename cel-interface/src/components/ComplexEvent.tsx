import * as React from "react"
import { ComplexEventContainerProps } from "./ComplexEventContainer"
import { Label, ListGroup, ListGroupItem } from "react-bootstrap"

export interface ComplexEventProps {
  value: string
  eventsId: number[]
  data: { id: number; name: string; value: number; date: Date }[]
}

export interface ComplexEventState {
  events: { id: number; name: string; value: number; date: Date }[]
}

class ComplexEvent extends React.Component<
  ComplexEventProps,
  ComplexEventState
> {
  events = this.getData()
  state = { events: this.events }

  getValueDate(date1: Date, date2: Date) {
    if (date1.getUTCFullYear() < date2.getUTCFullYear()) return -1
    else if (date1.getUTCFullYear() > date2.getUTCFullYear()) return 1
    else {
      if (date1.getUTCMonth() < date2.getUTCMonth()) return -1
      else if (date1.getUTCMonth() > date2.getUTCMonth()) return 1
      else {
        if (date1.getUTCDate() < date2.getUTCDate()) return -1
        else if (date1.getUTCDate() > date2.getUTCDate()) return 1
        else return 0
      }
    }
  }

  getData() {
    let events = []
    let event
    for (let index = 0; index < this.props.eventsId.length; index++) {
      event = this.props.data[this.props.eventsId[index]]
      events.push(event)
    }
    events.sort((e1, e2) => this.getValueDate(e1.date, e2.date))
    return events
  }

  getStringDate = (date: Date) => {
    return (
      date.getUTCDate().toString() +
      "/" +
      date.getUTCMonth().toString() +
      "/" +
      date.getUTCFullYear().toString()
    )
  }

  // Month: sometimes is 0

  render() {
    return (
      <div>
        <p>Complex event {this.props.value}</p>
        <h4>
          <Label bsStyle="default">Events</Label>
        </h4>
        <div className="pre-x-scrollable" style={{ overflow: "auto" }} />
        <ListGroup style={{ display: "inline-flex" }}>
          {this.state.events.map(event => (
            <ListGroupItem style={{ display: "inline-block", margin: "5px" }}>
              <h5>
                <Label bsStyle="default">{event.name}</Label>
              </h5>
              <p>Value: {event.value}</p>
              <p>Date: {this.getStringDate(event.date)}</p>
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    )
  }
}

export default ComplexEvent
