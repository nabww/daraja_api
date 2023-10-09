
import { useState } from 'react'
import './App.css'
import Axios from 'axios';

function App() {

  const [phone, setPhone] = useState()
  const [amount, setAmount] = useState()


const sendPush = async (e) => {
  e.preventDefault();

  try {
    const response = await Axios.post("http://localhost:5000/token", {  phone, amount });
    console.log(response.data);
  } catch (error) {
    console.error("Axios Error:", error);
  }
};



  return (
    <>
      <h2 className='text-3xl font-bold text-green-500 mb-12'>Safaricom Lipa na M~Pesa stk Push</h2>
      <form className= 'flex flex-col space-y-5'>
        <input 
        placeholder='Phone Number 07/01'
        className='bg-slate-100 text-center rounded-x1'
        onChange={(e)=>setPhone(e.target.value)}
        />
        <input 
        placeholder='Amount Must be greater than 10'
        className='bg-slate-100 text-center rounded-x1'
        onChange={(e)=>setAmount(e.target.value)}

        />
        <button className='bg-green-500 text-white px-2 py-1 rounded-xl' onClick={sendPush}>PayNow</button>
      </form>
    </>
  )
}

export default App
