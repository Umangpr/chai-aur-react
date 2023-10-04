import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState()

  // useRef hook
  const passwordRef = useRef(null) //is variable ko bnane ko main objective yeh
                                  // h ki jb user copy button pr click kre usko dikhe ye portion of password
                                  // copy hua h, jb usne copy button pr click kia to onclick event se internally password copy
                                  // to ho gya but user ko dekh nhi pa rha tha 


            //   useCallback is a React Hook that lets you cache a function definition between re-renders.
            //  const cachedFn = useCallback(fn, dependencies)

  const passwordGenerator= useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*()_-=+{}[]~`?"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1) // string ki index value
      pass += str.charAt(char)     
    }
    
    setPassword(pass)

  } ,[length, numberAllowed, charAllowed, setPassword])


  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select() // yha copy dikhane ke liye ref use kia gya h
    passwordRef.current?.setSelectionRange(0,10);
    window.navigator.clipboard.writeText(password)
  },
  [password])

  //niche wale code ka mtlb h ki in dependencies me kuch v change ho to dubara se run kr do
  //yhi password generate krvata h

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed,passwordGenerator])




  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700 '>
        <h1 className='text-white text-center my-3'>Password Generator</h1>

        <div className='flex shadow rounded-lg overflow-hidden mb-4'>

          <input 
              type='text'
              value={password}
              className='outline-none w-full py-1 px-3'
              placeholder='Password'
              readOnly  
              ref ={passwordRef}      
              
          />
          <button
            onClick={copyPasswordToClipboard}
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          >copy</button>

        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
              type="range"
              min = {6}
              max = {100}
              value = {length}
              className='cursor-pointer'
              onChange={(e) => {setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
              type="checkbox"
              defaultChecked = {numberAllowed}
              onChange={ () => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input 
              type="checkbox"
              defaultChecked = {charAllowed}
              onChange={ () => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
