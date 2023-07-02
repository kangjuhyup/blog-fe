const FooterComponent = () => {
    return(
        <div style={{position:"fixed", width:"100vw", height:"100px" ,bottom:"0", display:"flex", gap:"10px", flexDirection:"column"}}>
            <div style={{position:"relative", display:"flex", flexDirection:"row",alignItems:"center",gap:"10px"}}>
            <img style={{width:"30px"}} src="pentacle-coin.svg" ></img>
            <p style={{fontSize:"18px" ,textTransform:"uppercase" , color:"orange", alignItems:"center"}}>PENTACLOG</p>
            </div>
            <div style={{position:"relative", display:"flex",flexDirection:"row", gap:"10px"}}>
                <img style={{width:"20px"}} src="gmail.svg"></img>
                <p style={{color:"orange"}}>fog0510@gmail.com</p>
            </div>
            <div style={{position:"relative", display:"flex",flexDirection:"row", gap:"10px"}}>
                <img style={{width:"20px", height:"20px"}} src="github-mark.svg"></img>
                <p style={{color:"orange"}}>https://github.com/kangjuhyup/blog-fe</p>
            </div>
        </div>
    )
}
export default FooterComponent;