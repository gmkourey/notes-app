import React from 'react';
import ReactDOM from 'react-dom';
import { Editor, EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import axios from 'axios';

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onChange = (editorState) => {
      const contentState = editorState.getCurrentContent();
      this.saveContent(contentState);
      this.setState({editorState}); 
    }
    this.setEditor = (editor) => {
      this.editor = editor;
    };
    this.focusEditor = () => {
      if (this.editor) {
        this.editor.focus();
      }
    };
  }

  componentDidMount() {
    this.focusEditor();
    //api call to see if note exists - props.children for "Note_uid" from the leftpane when they click note?
    .then(rawContent => {
      if (rawContent) {
        this.setState({ editorState:
        EditorState.createWithContent(convertFromRaw(rawContent)) })
      } else {
        this.setState({ editorState: EdtiorState.createEmpty() })
      }
    })
  }

  saveContent = (content) => {
    return axios.post('api/note', 
  }

  render() {
    if (!this.state.editorState) {
      return (
        <h3 className="loading">Loading...</h3>
      );
    }
    return (
      <div style={styles.editor} onClick={this.focusEditor}>
        <Editor
          ref={this.setEditor}
          editorState={this.state.editorState}
          onChange={this.onChange}
        />
      </div>
    );
  }
} 

//pull this out later into standalone css?
const styles = {
  editor: {
    border: '1px solid gray',
    minHeight: '100%'
  }
};


export default MyEditor;