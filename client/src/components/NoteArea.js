// Import React!
import React from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import API from "../utils/API";
// import AuthUserContext from './AuthUserContext';
import {firebase} from '../firebase';
import Paper from '@material-ui/core/Paper';

//adding imports for rich text
import ReactDOM from 'react-dom';
import styled from 'react-emotion';
import { Button, Icon, Menu } from '../richtext'

//big chunk of hovering menu
const StyledMenu = styled(Menu)`
  padding: 8px 7px 6px;
  position: absolute;
  z-index: 1;
  top: -10000px;
  left: -10000px;
  margin-top: -6px;
  opacity: 0;
  background-color: #222;
  border-radius: 4px;
  transition: opacity 0.75s;
`

/**
 * The hovering menu.
 *
 * @type {Component}
 */

class HoverMenu extends React.Component {
  /**
   * Render.
   *
   * @return {Element}
   */

  render() {
    const { className, innerRef } = this.props
    const root = window.document.getElementById('root')

    return ReactDOM.createPortal(
      <StyledMenu className={className} innerRef={innerRef}>
        {this.renderMarkButton('bold', 'format_bold')}
        {this.renderMarkButton('italic', 'format_italic')}
        {this.renderMarkButton('underlined', 'format_underlined')}
        {this.renderMarkButton('code', 'code')}
      </StyledMenu>,
      root
    )
  }

  /**
   * Render a mark-toggling toolbar button.
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

  renderMarkButton(type, icon) {
    const { editor } = this.props
    const { value } = editor
    const isActive = value.activeMarks.some(mark => mark.type == type)
    return (
      <Button
        reversed
        active={isActive}
        onMouseDown={event => this.onClickMark(event, type)}
      >
        <Icon>{icon}</Icon>
      </Button>
    )
  }

  /**
   * When a mark button is clicked, toggle the current mark.
   *
   * @param {Event} event
   * @param {String} type
   */

  onClickMark(event, type) {
    const { editor } = this.props
    event.preventDefault()
    editor.change(change => change.toggleMark(type))
  }
}
//end of hovering menu chunk

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: "Replace this text to start your note",
              },
            ],
          },
        ],
      },
    ],
  },
})


class NoteArea extends React.Component {

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      this.setState({ email: authUser.email })
    })
    //rich-text
    this.updateMenu()
  }

  // componentWillReceiveProps() {
  componentDidUpdate(prevProps) {
    console.log('content prop: ' + this.props.selectedNoteBody);
    console.log('id prop: ' + this.props.selectedNoteID);
    console.log("------------------------");

    if (this.props.selectedNoteID !== prevProps.selectedNoteID) {
      let contentStr = this.props.selectedNoteBody;
      let contentObj = JSON.parse(contentStr);
      let slateContent = Value.fromJSON(contentObj);
      
      this.setState({ 
        value: slateContent,
        id: this.props.selectedNoteID
      })
    }
    this.updateMenu()
  }

  state = {
    value: initialValue,
    id: "",
    email: "test"
  }

  // On change, update the app's React state with the new editor value.
  onChange = ({ value }) => {
      // console.log(this.state.email);
    this.setState({ value })
    // API.saveNote({content: JSON.stringify(value), userId: this.state.email});
    if (this.props.selectedNoteBody) {
      API.updateNote(this.state.id, { content: JSON.stringify(value) });
    }
    
  }
  //rich text
  updateMenu = () => {
    const menu = this.menu
    if (!menu) return

    const { value } = this.state
    const { fragment, selection } = value

    if (selection.isBlurred || selection.isCollapsed || fragment.text === '') {
      menu.removeAttribute('style')
      return
    }

    const native = window.getSelection()
    const range = native.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    menu.style.opacity = 1
    menu.style.top = `${rect.top + window.pageYOffset - menu.offsetHeight}px`

    menu.style.left = `${rect.left +
      window.pageXOffset -
      menu.offsetWidth / 2 +
      rect.width / 2}px`
  }
  //end rich text

  // Render the editor.
  render() {
    // return <Editor value={this.state.value} onChange={this.onChange} />
    return(
      <Paper>
      <Editor 
        value={this.state.value} 
        onChange={this.onChange}
        style={{
          'minHeight':'calc(100vh - 90px)',
          margin: '20px 0 30px 0',
          padding: '10px',
          // overflowY: 'scroll'
        }}
        renderEditor={this.renderEditor}
        renderMark={this.renderMark}
      />
      </Paper>
    ) 
  }
  renderEditor = (props, next) => {
    const { editor } = props
    const children = next()
    return (
      <React.Fragment>
        {children}
        <HoverMenu innerRef={menu => (this.menu = menu)} editor={editor} />
      </React.Fragment>
    )
  }

  /**
   * Render a Slate mark.
   *
   * @param {Object} props
   * @param {Editor} editor
   * @param {Function} next
   * @return {Element}
   */

  renderMark = (props, next) => {
    const { children, mark, attributes } = props

    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>
      case 'code':
        return <code {...attributes}>{children}</code>
      case 'italic':
        return <em {...attributes}>{children}</em>
      case 'underlined':
        return <u {...attributes}>{children}</u>
      default:
        return next()
    }
  }

}

export default NoteArea;