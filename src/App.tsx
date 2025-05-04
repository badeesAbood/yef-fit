import Hero from "./components/Hero.tsx";
import Generator from "./components/Generator.tsx";
import Workout from "./components/Workout.tsx";
import {useRef, useState} from "react";
import {generateWorkout} from "./utils/functions.ts";
import {formulate} from "./features/formulator/formulator.ts";
import {useAppDispatch, useAppSelector} from "./hooks/redux_hooks.ts";

function App() {

    const generatorRef = useRef<HTMLDivElement>(null);
    const workoutRef = useRef<HTMLDivElement>(null);

    // Function to scroll to the "Generator" component
    const scrollToGenerator = () => {
        generatorRef.current?.scrollIntoView({behavior: 'smooth'});
    };

    const scrollToWorkout = () => {
        workoutRef.current?.scrollIntoView({behavior: 'smooth'});
    };


    const [poison, setPoison] = useState<string>('individual');
    const [muscles, setMuscles] = useState<string[]>([]);
    const [goal, setGoal] = useState<string>('strength_power');
    const workout = useAppSelector((state) => state.formulate.workout)

    const dispatch = useAppDispatch();

    function updateWorkout() {
        if (muscles.length < 1) {
            return
        }
        const workout = generateWorkout({muscles, poison, goal})

        dispatch(formulate(workout))

        setTimeout(() => {
            scrollToWorkout();
        }, 300);
    }


    return (
        <main className='minh-screen flex flex-col bg-gradient-to-r from-slate-800 to-slate-950 text-white'>
            <Hero scrollToGenerator={scrollToGenerator}/>
            <Generator
                poison={poison}
                muscles={muscles}
                goal={goal}
                formulate={updateWorkout}
                setPoison={setPoison}
                setMuscles={setMuscles}
                setGoal={setGoal}
                ref={generatorRef}
            />
            {workout && <Workout workout={workout} ref={workoutRef}/>}
        </main>
    )
}

export default App
