// import React, { useRef } from 'react';
// import { Editor } from '@tinymce/tinymce-react';

// export default function TinyEditor() {
//   const editorRef = useRef(null);
//   const log = () => {
//     if (editorRef.current) {
//       console.log(editorRef.current.getContent());
//     }
//   };
//   return (
//     <>
//       <Editor
//         apiKey='8p35941y6gezs8xsrr2gqcuz6ralwlcsarcdu8zoygsxxj8r'
//         onInit={(evt, editor) => (editorRef.current = editor)}
//         readonly={true}
//         initialValue='<p>This is the initial content of the editor.</p>'
//         init={{
//           height: 200,
//           menubar: false,
//           plugins: [
//             'lists',
//             'searchreplace',
//             'wordcount',
//             'help'
//           ],
//           toolbar:
//             'undo redo | ' +
//             'bold italic underline strikethrough | bullist numlist | ' +
//             'removeformat | help',
//           content_style:
//             'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
//         }}
//       />
//       <button onClick={log}>Log editor content</button>
//     </>
//   );
// }
