import {useParams} from "react-router-dom";

const Diary = () =>{

    const {id} =useParams();

    return (
        <div>
            <h1>diary</h1>
            <p>여기는 {id}번째 일기 상세 페이지입니다.</p>
        </div>
    );
}

export default Diary;