interface props {
    clickHandler: () => void;
}

const WriteButton = ({
    clickHandler, 
}:props) => {
    return (
        <button 
        style={{position:'fixed', bottom:'150px', right:'50px', width:'50px',height:'50px',borderRadius:'50%',background:'orange', zIndex:'999999'}}
        onClick={clickHandler}
        >
            +
        </button>
    )
}

export default WriteButton;