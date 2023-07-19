import { BODY_HEIGHT } from "@/common/const";
import EditorComponent from "./component/editor";
import WriteButton from "./component/write.button";

const WritePage = () => {
    return (
        <div style={{ height:BODY_HEIGHT}}>
            <EditorComponent/>
        </div>
    )
}

export default WritePage;