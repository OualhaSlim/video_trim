import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { trimVideo } from '../actions';
import { Editor, ContentState, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';

const createFromText = ContentState.createFromText
const createWithContent = EditorState.createWithContent

const TextField = (props:any) =>{
    console.log(props.video)
    const [editorState, setEditorState] = useState(createWithContent(createFromText(props.video.text)));
    const [editIsEnabled, setEditIsEnabled] = useState(false)
    const [textStyle, setTextStyle] = useState("")
    
    const convertToEditor = () =>{
        setEditIsEnabled(!editIsEnabled)
    }

    useEffect(()=>{
        setEditorState(createWithContent(createFromText(props.video.text)))
        if(editIsEnabled===true) setTextStyle("bg-secondary text-white ui segment");
        else setTextStyle("");
    }, [editIsEnabled])

    const generateTrimmedVideo = async (e: any) => {
        e.preventDefault();
        // Getting index of selected text 
        const selectionState      = editorState.getSelection();
        const startIndex = selectionState.getStartOffset();
        const endIndex = selectionState.getEndOffset()
        if(startIndex !== endIndex){
            props.setIsLoading(true)
            props.trimVideo(props.video, startIndex, endIndex)
        }
    }
    return (
        <div>
            { props.videoOnPlay ? <button className="medium ui button" onClick={() => props.setVideoOnPlay(false)}>Pause</button>:
                <button className="large ui button" onClick={() => props.setVideoOnPlay(true)}>Play</button>
            }
            <i className="big edit icon" onClick={convertToEditor}/>

            <div className='row'>
                <div className={textStyle}>
                    <Editor
                        readOnly={!editIsEnabled}
                        editorState = {editorState}
                        onChange = {setEditorState}
                    />
                </div>
            </div>
            {editIsEnabled === true ? <button className="ui button right floated" onClick={generateTrimmedVideo}>Generate new video</button> : null}
            
             
        </div>
      );
}

const mapStateToProps = ({ videos_store }: any) =>{
    return { video: videos_store.video_on_display };
};

export default connect(mapStateToProps, { trimVideo })( TextField);