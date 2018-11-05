import * as React from "react"
import { Label, ListGroup, Button, PanelGroup, Panel } from "react-bootstrap"
import ComplexEvent from "./ComplexEvent"
import QueryInput from "./QueryInput"
import { setInterval } from "timers"

export interface ComplexEventContainerProps {
  complexEvents: { id: number; value: string; queryId: number }[]
  queries: { id: number; value: string; color: string }[]
  onCreateComplexEvent: (queryId: number, value: string) => void
  onComplexEventSelection: (id: number) => void
}

export interface ComplexEventContainerState {
  complexEvents: { id: number; value: string; queryId: number }[]
  activeKey: number
}

class ComplexEventContainer extends React.Component<
  ComplexEventContainerProps,
  ComplexEventContainerState
> {
  state = { complexEvents: this.props.complexEvents, activeKey: 0 }

  componentWillReceiveProps(props: ComplexEventContainerProps) {
    this.setState({ complexEvents: props.complexEvents })
  }

  componentDidMount() {
    // const script = document.createElement("script")
    // script.type = "text/javascript"
    // script.async = true
    // s.innerHTML = "document.write('This is output by document.write()!')"
    // this.instance.appendChild(s)
    // function addDivs() {
    //   var cont = document.getElementsByClassName("container")[0]
    //   var str = '<div class="inner">Hi</div>'
    //   cont.innerHTML += str
    // }
    // setInterval(function() {
    //   addDivs()
    // }, 1000)
    // document.body.appendChild(script)
  }

  handleSelection = (activeKey: number) => {
    if (this.state.activeKey != 0) {
      activeKey = 0
    }
    this.setState({ activeKey })
    this.props.onComplexEventSelection(activeKey)
  }

  addComplexEvent = () => {
    // This method will be a listener
    // Params: queryId, value
    this.props.onCreateComplexEvent(1, "Complex Event")
  }

  // getStyles = () => {
  //   let style = {
  //     display: "inline-flex",
  //     // flexDirection: "row-reverse",
  //   }
  //   if (this.state.activeKey === 0) {
  //     return style
  //   }
  //   let style2 = {
  //     display: "inline-flex",
  //     flexDirection: "row-reverse",
  //     width: "100%",
  //     height: "100%",
  //   }
  //   return style2
  // }

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

  renderPanels(complexEvent: { id: number; queryId: number; value: string }) {
    if (
      this.state.activeKey === complexEvent.id ||
      this.state.activeKey === 0
    ) {
      return (
        <Panel
          eventKey={complexEvent.id}
          style={{
            display: "inline-block",
            margin: "5px",
            width: this.getWidth(),
          }}
        >
          <Panel.Heading
            style={{
              background: this.props.queries.filter(
                query => query.id == complexEvent.queryId,
              )[0].color,
            }}
          >
            <Panel.Title toggle>
              Complex Event {complexEvent.id} for Query {complexEvent.queryId}
            </Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible style={{ height: "40vh" }}>
            <ComplexEvent value={complexEvent.value} />
          </Panel.Body>
        </Panel>
      )
    } else return <div />
  }

  render() {
    return (
      <div>
        <h2>
          <Label bsStyle="default">Complex Events</Label>
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
              flexDirection: "row-reverse",
              width: this.getWidth(),
            }}
          >
            {this.state.complexEvents.map(complexEvent =>
              this.renderPanels(complexEvent),
            )}
          </PanelGroup>
        </div>
        <Button onClick={this.addComplexEvent}>Add Complex Event</Button>
      </div>
    )
  }
}

export default ComplexEventContainer
