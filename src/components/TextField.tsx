import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { generateCroppedVideo } from '../actions';
import { Editor, ContentState, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';

const createFromText = ContentState.createFromText
const createWithContent = EditorState.createWithContent

const TextField = (props:any) =>{
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

    // TODO if start==end do nothing
    const generateTrimmedVideo = async (e: any) => {
        e.preventDefault();
        // Getting index of selected text 
        const selectionState      = editorState.getSelection();
        const startIndex = selectionState.getStartOffset();
        const endIndex = selectionState.getEndOffset()
        if(startIndex !== endIndex){
            const startInSeconds = props.video.timeStamp[startIndex]
            const duration = props.video.timeStamp[endIndex] - props.video.timeStamp[startIndex]
            
            props.setIsLoading(true)
            props.generateCroppedVideo(props.video.videoPath, startInSeconds, duration, props.video.text.substring(startIndex, endIndex))
        }
    }
    return (
        <div>
            { props.videoOnPlay ? <button className="medium ui button" onClick={() => props.setVideoOnPlay(false)}>Pause</button>:
                <button className="large ui button" onClick={() => props.setVideoOnPlay(true)}>Play</button>
            }
            <i className="big edit icon" onClick={convertToEditor}/>
            
            <br/>
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

const mapStateToProps = (state: any) =>{
    return { video: state.videos_store.source_video };
};

export default connect(mapStateToProps, { generateCroppedVideo })( TextField);