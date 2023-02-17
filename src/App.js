import './App.css';
import { useEffect, useState, useRef } from 'react'
import { database, ref, push, onValue } from './firebase'
import moment from 'moment'

function App() {

  const [valueMess, setValueMess] = useState('')
  const [dataFireBase , setDataFireBase] = useState([])
  const inputRef = useRef()

  useEffect(() => {
    onValue(ref(database, 'message'), data => {
      console.log("data :",data)
      const arr = []
      data.forEach((item) => {
        arr.push(item.val())
      })
      setDataFireBase(arr)
    })
  }, [])

  const handleSendMessage = () => {
    push(ref(database, 'message'), {
        name : 'Anonymous',
        text : valueMess,
        createAt : moment(Date.now()).format("DD/MM/YYYY")
    })
    setValueMess('')
    inputRef.current.focus()
  }

  console.log("dataFireBase : ",dataFireBase)


  return (
    <div className="App">
     <h2> ChatRunTime</h2>
     <ul>
      {dataFireBase.map((message, index) => {
        return <div> 
            <li key={index} style = {{listStyle:'none'}}>{message.name} : {message.text}</li>
            <span>{message.createAt}</span>
           </div>
      })}
     </ul>
     <input ref={inputRef} value={valueMess} onChange = { (e) => setValueMess(e.target.value)  }/>
     <button onClick={handleSendMessage}>Send Message</button>
    </div>
  );
}

export default App;
