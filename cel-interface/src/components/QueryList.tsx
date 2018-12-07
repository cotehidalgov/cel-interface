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
    if (this.state.activeKey == activeKey) {
      activeKey = 0
    }
    this.setState({ activeKey })
    this.props.onQuerySelection(activeKey)
  }

  handleCreateQuery = (queryInput: string, queryDescription: string) => {
    this.props.onCreateQuery(queryInput, queryDescription)
  }

  render() {
    let queryInputClose = () => this.setState({ showQueryInput: false })
    if (this.props.show) {
      return (
        <div
          style={{
            background: "#F5F5F5",
            borderRadius: "4px",
            paddingLeft: "5px",
          }}
        >
          <h2
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Label bsStyle="default">Query list</Label>
            <p>
              <Badge>{this.state.queries.length}</Badge>
            </p>
            <Button
              bsStyle="default"
              onClick={() => this.setState({ showQueryInput: true })}
            >
              Add query
            </Button>
          </h2>
          <div className="pre-scrollable" style={{ height: "70vh" }}>
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
                  <Badge>{query.id}</Badge>
                  {"      "}
                  {query.description}
                </NavItem>
              ))}
            </Nav>
          </div>
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
