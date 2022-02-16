import React, { useState, useEffect } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { Editor, ContentState, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';

const ffmpeg = createFFmpeg({ log: false })
const createFromText = ContentState.createFromText
const createWithContent = EditorState.createWithContent

const TextField = (props:any) =>{
    const [editorState, setEditorState] = useState(createWithContent(createFromText(props.text)));
    const [editIsEnabled, setEditIsEnabled] = useState(false)
    const [textStyle, setTextStyle] = useState("")
    const [ready, setReady] = useState(false)
    const [croppedVideoPath, setCroppedVideoPath] = useState('')

    const load = async () =>{
        await ffmpeg.load()
        setReady(true)
    }
    

    useEffect(()=>{
        // fix for ffmpeg error https://github.com/ffmpegwasm/react-app/issues/3#issuecomment-991958164
        const script = document.createElement("script");
        script.src = "../coi-serviceworker.js";
        script.async = true;
        document.body.appendChild(script);
        load();
    }, [])
    
    const convertToEditor = () =>{
        setEditIsEnabled(!editIsEnabled)
    }

    useEffect(()=>{
        setEditorState(createWithContent(createFromText(props.text)))
        if(editIsEnabled==true) setTextStyle("bg-secondary text-white");
        else setTextStyle("");
    }, [editIsEnabled])

    // TODO if start==end do nothing
    const generateTrimmedVideo = async (e: any) => {
        e.preventDefault();
        // Getting index of selected text 
        const selectionState      = editorState.getSelection();
        const start = selectionState.getStartOffset();
        const end = selectionState.getEndOffset()
        console.log(start)
        console.log(end)
        ffmpeg.FS('writeFile', 'input_video.mp4', await fetchFile(props.src));

        await ffmpeg.run('-i', `input_video.mp4`, '-t', `${props.timeStamp[end-start]}`, '-ss', `${props.timeStamp[start]}`, '-f', 'mp4', 'cropped_video.mp4')
        
        const data = ffmpeg.FS('readFile', 'cropped_video.mp4')

        const url = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }))
        setCroppedVideoPath(url)
    }

    return (
        <div>
            { props.videoOnPlay ? <button className="ui button" onClick={() => props.setVideoOnPlay(false)}>Pause</button>:
                <button className="ui button" onClick={() => props.setVideoOnPlay(true)}>Play</button>
            }
            <button className="ui button" onClick={convertToEditor}>
              Modify
            </button>
            
            <div className='row'>
                <div className={textStyle}>
                    <Editor
                        readOnly={!editIsEnabled}
                        editorState = {editorState}
                        onChange = {setEditorState}
                    />
                </div>
            </div>
            {editIsEnabled == true ? ready? <button className="ui button"onClick={generateTrimmedVideo}>Generate new video</button> : <p>Please wait loading video editor</p> : null}
            {croppedVideoPath && <video src={croppedVideoPath} width="70%" height="auto" controls />}
            
             
        </div>
      );
}

export default TextField;