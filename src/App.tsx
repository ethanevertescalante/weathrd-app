import './App.css'
import {useEffect, useRef, useState} from "react";
import SearchIcons from "../components/SearchIcon.tsx";
import submitLocation from "../scripts/weatherAPI.ts"
import * as React from "react";

function App() {
    const inputRef = useRef(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(inputRef.current) {
            const response = submitLocation(inputRef.current["value"]);

            if(response.success) {
                setError(null);
                console.log("response success", response);
            }else{
                setError(response.error);
            }

        }
    }

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
          <header className="welcome-container">
              <h1 className="welcome-text">Welcome To Weatherd</h1>
          </header>
          <main className="main-flex">
             <span className="search-button-flex">
                 <form onSubmit={handleSubmit}>
                     <input
                         ref={inputRef}
                         className={`weather-search ${error ? "error" : ""}`}
                         type="search"
                         placeholder="San Francisco"
                     />
                     <button className={`submit-button ${error ? "error" : ""}`}>
                        <SearchIcons size={35} className={"none"}/>
                     </button>
                 </form>
             </span>
              <p className="footer-text">Created By Ethan Evert Escalante 2024</p>
          </main>
      </div>
  )
}

export default App
