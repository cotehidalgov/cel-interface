import * as React from "react"
import {
  Label,
  ListGroup,
  ListGroupItem,
  ButtonGroup,
  Button,
  Badge,
  OverlayTrigger,
  Tooltip,
  Row,
} from "react-bootstrap"
import ComplexEvent from "./ComplexEvent"

export interface SetProps {
  id: number
  queryValue: string
  queryId: number
  queryColor: string
  complexEvents: {
    id: number
    queryId: number
    eventsId: number[]
    setId: number
  }[]
  data: { id: number; name: string; value: number; date: Date }[]
}

export interface SetState {
  complexEvents: {
    id: number
    queryId: number
    eventsId: number[]
    setId: number
  }[]
  activeEventsId: number[]
  activeKey: number
}

class Set extends React.Component<SetProps, SetState> {
  complexEvents = this.getComplexEvents()

  state = {
    complexEvents: this.complexEvents,
    activeEventsId: [0],
    activeKey: 0,
  }

  componentWillReceiveProps(props: SetProps) {
    this.setState({
      complexEvents: props.complexEvents.filter(
        complexEvent => complexEvent.setId == props.id,
      ),
      activeKey: 0,
    })
  }

  getComplexEvents() {
    let complexEvents = this.props.complexEvents.filter(
      complexEvent => complexEvent.setId == this.props.id,
    )
    return complexEvents
  }

  // getEvents(activeKey: number) {
  //   let complexEvents = this.state.complexEvents.filter(complexEvent => {
  //     return complexEvent.id == activeKey
  //   })
  //   if (complexEvents[0]) return complexEvents[0].eventsId
  //   else return []
  // }

  handleSelection(activeKey: number) {
    if (this.state.activeKey == activeKey) {
      activeKey = 0
    }
    let activeEventsId
    let setComplexEvent = this.state.complexEvents.filter(complexEvent => {
      return complexEvent.id == activeKey
    })[0]

    if (setComplexEvent) {
      activeEventsId = setComplexEvent.eventsId
      this.setState({ activeEventsId })
    }
    this.setState({ activeKey })
  }

  renderComplexEvent() {
    if (this.state.activeKey != 0) {
      return (
        <ComplexEvent
          id={this.state.activeKey}
          eventsId={this.state.activeEventsId}
          data={this.props.data}
        />
      )
    } else return undefined
  }

  getEvents = (eventsId: number[]) => {
    let events = this.props.data.filter(event => {
      eventsId.forEach(id => {
        if (id == event.id) return true
        return false
      })
    })
    return events
  }

  getComplexEventTimes() {
    let times: Date[] = []
    this.complexEvents.map(complexEvent => {
      let events = this.getEvents(complexEvent.eventsId)
      let lastEvent = events[events.length - 1]
      times.push(lastEvent.date)
    })
  }

  renderStatistics() {
    if (this.state.activeKey == 0) {
      return (
        <div>
          <h4>
            <Label bsStyle="default">Statistics</Label>
          </h4>
          <p>Five times a day</p>
        </div>
      )
    } else return undefined
  }

  render() {
    return (
      <div
        style={{
          background: "#F5F5F5",
          borderRadius: "4px",
          paddingLeft: "5px",
        }}
      >
        <h2>
          <Label bsStyle="default">
            Set description for Query {this.props.queryId}
          </Label>
        </h2>
        <br />

        <h4 style={{ display: "-webkit-box" }}>
          <Label bsStyle="default">Complex Events</Label>
          <p>
            <Badge>{this.state.complexEvents.length}</Badge>
          </p>
        </h4>
        <div
          className="pre-x-scrollable"
          style={{ overflow: "auto", width: "100%" }}
        >
          <ButtonGroup style={{ display: "inline-flex" }}>
            {this.state.complexEvents.map(complexEvent => (
              <Button
                style={{
                  margin: "5px",
                  height: "50px",
                  display: "inline-block",
                  background: this.props.queryColor,
                }}
                key={complexEvent.id}
                onClick={() => this.handleSelection(complexEvent.id)}
              >
                Complex Event {complexEvent.id}
              </Button>
            ))}
          </ButtonGroup>
        </div>
        {this.renderComplexEvent()}
        {this.renderStatistics()}
      </div>
    )
  }
}

export default Set
