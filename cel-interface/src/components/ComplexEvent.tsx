import * as React from "react"
import { Label, ListGroup, ListGroupItem, Badge } from "react-bootstrap"

export interface ComplexEventProps {
  id: number
  eventsId: number[]
  data: { id: number; name: string; value: number; date: Date }[]
}

export interface ComplexEventState {
  id: number
  events: { id: number; name: string; value: number; date: Date }[]
  activeKey: number
}

class ComplexEvent extends React.Component<
  ComplexEventProps,
  ComplexEventState
> {
  events = this.getData(this.props)
  state = { id: this.props.id, events: this.events, activeKey: 0 }

  componentWillReceiveProps(props: ComplexEventProps) {
    console.log(props.id)
    if (this.props.id != props.id) {
      this.setState({ events: this.getData(props), id: props.id })
    }
  }

  getData(props: ComplexEventProps) {
    let events = []
    let event
    for (let index = 0; index < props.eventsId.length; index++) {
      event = this.props.data[props.eventsId[index]]
      events.push(event)
    }
    events.sort((e1, e2) => this.getValueDate(e1.date, e2.date))
    return events
  }

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
        <h4 style={{ display: "-webkit-box" }}>
          <Label bsStyle="default">
            Events for Complex Event {this.props.id}
          </Label>
          <p>
            <Badge>{this.state.events.length}</Badge>
          </p>
        </h4>
        <div className="pre-x-scrollable" style={{ overflow: "auto" }}>
          <ListGroup style={{ display: "inline-flex" }}>
            {this.state.events.map(event => (
              <ListGroupItem
                style={{
                  display: "inline-block",
                  margin: "5px",
                  width: "140px",
                  height: "130px",
                }}
              >
                <h5>
                  <Label bsStyle="default">{event.name}</Label>
                </h5>
                <p>Value: {event.value}</p>
                <p>Date: {this.getStringDate(event.date)}</p>
              </ListGroupItem>
            ))}
          </ListGroup>
        </div>
      </div>
    )
  }
}

export default ComplexEvent
