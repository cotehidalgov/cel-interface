import * as React from "react"
import {
  Label,
  ListGroup,
  Button,
  PanelGroup,
  Panel,
  Badge,
  Nav,
  NavItem,
} from "react-bootstrap"
import ComplexEvent from "./ComplexEvent"
import Set from "./Set"

import QueryInput from "./QueryInput"
import { setInterval } from "timers"

export interface SetContainerProps {
  activeSetId: number
  queryId: number
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
  activeQueryKeyId: number
}

class SetContainer extends React.Component<
  SetContainerProps,
  SetContainerState
> {
  state = {
    sets: this.props.sets,
    activeKey: 0,
    activeQueryKeyId: 0,
  }

  componentWillReceiveProps(props: SetContainerProps) {
    this.setState({
      sets: props.sets,
      activeQueryKeyId: props.queryId,
      activeKey: props.activeSetId,
    })
  }

  handleSelection = (activeKey: number) => {
    if (this.state.activeKey == activeKey) {
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

  renderNavs(set: { id: number; queryId: number }) {
    if (
      this.state.activeQueryKeyId === set.queryId ||
      this.state.activeQueryKeyId === 0
    ) {
      return (
        <NavItem
          eventKey={set.id}
          style={{
            display: "inline-block",
            margin: "5px",
            width: "25vh",
            borderRadius: "4px",
            backgroundImage: this.props.queries.filter(
              query => query.id == set.queryId,
            )[0].color,
          }}
        >
          Set {set.id} for Query {set.queryId}
        </NavItem>
      )
    } else return <div />
  }

  render() {
    let sets = this.state.sets.filter(
      set =>
        set.queryId == this.state.activeQueryKeyId ||
        this.state.activeQueryKeyId === 0,
    )
    return (
      <div>
        <h2 style={{ display: "-webkit-box" }}>
          <Label bsStyle="default">Sets</Label>
          <p>
            <Badge>{sets.length}</Badge>
          </p>
        </h2>

        <div
          className="pre-x-scrollable"
          style={{ height: "100%", width: "100%", overflow: "auto" }}
        >
          <Nav
            bsStyle="pills"
            activeKey={this.state.activeKey}
            onSelect={this.handleSelection}
            style={{
              display: "inline-flex",
            }}
          >
            {sets.map(set => this.renderNavs(set))}
          </Nav>
        </div>
        {/* <Button onClick={this.addComplexEvent}>Add Complex Event</Button> */}
      </div>
    )
  }
}

export default SetContainer
