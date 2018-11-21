import * as React from "react"
import {
  Label,
  ListGroup,
  ListGroupItem,
  ButtonGroup,
  Button,
  Badge,
} from "react-bootstrap"
import ComplexEvent from "./ComplexEvent"

export interface SetProps {
  id: number
  queryValue: string
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

  getComplexEvents() {
    let complexEvents = this.props.complexEvents.filter(
      complexEvent => complexEvent.setId == this.props.id,
    )
    return complexEvents
  }

  getEvents(activeKey: number) {
    let complexEvents = this.state.complexEvents.filter(complexEvent => {
      console.log(complexEvent.id, complexEvent.eventsId)
      return complexEvent.id == activeKey
    })
    if (complexEvents[0]) return complexEvents[0].eventsId
    else return []
  }

  handleSelection(complexEventId: number) {
    let activeKey = complexEventId
    let activeEventsId
    let complexEvents = this.state.complexEvents.filter(complexEvent => {
      return complexEvent.id == activeKey
    })
    if (complexEvents[0]) {
      activeEventsId = complexEvents[0].eventsId
      this.setState({ activeEventsId })
      this.setState({ activeKey })
    }
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
    } else return <div />
  }

  render() {
    return (
      <div>
        <p>Query: {this.props.queryValue}</p>
        <h4 style={{ display: "-webkit-box" }}>
          <Label bsStyle="default">Complex Events:</Label>
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
                  height: "15vh",
                  display: "inline-block",
                }}
                onClick={() => this.handleSelection(complexEvent.id)}
              >
                Complex Event {complexEvent.id}
              </Button>
            ))}
          </ButtonGroup>
        </div>
        {this.renderComplexEvent()}
      </div>
    )
  }
}

export default Set
