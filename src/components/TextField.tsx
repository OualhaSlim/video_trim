import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Editor, ContentState, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
const createFromText = ContentState.createFromText
const createWithContent = EditorState.createWithContent

const TextField = (props:any) =>{
    const [editorState, setEditorState] = useState(createWithContent(createFromText(props.video.text)));
    const [editIsEnabled, setEditIsEnabled] = useState(false)
    
    const convertToEditor = () =>{
        setEditIsEnabled(!editIsEnabled)
    }

    // TODO if start==end do nothing
    const generateTrimmedVideo = (e: any) => {
        e.preventDefault();
        
        // Getting variables to know text selection 
        const selectionState      = editorState.getSelection();
        const start               = selectionState.getStartOffset();
        const end                 = selectionState.getEndOffset();
    }

    return (
        <div>
            <button className="ui button" onClick={convertToEditor}>
              Modify
            </button>
            <Editor
                readOnly={!editIsEnabled}
                editorState = {editorState}
                onChange = {setEditorState}
            />
            {editIsEnabled == true ? <button className="ui button"onClick={generateTrimmedVideo}>Generate new video</button> : null}
             
        </div>
      );
}

const mapStateToProps = (state: any) =>{
    return { video: state.selectedVideo };
};

export default connect(mapStateToProps)(TextField);

// const selectionState      = editorState.getSelection();
//         const anchorKey           = selectionState.getAnchorKey();
//         const currentContent      = editorState.getCurrentContent();
//         const currentContentBlock = currentContent.getBlockForKey(anchorKey);
//         const start               = selectionState.getStartOffset();
//         const end                 = selectionState.getEndOffset();
//         const selectedText        = currentContentBlock.getText().slice(start, end);