import slide_1 from './img/slide_1.jpg'
import slide_2 from './img/slide_2.jpg'
import slide_3 from './img/slide_3.jpg'
import './App.css';
import Carousel from './Components/Carousel';

function App() {
  let slider = [slide_1,slide_2,slide_3]
  return (
    <div className="App">
      <Carousel data={slider}/>
      <h1>Infinite Carousel</h1>
    </div>
  );
}

export default App;
