
import React, { useCallback, useEffect, useState } from "react";
import styles from "../styles/components/viewerItem.module.scss";
import ModelViewer from "./ModelViewer";
import axios from "axios";
import YouTube from "react-youtube";
export default function ViewerItem(props: any) {

const lazyScroll = ()=>{
  let a = document.getElementById('divisionItemViewer')?.offsetTop
  if(a){
    
    window.scrollY>= a
    try{
    return  MapItem(props.item, props.select, props.setSelect)
    }
    catch{
      
    }
  }
}
  return (
    <>

      <div className={styles.divisionItemPortifolio}>
        <div className={styles.boxItemsView}>

        {
         lazyScroll()
        }
          

        </div>
        <div className={styles.boxItemsDescricao}>
          <h1>{props.item.name}</h1>
          <br />
          <p>{props.item.description}</p>
          <br />
        </div>
        {
          props.item.links !== undefined
            ? <div className={styles.linksBox}>


              <>
                {
                  props.item.links.map((value: any, index: any) => {
                    return (
                      <a href={value} target="_blank">
                        <img src={props.item.linksType[index] === 'github' ? '/icons8-github-384.png' : props.item.linksType[index] === 'figma' ? '/icons8-figma-384.png' : '/icons8-open-in-browser-100.png'} />
                      </a>

                    );
                  })}
              </>


            </div>
            : <></>
        }
        <br /> <br /> <br /> <br /> <br />
      </div>
    </>
  );
}

function MapItem(item: any, select:any, setSelect:any) {
  
  const [aspectRatios, setAspectRatios] = useState<number[]>([]);

  const getNaturalAspectRatio = async (src: string, index: number) => {
    try {
      const response = await axios.get(src, { responseType: 'arraybuffer' });
      const image = new Image();
      const blob = new Blob([new Uint8Array(response.data)]);
      const url = URL.createObjectURL(blob);
      image.src = url;

      image.onload = () => {
        setAspectRatios((prevRatios) => {
          const newRatios: any = [...prevRatios];
          newRatios[index] = image.width / image.height;
          return newRatios;
        });
      };
    } catch (error) {
      console.error(error);
      setAspectRatios((prevRatios) => {
        const newRatios: any = [...prevRatios];
        newRatios[index] = 1;
        return newRatios;
      });
    }
  };

  useEffect(() => {
    let timeoutId: any;
    if (item.type === 'dev') {
      item.contentIcons.map((value: any, index: any) => {
        getNaturalAspectRatio(value, index);
      });
    }
    timeoutId = setTimeout(() => {
      // Adiciona um delay de 2 segundos na renderização do componente
    }, 2000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [item, select]);
  const isImage = (src: string) => {
    const acceptedExtensions = ['.jpg', '.png'];
    const srcExtension = src.slice(-4).toLowerCase();
    return acceptedExtensions.includes(srcExtension);
  };
  switch (item.type) {
    case 'img':
      return (
        <>
          <div className={styles.boxOptions}>
            {item.content.map((value: any, index: any) => {
              return (
                <img
                  key={`itemOption_${index}`}
                  onClick={e => setSelect(index)}
                  src={value}
                ></img>
              );
            })}
          </div>
          <div className={styles.view}>
            <img className={styles.imgView} src={item.content[select]}></img>
          </div>
        </>
      );
    case 'video':
      return (
        <>
             <div className={styles.view}>
            {
              isImage(item.content[select])
                ? <img className={styles.imgView} style={{ objectFit: aspectRatios[select] >= 1 ? 'cover' : 'contain' }} src={item.content[select]} />
                :   <YouTube style={{  textAlign:'center'}} opts={{width:'100%', height:'100%'}} videoId={item.content[select]} className={styles.videoView}/>
            }
          </div>
        </>
      );
    case '3d':
      return (
        <>
          <div className={styles.view}>
           

            <ModelViewer url={item.content[select]} background={'#3D3D3D'} />
          </div>
        </>
      );
    case "dev":
      return (
        <>
          {
            item.content.length > 1
              ? <div className={styles.boxOptions}>
                {
                  item.contentIcons.map((value: any, index: any) => {
                    return (
                      <img style={{ objectFit: aspectRatios[index] >= 1 ? 'cover' : 'contain' }} key={`itemOption_${index}`} onClick={e => setSelect(index)} src={value}></img>
                    );
                  })
                }
              </div>
              : <></>
          }
          <div className={styles.view}>
            {
              isImage(item.content[select])
                ? <img className={styles.imgView} style={{ objectFit: aspectRatios[select] >= 1 ? 'cover' : 'contain' }} src={item.content[select]} />
                :   <YouTube style={{  textAlign:'center'}} opts={{width:'100%', height:'100%'}} videoId={item.content[select]} className={styles.videoView}/>
            }
          </div>
        </>
      );

  }
}





