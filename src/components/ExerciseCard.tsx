import {GeneratedWorkout} from "../utils/functions.ts";
import {useState} from "react";

function ExerciseCard(props: { exercise: GeneratedWorkout, index: number }) {
    const { exercise ,index} = props;
    const [sets , setSets] = useState(0) ;

    function incrementSets() {
        setSets((sets +1) % 6)
    }
    return (
        <div className={'flex flex-col gap-4 p-4 bg-slate-950 rounded-md sm:flex-wrap'}>
            <div className={'flex flex-col sm:flex-row sm:items-center sm:flex-wrap sm:justify-between'}>
                <h4 className={'hidden sm:inline text-slate-400 font-semibold sm:text-4xl md:text-5xl '}>0{index + 1}</h4>
                <h2 className={'capitalize truncate sm:text-center max-w-full '}>{exercise.name.split('_').join(' ')}</h2>
                <p className={'text-sm text-slate-400 capitalize'}>{exercise.type}</p>
            </div>
            <div>
                <h3 className={'text-sm text-slate-400'}>Muscle Group</h3>
                <p className={'capitalize'}>{exercise.muscles.join(' & ')}</p>
            </div>

            <div className={'grid grid-cols-1 sm:grid-cols-2 gap-4'}>
                {['Reps', 'Rest', 'Tempo'].map((value, key) => (
                    <div key={key} className={'flex flex-col items-center p-2 gap-2 border-[1.5px] rounded w-full border-slate-900'}>
                        <h3 className={'capitalize text-sm text-slate-400'}>{value}</h3>
                        <p >{
                            (() => {
                                switch(value) {
                                    case 'Reps':
                                        return exercise.reps;
                                    case 'Rest':
                                        return exercise.rest;
                                    case 'Tempo':
                                        return exercise.tempo;
                                    default:
                                        return '0';
                                }
                            })()
                        }</p>
                    </div>


                ))}

                <button onClick={incrementSets}  className={'flex flex-col items-center p-2 gap-2 border-[1.5px] rounded w-full duration-200 hover:border-blue-600 border-slate-500'}>
                    <h3 className={'capitalize text-sm text-slate-400'}>Sets Completed </h3>
                    <p >{sets}/5</p>
                </button>
            </div>
        </div>
    );
}

export default ExerciseCard;