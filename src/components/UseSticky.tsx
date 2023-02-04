import { useEffect, useLayoutEffect, useRef, useState } from 'react';
let elementTop= 0;
let a:any =0;
let z:any=0;
let p:any=0;
export default function UseSticky(id: string, position:string, top:any) {
  
  const rafRef = useRef(0);
 

  useEffect(() => {
    // Get the element to make sticky
    const element = document.getElementById(id);
    
    // Function to handle sticky behavior on scroll
    const handleSticky = () => {
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 0) {
            if(z===0){
                a=window.scrollY
                z++;
            }
            element.style.position='fixed'
            element.style.top='0px',
            element.style.zIndex='-1'
        }
        if(window.scrollY<=a && a!==0){
            element.style.position=position,
            element.style.top=`${top}px`,
            element.style.zIndex='0'
        }
      }
    };

    // Use requestAnimationFrame for smooth scrolling
    const handleScroll = () => {
      rafRef.current = requestAnimationFrame(handleSticky);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [id, position, top, elementTop]);
}
