import EditorComponent from "./component/editor";
import WriteButton from "./component/write.button";

const WritePage = () => {
    return (
        <div style={{padding:'10px'}}>
            <WriteButton/>            
            <EditorComponent/>
        </div>
    )
}

export default WritePage;