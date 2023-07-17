import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";
import New from "./pages/New";
import RouteTest from "./components/RouteTest";

function App() {

  return (
      <BrowserRouter>
          <div className="App">
              <h2>App.js</h2>

              {/* process.env.PUBLIC_URL 는 public 폴더에 바로 접근할 수 있는 명령어이다. */}
              <img src={process.env.PUBLIC_URL + `assets/emotion1.png`}/>

              <Routes>
                  <Route path='/' element={<Home/>} />
                  <Route path='/new' element={<New/>} />
                  <Route path='/edit' element={<Edit/>} />
                  {/* :을 사용하여 : 뒤의 id라는 이름으로 값을 전달하겠다는 의미*/}
                  <Route path='/diary/:id' element={<Diary/>} />
              </Routes>
              <RouteTest/>
          </div>
      </BrowserRouter>
  );
}

export default App;
