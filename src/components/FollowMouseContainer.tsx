import React, { useState, useRef, useEffect } from 'react';

const FollowMouseContainer = (props:any) => {
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);

 

    useEffect(() => {
        const handleMouseMove = (event:any) => {
            setMouseX(event.clientX);
            setMouseY(event.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);
    return (
        <>
        {props.isMouseOver ?
        <div
            style={{
                position: 'absolute',
                left:mouseX,
                top:mouseY
            }}
        >
            {props.children}
           
        </div>
        :<></>
        }
        </>
    );
};

export default FollowMouseContainer;