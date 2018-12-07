import * as React from "react"
import { Label } from "react-bootstrap"
import * as monacoEditor from "react-monaco-editor"
import MonacoEditor from "react-monaco-editor"
import { CEL_FORMAT, CEL_CONF, CEL_THEME } from "../cel"

export interface QueryProps {
  value: string
  color: string
}

export interface QueryState {
  query: string
}

class Query extends React.Component<QueryProps, QueryState> {
  state = { query: this.props.value }
  queryDescriptionInput: HTMLInputElement

  editorWillMount: monacoEditor.EditorWillMount = monaco => {
    monaco.languages.register({ id: "cel" })
    monaco.languages.setMonarchTokensProvider("cel", CEL_FORMAT)
    monaco.languages.setLanguageConfiguration("cel", CEL_CONF)
    monaco.editor.defineTheme("vs", CEL_THEME)
  }

  editorDidMount: monacoEditor.EditorDidMount = editor => {
    editor.focus()
  }

  // onChange: monacoEditor.ChangeHandler = (newValue, e) => {
  //   this.state.query = newValue
  // }

  render() {
    const query = this.state.query
    const options = {
      selectOnLineNumbers: true,
      autoIndent: true,
      colorDecorators: true,
      scrollBeyondLastLine: false,
      matchBrackets: true,
    }
    return (
      <div>
        <h4>
          <Label bsStyle="default">Query</Label>
        </h4>
        {/* {this.props.value.split("\n").map(line => (
          <div>
            <React.Fragment>
              {line} <br /> */}
        <MonacoEditor
          height="150"
          theme="vs-light"
          language="cel"
          value={query}
          options={options}
          editorDidMount={this.editorDidMount}
          editorWillMount={this.editorWillMount}
        />
        {/* </React.Fragment>
          </div>
        ))} */}
      </div>
    )
  }
}

export default Query
