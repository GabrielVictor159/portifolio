
import styles from "../styles/components/navbar.module.scss";
export default function Navbar(props:any){
    return(
        <nav id="Nav" className={styles.nav} >
          <h1 className={styles.IconName} style={{zIndex:2}}>GV<div /></h1>
          <div className={styles.items} style={{zIndex:3}}>
            <a className={styles.links} onClick={e=>{
               window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });
              }}>
            <h1>Inicio<div/></h1>
            </a>
            <a className={styles.links} onClick={e=>{
               window.scrollTo({
                top:  document.getElementById(props.division2Id)?.offsetTop,
                behavior: 'smooth'
              });
            }}>
            <h1>Conhecimentos<div/></h1>
            </a>
            <a className={styles.links} onClick={e=>{
               window.scrollTo({
                top:  document.getElementById(props.division3Id)?.offsetTop,
                behavior: 'smooth'
              });
            }}>
            <h1>Portifolios<div/></h1>
            </a>
            <a className={styles.links} onClick={e=>{
               window.scrollTo({
                top:  document.getElementById(props.division4Id)?.offsetTop,
                behavior: 'smooth'
              });
            }}>
            <h1>Contatos<div/></h1>
            </a>
          </div>
        </nav>
    );
}