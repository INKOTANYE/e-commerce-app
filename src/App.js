import './App.css';
import Container from './Container';
import { BrowserRouter } from "react-router-dom";
import 'antd/dist/antd.css'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
         <Container />
      </BrowserRouter>,
      
    </div>
  );
}

export default App;
