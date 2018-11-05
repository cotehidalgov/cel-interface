import * as React from "react"
import { Label, ListGroup, Button } from "react-bootstrap"
import ComplexEvent from "./ComplexEvent"
import QueryInput from "./QueryInput"
import { setInterval } from "timers"

export interface ComplexEventContainerProps {
  complexEvents: { id: number; value: string; queryId: number }[]
  queries: { id: number; value: string; color: string }[]
  onCreateComplexEvent: (queryId: number, value: string) => void
}

export interface ComplexEventContainerState {
  complexEvents: { id: number; value: string; queryId: number }[]
}

class ComplexEventContainer extends React.Component<
  ComplexEventContainerProps,
  ComplexEventContainerState
> {
  state = { complexEvents: this.props.complexEvents }

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

  addComplexEvent = () => {
    // This method will be a listener
    // Params: queryId, value
    this.props.onCreateComplexEvent(1, "Complex Event")
  }

  render() {
    return (
      <div>
        <h2>
          <Label bsStyle="default">Complex Events</Label>
        </h2>

        <div
          className="pre-x-scrollable"
          style={{ height: "100px", width: "100%", overflow: "auto" }}
        >
          <ListGroup
            style={{
              display: "inline-flex",
              flexDirection: "row-reverse",
            }}
          >
            {this.state.complexEvents.map((complexEvent, idx) => (
              <a
                href="#"
                className="list-group-item"
                style={{
                  display: "inline-block",
                  margin: "5px",
                  background: this.props.queries.filter(
                    query => query.id == complexEvent.queryId,
                  )[0].color,
                }}
                key={complexEvent.id}
              >
                <h4 className="list-group-item-heading">
                  Complex Event {complexEvent.id} for Query{" "}
                  {complexEvent.queryId}
                </h4>
                <p className="list-group-item-text">
                  <ComplexEvent value={complexEvent.value} />
                </p>
              </a>
            ))}
          </ListGroup>
        </div>
        <Button onClick={this.addComplexEvent}>Add Complex Event</Button>
      </div>
    )
  }
}

export default ComplexEventContainer
