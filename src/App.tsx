import Hero from "./components/Hero.tsx";
import Generator from "./components/Generator.tsx";
import Workout from "./components/Workout.tsx";
import {useRef} from "react";

function App() {

    const generatorRef = useRef<HTMLDivElement>(null);

    // Function to scroll to the "Generator" component
    const scrollToGenerator = () => {
        generatorRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
    <main className='minh-screen flex flex-col bg-gradient-to-r from-slate-800 to-slate-950 text-white'>
        <Hero scrollToGenerator={scrollToGenerator}/>
        <Generator ref={generatorRef}/>
        <Workout/>
    </main>
  )
}

export default App
