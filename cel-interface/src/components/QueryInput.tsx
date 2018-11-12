import * as React from "react"
import {
  Button,
  Label,
  FormGroup,
  FormControl,
  Col,
  HelpBlock,
  Alert,
} from "react-bootstrap"
import * as monacoEditor from "react-monaco-editor"
import MonacoEditor from "react-monaco-editor"
import { CEL_FORMAT, CEL_CONF, CEL_THEME } from "../cel"

export interface QueryInputProps {
  onCreateQuery: (queryInput: string, queryDescription: string) => void
  show: boolean
}

export interface QueryInputState {
  queryInput: string
  showAlert: boolean
}

class QueryInput extends React.Component<QueryInputProps, QueryInputState> {
  state = { queryInput: "", showAlert: false }
  queryDescriptionInput: HTMLInputElement

  addQuery = () => {
    if (this.queryDescriptionInput.value && this.state.queryInput) {
      let showAlert = false
      this.setState({ showAlert })
      this.props.onCreateQuery(
        this.state.queryInput,
        this.queryDescriptionInput.value,
      )
      this.state.queryInput = ""
      this.queryDescriptionInput.value = ""
    } else {
      let showAlert = true
      this.setState({ showAlert })
    }
  }

  editorWillMount: monacoEditor.EditorWillMount = monaco => {
    monaco.languages.register({ id: "cel" })
    monaco.languages.setMonarchTokensProvider("cel", CEL_FORMAT)
    monaco.languages.setLanguageConfiguration("cel", CEL_CONF)
    monaco.editor.defineTheme("vs", CEL_THEME)
  }

  editorDidMount: monacoEditor.EditorDidMount = editor => {
    editor.focus()
  }

  onChange: monacoEditor.ChangeHandler = (newValue, e) => {
    this.state.queryInput = newValue
  }

  // getQueryValidationState() {
  //   const length = this.state.queryInput.length
  //   console.log(length)

  //   if (length === 0) return "error"
  //   else return "success"
  // }

  // getDescriptionValidationState() {
  //   if (this.queryDescriptionInput) return "error"
  //   else return "success"
  // }

  renderAlert = () => {
    if (this.state.showAlert) {
      return (
        <Alert bsStyle="danger">
          <strong>Error adding query!</strong> Both query and query description
          should be filled.
        </Alert>
      )
    } else return <div />
  }

  renderQueryInput() {
    const queryInput = this.state.queryInput
    const options = {
      selectOnLineNumbers: true,
      autoIndent: true,
      colorDecorators: true,
      scrollBeyondLastLine: false,
      matchBrackets: true,
    }
    if (this.props.show) {
      return (
        <div>
          <Col sm={6}>
            <FormGroup controlId="formControlsTextarea">
              <MonacoEditor
                width="500"
                height="100"
                theme="vs-light"
                language="cel"
                value={queryInput}
                options={options}
                onChange={this.onChange}
                editorDidMount={this.editorDidMount}
                editorWillMount={this.editorWillMount}
              />
              <br />
              <FormControl
                bsSize="small"
                style={{ resize: "none", height: "20vh", width: "40vw" }}
                componentClass="textarea"
                placeholder="Query description..."
                inputRef={input => (this.queryDescriptionInput = input)}
              />
            </FormGroup>
            {this.renderAlert()}

            <Button onClick={this.addQuery}>Add query</Button>
          </Col>
        </div>
      )
    } else return <div />
  }

  render() {
    return this.renderQueryInput()
  }
}

export default QueryInput
