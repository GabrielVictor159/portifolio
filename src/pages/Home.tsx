
import styles from "../styles/Home.module.scss";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import conhecimentos from "../controller/conhecimentos.json";
import uxuiPortifolio from "../controller/uxPortifolio.json";
import devportifolio from "../controller/devPortifolio.json";
import axios from 'axios';
import ViewerItem from "../components/ViewerItem";
interface SelectedKnow {
  name: string;
  img: string;
  description: string;
}
const uxPortifolio = shuffleArray([...uxuiPortifolio.images, ...uxuiPortifolio.videos, ...uxuiPortifolio["3d"]])
const devPortifolio = shuffleArray(devportifolio.projects)
const todosPortifolio = shuffleArray([...uxPortifolio, ...devPortifolio])
function shuffleArray(arr: any) {
  let currentIndex = arr.length;
  let temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;
  }

  return arr;
}
export default function Home() {
  const [test, setTest] = useState(false);
  const [optionKnow, setOptionKnow] = useState(0);
  const [selectKnow, setSelectKnow] = useState(false);
  const [selectedKnow, setSelectedKnow] = useState<SelectedKnow>(
    {} as SelectedKnow
  );
  const [selectPortifolio, setSelectPortifolio] = useState('DEV');
  const [divisionHeight2, setDivisionHeight2] = useState(0);
  const [indexUxImages, setIndexUxImages] = useState(0);
  const [pagePortifolio, setPagePortifolio] = useState(1);
  const [vetorPortifolio, setVetorPortifolio] = useState([])
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [selectPortifolioItem, setSelectPortifolioItem] = useState(false);
  const [select, setSelect] = useState(0);
  const division2Id = styles.division2;
  const division3Id = styles.division3;
  const division4Id = styles.division4;


  useEffect(() => {
    const loadPortfolio = async () => {
      const mapped = vetorPortifolio.map(async (value: any, index: any) => {
        if (indexUxImages <= index && index < (indexUxImages + 9)) {
          const aspectRatio: any = await getNaturalAspectRatio(value.icon);

          return (
            <img
              onClick={e => {
                setTimeout(() => {
                  setSelectPortifolioItem(value);
                  setSelect(0);
                }, 600)
                window.scrollTo({
                  top: document.getElementById('divisionItemViewer')?.offsetTop,
                  behavior: 'smooth',

                });
              }}
              style={{ objectFit: aspectRatio >= 1 ? 'cover' : 'contain' }}
              src={value.icon}
            />
          );
        }
      });
      setPortfolio(await Promise.all(mapped));
    };
    loadPortfolio();
  }, [vetorPortifolio, pagePortifolio]);
  useEffect(() => {

    let element = document.getElementById(styles.division2);
    if (element) {
      setDivisionHeight2(element.offsetHeight);
    }

  }, []);
  useEffect(() => {
    let a = document.getElementById("boxOptionsPortifolioTODOS")
    let b = document.getElementById("boxOptionsPortifolioUX")
    let c = document.getElementById("boxOptionsPortifolioDEV")
    switch (selectPortifolio) {
      case 'TODOS':
        a?.classList.add(styles.portifolioBoxOptionActive)
        b?.classList.remove(styles.portifolioBoxOptionActive)
        c?.classList.remove(styles.portifolioBoxOptionActive)
        setVetorPortifolio(todosPortifolio)
        break;

      case 'UX':
        a?.classList.remove(styles.portifolioBoxOptionActive)
        b?.classList.add(styles.portifolioBoxOptionActive)
        c?.classList.remove(styles.portifolioBoxOptionActive)
        setVetorPortifolio(uxPortifolio)
        break;

      case 'DEV':
        a?.classList.remove(styles.portifolioBoxOptionActive)
        b?.classList.remove(styles.portifolioBoxOptionActive)
        c?.classList.add(styles.portifolioBoxOptionActive)
        setVetorPortifolio(devPortifolio)
        break;
    }



  }, [uxPortifolio, selectPortifolio])
  useEffect(() => {
    document.body.style.background = "rgb(71, 71, 71)";
  }, []);
  const mapConhecimentos = () => {
    let a: any[] = [];
    switch (optionKnow) {
      case 1:
        a = conhecimentos.ux;
        break;
      case 2:
        a = conhecimentos.dev;
        break;
      case 3:
        a = conhecimentos.HardwareRedes;
        break;
      case 4:
        a = conhecimentos.Cloud;
        break;
      case 5:
        a = conhecimentos.Modelagem;
        break;
      case 6:
        a = conhecimentos.MatematicaLogica;
        break;
    }

    return a.map((value, index) => {
      return (
        <img

          className={styles.ConhecimentoIcon}
          src={value.img}
          onClick={(e) =>
            setSelectedKnow({
              name: value.name,
              img: value.img,
              description: value.descripton,
            })
          }
        />
      );
    });
  };
  const getNaturalAspectRatio = async (src: string) => {
    try {
      const response = await axios.get(src, { responseType: 'arraybuffer' });
      const image = new Image();
      const blob = new Blob([new Uint8Array(response.data)]);
      const url = URL.createObjectURL(blob);
      image.src = url;
      return new Promise((resolve) => {
        image.onload = function () {
          resolve(image.width / image.height);
        };
      });
    } catch (error) {
      console.error(error);
      return 1;
    }
  };
  const setPortifolioOption = (id: string, value: string) => {

    setSelectPortifolio(value);
    setPagePortifolio(1);
    setIndexUxImages(0);
  }


  return (

    <>
      <main className={styles.main}>
   
        <div id={styles.division1} className={styles.division}>
          
          <div  className={styles.backgroundDivision}>
            <h1 id="Icon_dev_background" className={styles.devIcon}>{"</>"}</h1>
          </div>
          <div  id="boxNome">

            <h1
            >
              Gabriel
            </h1>
            <h1>Victor</h1>

            <div />

          </div>

          <div className={styles.divisionContainerText}>
            <h3>Introdu????o</h3>
            <h1>Desenvolvedor Full Stack, UI/UX Designer</h1>
            <p>
              Estudante de Sistemas de Informa????o com foco em se tornar um
              desenvolvedor Full Stack inserido no mercado
            </p>
          </div>
        </div>

        <div id={division2Id} className={styles.division}>
          <br />
          <br />
          <div className={styles.tituloContainer}>
            <h3>Conhecimentos</h3>
            <h1>Ferramentas, Tecnologias e conhecimentos</h1>
            <p>
              Eu possuo diverssos conhecimentos nas areas de tecnologia de uma
              olhada nelas
            </p>
          </div>
          <br />
          <div className={styles.conhecimentoOptionsContainer}>
            <ConhecimentoOption
              text={"UI/UX Design"}
              src={"images/icons8-pen-100.png"}
              onClick={(e: any) => setOptionKnow(1)}
            />
            <ConhecimentoOption
              text={"Desenvolvimento"}
              src={"images/icons8-source-code-96.png"}
              onClick={(e: any) => setOptionKnow(2)}
            />
            <ConhecimentoOption
              text={"Hardware, Redes e Sistemas"}
              src={"images/icons8-electronics-100.png"}
              onClick={(e: any) => setOptionKnow(3)}
            />
            <ConhecimentoOption
              text={"Cloud"}
              src={"images/icons8-cloud-development-100.png"}
              onClick={(e: any) => setOptionKnow(4)}
            />
            <ConhecimentoOption
              text={"Modelagem de Projetos e Negocios"}
              src={"images/icons8-training-100.png"}
              onClick={(e: any) => setOptionKnow(5)}
            />
            <ConhecimentoOption
              text={"Matematica e logica de programa????o"}
              src={"images/icons8-logic-64.png"}
              onClick={(e: any) => setOptionKnow(6)}
            />
          </div>
          <br />
          <br /> <br /> <br />
          {optionKnow != 0 ? (
            <>
              <div className={styles.containerConhecimentos}>
                {mapConhecimentos()}
              </div>

              <div className={styles.containerDescription}>
                {Object.keys(selectedKnow).length === 0 ? (
                  <h1 style={{ fontSize: 20, color: "white" }}>
                    Por favor selecione uma Ferramenta ou Tecnologia para ter
                    uma descri????o
                  </h1>
                ) : (
                  <>
                    <h1>{selectedKnow.name}</h1>
                    <p>{selectedKnow.description}</p>
                  </>
                )}
              </div>
              <br /><br /><br />
            </>
          ) : (
            <></>
          )}
        </div>
        <div
          id={division3Id}
          className={styles.division}

          style={{
            position: "relative",
            top: 700,
          }}

        >
          <div className={styles.portifolioBoxTitulo}>
            <br />
            <h3>Portifolio</h3>
            <h1>Minhas Cole????es de portifolio</h1>
            <p>Selecione entre o ambiente entre UX/UI ou desenvolvimento</p>
          </div>
          <br />
          <div className={styles.portifolioBoxOptions} style={{ zIndex: 1 }}>
            <h2 className={styles.optionPortifolioSelect} id="boxOptionsPortifolioDEV" onClick={e => { setPortifolioOption("boxOptionsPortifolioDEV", 'DEV') }}>DESENVOLVIMENTO</h2>
            <h2 className={styles.optionPortifolioSelect} id="boxOptionsPortifolioUX" onClick={e => { setPortifolioOption("boxOptionsPortifolioUX", 'UX') }}>UI/UX</h2>
            <h2 className={styles.optionPortifolioSelect} id="boxOptionsPortifolioTODOS" onClick={e => { setPortifolioOption("boxOptionsPortifolioTODOS", 'TODOS') }}>TODOS</h2>
          </div>
          <br /> <br /> <br />
          <div className={styles.boxImagesPortifolio}>
            {portfolio}

          </div>
          <br /><br />
          <div className={styles.boxPaginationPortifolio}>
            {
              pagePortifolio > 1 ? <img className={styles.paginationBackPage} src={"/icons8-next-page-96.png"} onClick={e => { setPagePortifolio(pagePortifolio - 1); setIndexUxImages(indexUxImages - 9) }} /> : <></>
            }

            <h1>{pagePortifolio}</h1>
            <img className={styles.paginationNextPage} src={"/icons8-next-page-96.png"} onClick={e => { setPagePortifolio(pagePortifolio + 1); setIndexUxImages(indexUxImages + 9) }} />
          </div>
          <br /><br />
        </div>

        {
          <div id="divisionItemViewer" style={{ position: 'relative', top: 700, overflow: 'hidden', width: '100%' }}>
            {selectPortifolioItem
              ? <>
                <ViewerItem item={selectPortifolioItem} select={select} setSelect={setSelect}/>
              </>
              : <></>
            }
          </div>

        }
        <div
          id={division4Id}
          className={styles.division}

          style={{
            position: "relative",
            top: 700
          }}
        >
          <br /><br /><br /><br />
          <h3>Contate me</h3>
          <h1>Formas de me contatar</h1>
          <p>Essa s??o as formas de me contatar, se tiver interesse nos meus servi??os escolha uma por favor.</p>
          <br /><br /><br /><br />
          <div className={styles.boxContatos}>
            <div className={styles.contatoBox}>
              <img src="/icons8-mail-96.png" />
              <p style={{ fontSize: 13 }}>gabrielvictor159487@gmail.com</p>
            </div>
            <div className={styles.contatoBox}>
              <img src="/icons8-iphone-14-100.png" />
              <p style={{ fontSize: 13 }}>{"+55 (61) 99419-0102"}</p>
            </div>
            <a style={{ textDecoration: 'none' }} href={'https://www.linkedin.com/in/gabriel-victor159'} target={'_blank'}>
              <div className={styles.contatoBox}>
                <img src="/icons8-linkedin-100.png" />
                <p style={{ fontSize: 15 }}>{"gabriel-victor159"}</p>
              </div>
            </a>
            <a style={{ textDecoration: 'none' }} href={'https://github.com/GabrielVictor159'} target={'_blank'}>
              <div className={styles.contatoBox}>
                <img src="/icons8-github-90.png" />
                <p style={{ fontSize: 15 }}>{"GabrielVictor159"}</p>
              </div>
            </a>
          </div>
        </div>
        <Navbar division2Id={division2Id} division3Id={division3Id} division4Id={division4Id} />
        <footer>
          <br />
          <h1>?? 2023 Gabriel Victor Pereira Borges. Todos os direitos reservados. </h1>
        </footer>
      </main>
    </>
  );
}

const ConhecimentoOption = (props: any) => {
  return (
    <>
      <div className={styles.conhecimentoOption} onClick={props.onClick}>
        <img
          className={styles.conhecimentoOptionImg}
          src={`${props.src}`}
          alt="filter applied"
        />
        <h2>{props.text}</h2>
      </div>
    </>
  );
};
