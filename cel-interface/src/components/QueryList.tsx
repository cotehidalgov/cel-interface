import * as React from "react"
import Query from "./Query"
import { PanelGroup, Panel, Col } from "react-bootstrap"
import QueryInput from "./QueryInput"

export interface QueryListProps {
  queries: { id: number; value: string; color: string; description: string }[]
  onQuerySelection: (id: number) => void
  onDelete: (id: number) => void
}

export interface QueryListState {
  queries: { id: number; value: string; color: string }[]
  activeKey: number
}

class QueryList extends React.Component<QueryListProps, QueryListState> {
  state = {
    queries: this.props.queries,
    activeKey: 0,
  }

  componentWillReceiveProps(props: QueryListProps) {
    this.setState({ queries: props.queries })
  }

  handleSelection = (activeKey: number) => {
    if (this.state.activeKey != 0) {
      activeKey = 0
    }
    this.setState({ activeKey })
    this.props.onQuerySelection(activeKey)
  }

  handleDelete = (id: number) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      const activeKey = 0
      this.setState({ activeKey })
      this.props.onDelete(id)
    }
  }

  getStyles = () => {
    if (this.state.activeKey === 0) {
      return {}
    }
    let style = { width: "100%" }
    return style
  }

  renderPanel = (
    id: number,
    description: string,
    color: string,
    value: string,
  ) => {
    return (
      <div>
        <Panel eventKey={id}>
          <Panel.Heading>
            <Panel.Title toggle>
              {description}
              {id}
            </Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible style={{ height: "30vh" }}>
            <Query value={value} color={color} />
            <button
              onClick={() => this.handleDelete(id)}
              type="button"
              className="btn btn-danger pull-right"
            >
              Delete
            </button>
          </Panel.Body>
        </Panel>
      </div>
    )
  }

  renderPanels = (
    id: number,
    description: string,
    color: string,
    value: string,
  ) => {
    if (this.state.activeKey === id || this.state.activeKey === 0) {
      return (
        <div>
          <Panel eventKey={id}>
            <Panel.Heading>
              <Panel.Title toggle>{description}</Panel.Title>
            </Panel.Heading>
            <Panel.Body collapsible style={{ height: "40vh" }}>
              <Query value={value} color={color} />
              <button
                onClick={() => this.handleDelete(id)}
                type="button"
                className="btn btn-danger pull-right"
              >
                Delete
              </button>
            </Panel.Body>
          </Panel>
        </div>
      )
    } else return <div />
  }

  render() {
    return (
      <div>
        <Col sm={6} style={this.getStyles()}>
          <div className="pre-scrollable" style={{ height: "300px" }}>
            <PanelGroup
              accordion
              id="accordion-controlled-example"
              activeKey={this.state.activeKey}
              onSelect={this.handleSelection}
            >
              {this.state.queries.map(query => (
                <div>
                  {this.renderPanels(
                    query.id,
                    query.description,
                    query.color,
                    query.value,
                  )}
                </div>
              ))}
            </PanelGroup>
          </div>
        </Col>
      </div>
    )
  }
}

export default QueryList
