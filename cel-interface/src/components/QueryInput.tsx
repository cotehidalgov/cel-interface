import * as React from "react"
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  Label,
} from "react-bootstrap"
import { Container } from "react-bootstrap/lib/Tab"

export interface QueryInputProps {
  onCreateQuery: (queryInput: string) => void
}

export interface QueryInputState {}

class QueryInput extends React.Component<QueryInputProps, QueryInputState> {
  // state = { queryInput: false }
  queryInput: HTMLInputElement

  addQuery = () => {
    if (this.queryInput.value) {
      this.props.onCreateQuery(this.queryInput.value)
      this.queryInput.value = ""
    }
  }

  render() {
    return (
      <div>
        <h2>
          <Label bsStyle="default">Write your Query!</Label>
        </h2>
        <FormGroup controlId="formControlsTextarea">
          <FormControl
            bsSize="small"
            style={{ resize: "none", height: "40vh", width: "40vw" }}
            componentClass="textarea"
            placeholder="Query..."
            inputRef={input => (this.queryInput = input)}
          />
        </FormGroup>
        <Button onClick={this.addQuery}>Add query</Button>
      </div>
    )
  }
}

export default QueryInput
