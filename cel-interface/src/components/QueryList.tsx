import * as React from "react"
import Query from "./Query"
import { PanelGroup, Panel, Col, Badge } from "react-bootstrap"
import QueryInput from "./QueryInput"

export interface QueryListProps {
  queries: { id: number; value: string; color: string; description: string }[]
  onQuerySelection: (id: number) => void
  onDelete: (id: number) => void
  show: boolean
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

  renderPanels = (query: {
    id: number
    description: string
    value: string
    color: string
  }) => {
    if (this.state.activeKey === query.id || this.state.activeKey === 0) {
      return (
        <div>
          <Panel eventKey={query.id}>
            <Panel.Heading
              style={{
                background: this.props.queries.filter(q => q.id == query.id)[0]
                  .color,
              }}
            >
              <Panel.Title toggle>{query.description}</Panel.Title>
            </Panel.Heading>
            <Panel.Body collapsible style={{ height: "35vh" }}>
              <Query value={query.value} color={query.color} />
              <button
                onClick={() => this.handleDelete(query.id)}
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

  renderQueryList() {
    if (this.props.show) {
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
                {this.state.queries.map(query => this.renderPanels(query))}
              </PanelGroup>
            </div>
          </Col>
        </div>
      )
    } else return <div />
  }

  render() {
    return this.renderQueryList()
  }
}

export default QueryList
