import React, { useState } from 'react';
import { Editor, ContentState, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
const createFromText = ContentState.createFromText
const createWithContent = EditorState.createWithContent

type textProps = {
    text: string
  };

const TextField: React.FC<textProps> = (props) =>{
    const [editorState, setEditorState] = useState(createWithContent(createFromText(props.text)));
    const [editIsEnabled, setEditIsEnabled] = useState(false)
    // TODO if start==end do nothing
    const generateTrimmedVideo = (e: any) => {
        e.preventDefault();
        
        // Getting variables to know text selection 
        const selectionState      = editorState.getSelection();
        const start               = selectionState.getStartOffset();
        const end                 = selectionState.getEndOffset();
        console.log(start)
        console.log(end)
    }

    const convertToEditor = () =>{
        setEditIsEnabled(!editIsEnabled)
    }

    return (
        <div className="ui text container">
            <button className="ui button" onClick={convertToEditor}>
              Modify
            </button>
            <Editor
                readOnly={!editIsEnabled}
                editorState = {editorState}
                onChange = {setEditorState}
            />
            {editIsEnabled == true ? <button onClick={generateTrimmedVideo}>Generate new text</button> : null}
             
        </div>
      );
}

export default TextField

// const selectionState      = editorState.getSelection();
//         const anchorKey           = selectionState.getAnchorKey();
//         const currentContent      = editorState.getCurrentContent();
//         const currentContentBlock = currentContent.getBlockForKey(anchorKey);
//         const start               = selectionState.getStartOffset();
//         const end                 = selectionState.getEndOffset();
//         const selectedText        = currentContentBlock.getText().slice(start, end);