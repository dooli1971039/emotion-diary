import {useNavigate, useSearchParams} from "react-router-dom";

const Edit = () =>{
    const navigate=useNavigate();
    const [searchParams, setSearchParams]=useSearchParams();
    const mode= searchParams.get("mode");
    console.log(mode);

    return (
        <div>
            <h1>Edit</h1>
            <p>여기는 일기 수정 페이지.</p>

            <button onClick={()=> {
                navigate('/home')}
            }>home으로 가기</button>
        </div>
    );
}

export default Edit;