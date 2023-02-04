import React, { useRef, useEffect } from 'react';



export default function VideoFrameCapture(props:any) {
    let id = generateRandomString(7);
    useEffect(() => {
      let a:any
       a = document.getElementById(id);
      if(a){
        a.currentTime =props.time
        a.pause();
      }
        }, []);

        function generateRandomString(length:any) {
            let result = '';
            let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
              result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
          }
    return (
    <div>
      <video id={id} src={props.src}/> 
    </div>
    
    
    );
}
