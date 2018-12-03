import * as React from "react"
import Query from "./Query"
import {
  PanelGroup,
  Panel,
  Col,
  Badge,
  Nav,
  NavItem,
  Label,
  Button,
} from "react-bootstrap"
import QueryInput from "./QueryInput"

export interface QueryListProps {
  activeQueryId: number
  queries: { id: number; value: string; color: string; description: string }[]
  onQuerySelection: (id: number) => void
  onCreateQuery: (queryInput: string, queryDescription: string) => void
  onDelete: (id: number) => void
  show: boolean
}

export interface QueryListState {
  queries: { id: number; value: string; color: string }[]
  activeKey: number
  showQueryInput: boolean
}

class QueryList extends React.Component<QueryListProps, QueryListState> {
  state = {
    queries: this.props.queries,
    activeKey: 0,
    showQueryInput: false,
  }

  componentWillReceiveProps(props: QueryListProps) {
    this.setState({ queries: props.queries, activeKey: props.activeQueryId })
  }

  handleSelection = (activeKey: number) => {
    console.log(activeKey)
    if (this.state.activeKey == activeKey) {
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

  handleCreateQuery = (queryInput: string, queryDescription: string) => {
    this.props.onCreateQuery(queryInput, queryDescription)
  }

  renderQueryDescription() {
    let query = this.state.queries.filter(
      query => query.id == this.state.activeKey,
    )
    if (query.length != 0) {
      return (
        <div>
          <h2>
            <Label bsStyle="default">Query description</Label>
          </h2>
          <Query value={query[0].value} color={query[0].color} />
          <button
            onClick={() => this.handleDelete(query[0].id)}
            type="button"
            className="btn btn-danger pull-right"
          >
            Delete
          </button>
        </div>
      )
    } else {
      return <div />
    }
  }

  render() {
    let queryInputClose = () => this.setState({ showQueryInput: false })

    if (this.props.show) {
      return (
        <div>
          <Col sm={6}>
            <h2 style={{ display: "-webkit-box" }}>
              <Label bsStyle="default">Query list</Label>
              <p>
                <Badge>{this.state.queries.length}</Badge>
              </p>
              <Button
                bsStyle="default"
                style={{ position: "absolute", right: "0px" }}
                onClick={() => this.setState({ showQueryInput: true })}
              >
                Add query
              </Button>
            </h2>
            <div className="pre-scrollable" style={{ height: "300px" }}>
              <Nav
                bsStyle="pills"
                stacked={true}
                activeKey={this.state.activeKey}
                onSelect={this.handleSelection}
              >
                {this.state.queries.map((query, index) => (
                  <NavItem
                    eventKey={query.id}
                    style={{
                      borderRadius: "4px",
                      backgroundImage: this.props.queries.filter(
                        q => q.id == query.id,
                      )[0].color,
                    }}
                  >
                    {/* {index++} */}

                    {query.description}
                  </NavItem>
                ))}
              </Nav>
            </div>
          </Col>
          <Col sm={6}>{this.renderQueryDescription()}</Col>
          <QueryInput
            show={this.state.showQueryInput}
            onHide={queryInputClose}
            onCreateQuery={this.handleCreateQuery}
          />
        </div>
      )
    } else return <div />
  }
}

export default QueryList
