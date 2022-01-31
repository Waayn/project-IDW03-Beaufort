import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import MyRoutes from './router/MyRoutes';
// import Header from './components/Header';

const App = () => {

  return (<>
    {/* <Header /> */}
    <Router>
      <MyRoutes />
    </Router>
  </>
  );
}

export default App;
