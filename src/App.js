import './App.css';
import { useEffect, useState } from 'react'
import { database, ref, push, onValue } from './firebase'

function App() {


  const [dataFireBase , setDataFireBase] = useState([])

  // useEffect(() => {
  //   onValue(ref(database, "message"), data => {
  //     const arr = []
  //     data.forEach((item) => {
  //       arr.push(item.val())
  //     })
  //     console.log(arr)
  //   })
  // }, [])

  
  console.log(dataFireBase)

  return (
    <div className="App">
     <h2> ChatRunTime</h2>
    </div>
  );
}

export default App;
