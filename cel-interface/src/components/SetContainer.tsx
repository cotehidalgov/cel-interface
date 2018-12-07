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
  ButtonGroup,
  OverlayTrigger,
  Tooltip,
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

  handleSelection(activeKey: number) {
    if (this.state.activeKey == activeKey) {
      activeKey = 0
    }
    this.setState({ activeKey })
    this.props.onSetSelection(activeKey)
  }

  renderTitle() {
    if (this.state.activeQueryKeyId != 0)
      return "for Query number " + this.state.activeQueryKeyId.toString()
    else return ""
  }

  renderNavs(set: { id: number; queryId: number }) {
    if (
      this.state.activeQueryKeyId === set.queryId ||
      this.state.activeQueryKeyId === 0
    ) {
      return (
        <Button
          key={set.id}
          onClick={() => this.handleSelection(set.id)}
          style={{
            background: this.props.queries.filter(
              query => query.id == set.queryId,
            )[0].color,
            display: "inline-block",
            margin: "5px",
            height: "10vh",
            borderRadius: "4px",
          }}
        >
          Set {set.id} for Query {set.queryId}
        </Button>
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
          <Label bsStyle="default">Sets {this.renderTitle()}</Label>
          <p>
            <Badge>{sets.length}</Badge>
          </p>
        </h2>

        <div
          className="pre-x-scrollable"
          style={{ height: "100%", width: "100%", overflow: "auto" }}
        >
          <ButtonGroup
            style={{
              display: "inline-flex",
            }}
          >
            {sets.map(set => this.renderNavs(set))}
          </ButtonGroup>
        </div>
      </div>
    )
  }
}

export default SetContainer
