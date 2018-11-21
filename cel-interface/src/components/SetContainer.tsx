import * as React from "react"
import {
  Label,
  ListGroup,
  Button,
  PanelGroup,
  Panel,
  Badge,
} from "react-bootstrap"
import ComplexEvent from "./ComplexEvent"
import Set from "./Set"

import QueryInput from "./QueryInput"
import { setInterval } from "timers"

export interface SetContainerProps {
  complexEvents: {
    id: number
    queryId: number
    eventsId: number[]
    setId: number
  }[]
  sets: { id: number; queryId: number }[]
  queries: { id: number; value: string; color: string }[]
  data: { id: number; name: string; value: number; date: Date }[]
  onCreateSet: (queryId: number, value: string) => void
  onSetSelection: (id: number) => void
}

export interface SetContainerState {
  sets: { id: number; queryId: number }[]
  activeKey: number
}

class SetContainer extends React.Component<
  SetContainerProps,
  SetContainerState
> {
  state = {
    sets: this.props.sets,
    activeKey: 0,
  }

  componentWillReceiveProps(props: SetContainerProps) {
    this.setState({ sets: props.sets })
  }

  handleSelection = (activeKey: number) => {
    if (this.state.activeKey != 0) {
      activeKey = 0
    }
    this.setState({ activeKey })
    this.props.onSetSelection(activeKey)
  }

  addComplexEvent = () => {
    // This method will be a listener
    // Params: queryId, value
    this.props.onCreateSet(1, "Complex Event")
  }

  getQueryValue = (id: number) => {
    let query = this.props.queries.filter(query => query.id == id)[0]
    if (query) {
      return query.value
    } else return null
  }

  getWidth = () => {
    if (this.state.activeKey === 0) {
      return ""
    }
    return "100%"
  }

  getHeight = () => {
    if (this.state.activeKey === 0) {
      return ""
    }
    return "100%"
  }

  renderPanels(set: { id: number; queryId: number }) {
    if (this.state.activeKey === set.id || this.state.activeKey === 0) {
      let isActive = this.state.activeKey === set.id
      return (
        <Panel
          eventKey={set.id}
          style={{
            display: "inline-block",
            margin: "5px",
            width: this.getWidth(),
            // position: isActive ? "absolute" : null,
          }}
        >
          <Panel.Heading
            style={{
              background: this.props.queries.filter(
                query => query.id == set.queryId,
              )[0].color,
            }}
          >
            <Panel.Title toggle>
              Set {set.id} for Query {set.queryId}
            </Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible style={{ minHeight: "40vh" }}>
            <Set
              id={set.id}
              queryValue={this.getQueryValue(set.queryId)}
              complexEvents={this.props.complexEvents}
              data={this.props.data}
            />
          </Panel.Body>
        </Panel>
      )
    } else return <div />
  }

  render() {
    return (
      <div>
        <h2 style={{ display: "-webkit-box" }}>
          <Label bsStyle="default">Sets</Label>
          <p>
            <Badge>{this.state.sets.length}</Badge>
          </p>
        </h2>

        <div
          className="pre-x-scrollable"
          style={{ height: "100%", width: "100%", overflow: "auto" }}
        >
          <PanelGroup
            accordion
            id="accordion-controlled-example"
            activeKey={this.state.activeKey}
            onSelect={this.handleSelection}
            style={{
              display: "inline-flex",
              // flexDirection: "row-reverse",
              width: this.getWidth(),
            }}
          >
            {this.state.sets.map(set => this.renderPanels(set))}
          </PanelGroup>
        </div>
        {/* <Button onClick={this.addComplexEvent}>Add Complex Event</Button> */}
      </div>
    )
  }
}

export default SetContainer
