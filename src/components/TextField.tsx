import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { trimVideo } from '../actions';
import { Editor, ContentState, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';

const createFromText = ContentState.createFromText
const createWithContent = EditorState.createWithContent
const forceSelection = EditorState.forceSelection
const toggleInlineStyle = RichUtils.toggleInlineStyle

type TextFieldProps = {
    videoOnPlay: boolean,
    setVideoOnPlay:React.Dispatch<React.SetStateAction<boolean>>,
    setIsLoading:React.Dispatch<React.SetStateAction<boolean>>,
    trimVideo: any,
    video?: any
  };

const styleMap = {
    'HIGHLIGHT': {
      'backgroundColor': '#2b27fa'
    }
  };

const TextField: React.FC<TextFieldProps> = (props) =>{
    const [editorState, setEditorState] = useState(createWithContent(createFromText(props.video.text)));
    const [editIsEnabled, setEditIsEnabled] = useState(false)
    const [textStyle, setTextStyle] = useState("")
    const [firstRender, setFirstRender] = useState(true)
    
    const convertToEditor = () =>{
        setEditorState(createWithContent(createFromText(props.video.text)))
        setEditIsEnabled(!editIsEnabled)
    }

    const highlightSelectedText = () =>{
        if(editIsEnabled === true){
            const start = props.video.startIndex
            const end = props.video.endIndex
            const selectionState = editorState.getSelection();
            const newSelection = selectionState.merge({
                anchorOffset: start,
                focusOffset: end
            })
            const editorStateWithNewSelection = forceSelection(editorState, newSelection);
            const editorStateWithStyles = toggleInlineStyle(editorStateWithNewSelection,'HIGHLIGHT')
            const editorStateWithStylesAndPreviousSelection = forceSelection(
                editorStateWithStyles,
                selectionState
            )
            setEditorState(editorStateWithStylesAndPreviousSelection);
        }
    }

    const generateTrimmedVideo = async (e: any) => {
        e.preventDefault();
        // Getting index of selected text 
        const selectionState      = editorState.getSelection();
        const startIndex = selectionState.getStartOffset();
        const endIndex = selectionState.getEndOffset()
        if(endIndex - startIndex > 3){
            props.setIsLoading(true)
            props.trimVideo(props.video, startIndex, endIndex)
        }
    }

    useEffect(()=>{
        if(editIsEnabled === true) setTextStyle("bg-secondary text-white ui segment");
        else setTextStyle("");
        if(firstRender === false && props.video.startIndex != undefined && props.video.endIndex!= undefined){
            highlightSelectedText()
        }
        setFirstRender(false)
    }, [editIsEnabled])

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
                        customStyleMap={styleMap}
                    />
                </div>
            </div>
            {editIsEnabled === true ? 
            <button className="ui button right floated" onClick={generateTrimmedVideo}>Generate new video</button> 
            : null}
            
             
        </div>
      );
}

const mapStateToProps = ({ videos_store }: any) =>{
    return { video: videos_store.video_on_display };
};

export default connect(mapStateToProps, { trimVideo })( TextField);