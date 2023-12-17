import './App.css'
import { useState } from 'react'
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

function App() {
  const [length,setlength]=useState(10);
  const [usednumber,setusednumber]=useState(false);
  const [usedcharacter,setusedcharacter]=useState(false);
  const [password,setpassword]=useState("");

  // ref hook
  const passwordref=useRef(null);

  const passwordgenetor = () =>{
    let pass= "";
    let str= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(usednumber) {
      str += "0123456789"
    }
    if(usedcharacter)
    {
      str +="!@#$%^&*()_-+={}[]:;~`"
    }

    for (let i = 1; i <= length; i++)
    {
       let char=Math.floor(Math.random()*str.length+1);
       pass=pass+str.charAt(char);
      //  console.log(pass);
    }
    setpassword(pass);
  }

  const copypassword=useCallback(()=>{
    passwordref.current?.select();
    passwordref.current?.setSelectionRange(0,length)
   window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
     passwordgenetor();
  },[length,usednumber,usedcharacter])
  return (
    <>

        <h1 className='text-white bg-slate-800 py-3 text-center text-2xl font-bold'>Password Generator</h1>
        <div>
           <input type="text" 
           value={password}
           className="py-1 px-3 bg-black mt-4 text-white rounded-md" 
          placeholder='Password' 
          readOnly
          ref={passwordref}
           />
           <button className="bg-blue-700 p-1 rounded-md"
           onClick={copypassword}
           >Copy</button>
        </div>

        <div>
          <div>
            <input type="range"
             min={4}
             max={15}
             value={length}
             className="cursor-pointer"
             onChange={(e)=>setlength(e.target.value)}
             />
             <label>Length:{length}</label>
            </div>

            <div>
              <input type="checkbox"
               id="numberinput"
               defaultChecked={usednumber}
               onChange={()=>{
                 setusednumber((prev)=>!prev)
               }}
                />
            </div>
            <label>Number</label>

            <div>
              <input type="checkbox"
               id="charecterinput"
               defaultChecked={usedcharacter}
               onChange={()=>{
                setusedcharacter((prev)=>!prev)
               }}
                />
            </div>
            <label>Charecters</label>

        </div>
    </>
  )
}

export default App
