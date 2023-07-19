import IpfsComponent from "./ipfs";

const FooterComponent = () => {
    return(
        <div id="footer" style={{position:"absolute", width:"100vw", height:"100px" ,bottom:"0", display:"flex", gap:"10px", flexDirection:"column", background : 'black'}}>
            <div style={{position:"relative", display:"flex",flexDirection:"row", gap:"10px"}}>
                <img style={{width:"20px"}} src="gmail.svg"></img>
                <p style={{color:"orange"}}>fog0510@gmail.com</p>
            </div>
            <div style={{position:"relative", display:"flex",flexDirection:"row", gap:"10px"}}>
                <img style={{width:"20px", height:"20px"}} src="github-mark.svg"></img>
                <p style={{color:"orange"}}>https://github.com/kangjuhyup/blog-fe</p>
            </div>
            <IpfsComponent/>
        </div>
    )
}
export default FooterComponent;