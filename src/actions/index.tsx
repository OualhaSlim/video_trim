import { 
    FETCH_VIDEO,
    CROP_VIDEO
}  from './types'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
const ffmpeg = createFFmpeg({ log: true })

const fileNames = ['videos/Reaction_Time.mp4']
const TRANSCRIPT = "videos/transcript.json"

export const fetchVideo = () => async (dispatch: any) => {

    let response = null
    await fetch(TRANSCRIPT).then((res) => {return res.json()})
        .then((transcriptData) => {
            // if there are transcripted videos
            if(transcriptData.monologues){
                let fullText = ""
                let speakersCounter = 0
                let timeStampTracker: number[] = []
                let speakersSet = new Set()
                let videoPath = ""
                transcriptData.monologues.forEach((speakerTranscriptData: any, index: number) =>{
                    videoPath = fileNames[index]
                    if(!speakersSet.has(speakerTranscriptData.speaker)){
                        speakersCounter += 1;
                        speakersSet.add(speakerTranscriptData.speaker)
                    }
                    // get text
                    speakerTranscriptData.elements.forEach((transcript: any) => {
                        if(transcript.type === "punct"){
                            timeStampTracker.push(timeStampTracker[timeStampTracker.length - 1])
                        }
                        else{
                            timeStampTracker.push(...Array<number>(transcript.value.length-1).fill(transcript.ts))
                            timeStampTracker.push(transcript.end_ts)
                        }
                        fullText= fullText + transcript.value
                    })
                    // an other speaker will come
                    fullText.concat("\n")
                })
                for(const speakerData of transcriptData.monologues){
                    if(speakerData.elements){
                    speakerData.elements.forEach((elt: any ,index: number) => fullText= fullText + elt.value)
                    }
                    fullText.concat("\n")
                }
                response = {
                    videoPath: videoPath,
                    nbSpeakers: speakersCounter,
                    text: fullText,
                    timeStamp: timeStampTracker,
                    duration: Math.round(timeStampTracker[timeStampTracker.length-1]),
                    title: "Reaction_Time"
                }
            }
        }).catch((err) =>console.log(err, ' error'))
    
    dispatch({ type:FETCH_VIDEO, payload: response })
};

export const generateCroppedVideo = (videoSource: any, start: number, duration: number, text: string) => async (dispatch: any) => {
    if(!ffmpeg.isLoaded()) await ffmpeg.load()
    let response = null
    console.log(videoSource)
    console.log(start)
    console.log(duration)
    if(videoSource){
        ffmpeg.FS('writeFile', 'input_video.mp4', await fetchFile(videoSource));

        await ffmpeg.run('-i', `input_video.mp4`, '-t', `${duration}`, '-ss', `${start}`, '-f', 'mp4', 'cropped_video.mp4')
        
        const data = ffmpeg.FS('readFile', 'cropped_video.mp4')

        const url = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }))
        response = {
            text: text,
            path: url
        }
    }

    dispatch( {type: CROP_VIDEO, payload: response})
}