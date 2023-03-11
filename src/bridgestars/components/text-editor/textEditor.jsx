
import 'quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import { Component } from 'react';

import ReactQuill, { Quill } from 'react-quill';
import './editorStyles.css';
import { Box } from '@mui/material';




class TextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { editorHtml: props.content ?? '', toolbarHidden: props.hideToolbar };
    this.handleChange = this.handleChange.bind(this);
    this.hideToolbar = props.hideToolbar;

    props.onShowToolbar ? this.onShowToolbar = props.onShowToolbar : null;
  }

  removeTrailingWhiteespace(html) {
    //replace <p><br></p> before end of string with nothing
    return html.replace(/<p><br><\/p>$/, '');
    // return html.replace(/<p><br><\/p>$/, '');
    // return html.replace(/<p><br><\/p>$/, '');
  }
  handleChange(html) {
    // html = this.removeTrailingWhiteespace(html);
    this.setState({ editorHtml: html });
    if (this.props.onChange) this.props.onChange(html);
  }

  render() {
    return (
      <Box onClick={() => {
        this.setState({ toolbarHidden: false })
        this.onShowToolbar && this.onShowToolbar()
      }
      }>

        <ReactQuill
          theme={this.props.theme ?? this.state.theme}
          onChange={this.handleChange}
          value={this.state.editorHtml}
          modules={TextEditor.modules}
          formats={TextEditor.formats}
          bounds={'#root'}
          placeholder={this.props.placeholder}
          readOnly={this.props.readOnly}
          className={this.state.toolbarHidden ? 'hide-toolbar' : ''}
        />
      </Box>
    );
  }
}


/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
TextEditor.modules = {
  syntax: true,
  toolbar: [
    // [{ header: '1' }, { header: '2' }, { font: [] }],
    // [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    // ['italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      // { indent: '-1' },
      // { indent: '+1' },
    ],
    // ['link'],
    ['clean'],
    ['code-block'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: true,
  },
};

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
TextEditor.formats = [
  // 'header',
  // 'font',
  // 'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'code-block'
  // 'indent',
  // 'link',
];

export default TextEditor;
