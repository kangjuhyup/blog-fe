const SelectList = () => {
    return (
        <div style={{padding:'20px', display:'flex', flexDirection:'row', width:'100%', gap:'20px'}}>
            <button style={{flex : '1', color:'white', fontWeight:'bold', border:'1px solid', borderRadius:'4px', height:'30px'}}>
                Article
            </button>
            <button style={{flex : '1', color:'white', fontWeight:'bold', border:'1px solid', borderRadius:'4px', height:'30px'}}>
                OrderBook
            </button>
        </div>
    )
}

export default SelectList;