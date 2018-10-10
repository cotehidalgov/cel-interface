import * as React from "react"
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  Label,
} from "react-bootstrap"
import { Container } from "react-bootstrap/lib/Tab"
import * as monacoEditor from "react-monaco-editor"
import MonacoEditor from "react-monaco-editor"
import { CEL_FORMAT, CEL_THEME } from "../cel"

export interface QueryInputProps {
  onCreateQuery: (queryInput: string) => void
}

export interface QueryInputState {
  code: string
}

class QueryInput extends React.Component<QueryInputProps, QueryInputState> {
  // state = { queryInput: false }
  queryInput: HTMLInputElement
  state = { code: "" }

  addQuery = () => {
    if (this.state.code) {
      this.props.onCreateQuery(this.state.code)
      this.state.code = ""
    }
  }

  editorWillMount: monacoEditor.EditorWillMount = monaco => {
    monaco.languages.register({ id: "cel" })
    monaco.languages.setMonarchTokensProvider("cel", CEL_FORMAT)
    monaco.editor.defineTheme("draco-light", CEL_THEME)
  }

  editorDidMount: monacoEditor.EditorDidMount = (editor, monaco) => {
    editor.focus()
  }

  onChange: monacoEditor.ChangeHandler = (newValue, e) => {
    this.state.code = newValue
  }

  render() {
    const code = this.state.code
    const options = {
      selectOnLineNumbers: true,
      autoIndent: true,
      colorDecorators: true,
      scrollBeyondLastLine: false,
    }
    return (
      <div>
        <h2>
          <Label bsStyle="default">Write your Query!</Label>
        </h2>

        <MonacoEditor
          width="500"
          height="300"
          theme="draco-light"
          language="cel"
          value={code}
          options={options}
          onChange={this.onChange}
          editorDidMount={this.editorDidMount}
          editorWillMount={this.editorWillMount}
        />
        <Button onClick={this.addQuery}>Add query</Button>
      </div>
    )
  }
}

export default QueryInput
