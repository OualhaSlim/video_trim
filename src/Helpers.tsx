// react
import React, { useState } from "react";


const Helpers = () =>{
    const [data , setData]=useState("")

    fetch("videos/transcript.json").then(
        function(res){
        return res.json()
      }).then(function(transcriptData){
        let fullText = ""
        if(transcriptData.monologues){
          for(const speakerData of transcriptData.monologues){
            if(speakerData.elements){
              speakerData.elements.forEach((elt: any) => fullText= fullText + elt.value)
            }
            fullText.concat("\n")
          }
        }
        setData(fullText)
      }).catch(
        function(err){
          console.log(err, ' error')
        }
      )
    return(
        <div>
            {data}
        </div>
    )
}

export default Helpers;