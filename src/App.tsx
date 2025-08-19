import './App.css'
import {useEffect, useRef} from "react";


function App() {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if(!inputRef.current) return;

        const placeholders = [
            "San Francisco",
            "94102",
            "37.7749,122.4194",
            "192.168.50.100",
            "SFO"
        ]

        let index = 0;

        const timoutId = setTimeout(() => {
            const intervalId = setInterval(() => {
                if(document.activeElement !== inputRef.current){
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    inputRef.current.placeholder = placeholders[index];
                    index = (index +1) % placeholders.length;
                }
            }, 1200)
            return () => clearInterval(intervalId)
        }, 2000)

        return () => clearTimeout(timoutId);





    }, []);




  return (
    <div className="app-container">
      <div className="welcome-container">
          <h1 className="welcome-text">Welcome To Weatherd</h1>
      </div>
      <input ref={inputRef} id="rotating-input" className="weather-search" type="search" placeholder="San Francisco"/>
    </div>
  )
}

export default App
