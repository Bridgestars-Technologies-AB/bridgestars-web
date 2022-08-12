
import 'quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import { Component } from 'react';

import ReactQuill, { Quill } from 'react-quill';
import './editorStyles.css';





class TextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { editorHtml: props.content ?? '' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(html) {
    this.setState({ editorHtml: html });
    if (this.props.onChange) this.props.onChange(html);
  }

  render() {
    return (
      <ReactQuill
        theme={this.props.theme ?? this.state.theme}
        onChange={this.handleChange}
        value={this.state.editorHtml}
        modules={TextEditor.modules}
        formats={TextEditor.formats}
        bounds={'#root'}
        placeholder={this.props.placeholder}
        readOnly={this.props.readOnly}
      />
    );
  }
}


/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
TextEditor.modules = {
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
  // 'indent',
  // 'link',
];

export default TextEditor;
