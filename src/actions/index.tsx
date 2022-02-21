import { 
    FETCH_VIDEO,
    TRIM_VIDEO
}  from './types'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
const ffmpeg = createFFmpeg({ log: true })

export const fetchVideo = (videoTitle: string, videoPath: string, transcriptPath: string) => async (dispatch: any) => {

    let response = {
        originalVideoPath: videoPath,
        videoPath: videoPath,
        text: "",
        title: videoTitle
    }
    await fetch(transcriptPath).then((res) => {return res.json()})
        .then((transcriptData) => {
            // if there are transcripted videos
            if(transcriptData.monologues){
                let fullText: string = ""
                let speakersCounter: number = 0
                let timeStampTracker: number[] = []
                let speakersSet = new Set()
                transcriptData.monologues.forEach((speakerTranscriptData: any) =>{
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
                            timeStampTracker.push(transcript.ts)
                            timeStampTracker.push(...Array<number>(transcript.value.length-1).fill(transcript.end_ts))
                        }
                        fullText= fullText + transcript.value
                    })
                    // put spacing between speakers
                    fullText.concat("\n")
                })
                response = Object.assign(response, {text: fullText, 
                    nbSpeakers: speakersCounter, 
                    timeStamp: timeStampTracker, 
                    duration: Math.round(timeStampTracker[timeStampTracker.length-1])
                })
            }
        }).catch((err) =>console.log(err, ' error'))
    
    dispatch({ type:FETCH_VIDEO, payload: response })
};

export const trimVideo = (video: any, startIndex: number, endIndex: number) => async (dispatch: any) => {
    if(!ffmpeg.isLoaded()) await ffmpeg.load()
    let response = {...video}
    const startTime = video.timeStamp[startIndex]
    const duration = video.timeStamp[endIndex-1] - video.timeStamp[startIndex]
    if(startIndex === 0 && endIndex === video.timeStamp.length){
        response = {...video,
            videoPath: video.originalVideoPath,
            duration: Math.round(duration),
            startIndex: startIndex,
            endIndex: endIndex
        }
    }
    else if(video.originalVideoPath){
        ffmpeg.FS('writeFile', 'input_video.mp4', await fetchFile(video.originalVideoPath));

        await ffmpeg.run('-i', `input_video.mp4`, '-t', `${duration}`, '-ss', `${startTime}`, '-f', 'mp4', 'cropped_video.mp4')
        
        const data = ffmpeg.FS('readFile', 'cropped_video.mp4')

        const url = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }))
        response = {...video,
            videoPath: url,
            duration: Math.round(duration),
            startIndex: startIndex,
            endIndex: endIndex
        }
    }

    dispatch( {type: TRIM_VIDEO, payload: response})
}