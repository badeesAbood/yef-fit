import Hero from "./components/Hero.tsx";
import Generator from "./components/Generator.tsx";
import Workout from "./components/Workout.tsx";

function App() {

  return (
    <main className='minh-screen flex flex-col bg-gradient-to-r from-slate-800 to-slate-950 text-white'>
        <Hero/>
        <Generator/>
        <Workout/>
    </main>
  )
}

export default App
