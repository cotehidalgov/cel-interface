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

  getEvents(activeKey: number) {
    let complexEvents = this.state.complexEvents.filter(complexEvent => {
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

    if (complexEvents.length != 0) {
      activeEventsId = complexEvents[0].eventsId
      this.setState({ activeEventsId, activeKey })
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
    } else return undefined
  }

  render() {
    return (
      <div>
        <h2>
          <Label bsStyle="default">Set description</Label>
        </h2>
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
      </div>
    )
  }
}

export default Set
