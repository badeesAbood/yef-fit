import SectionWrapper from "./SectionWrapper.tsx";
import ExerciseCard from "./ExerciseCard.tsx";
import {GeneratedWorkout} from "../utils/functions.ts";
import {RefObject} from "react";
import Button from "./Button.tsx";
import {useAppDispatch} from "../hooks/redux_hooks.ts";
import {reset} from "../features/formulator/formulator.ts";

function Workout(props: {
    workout: GeneratedWorkout[], ref: RefObject<HTMLDivElement | null>,
}) {
    const {workout, ref} = props;
    const dispatch = useAppDispatch();
    return (
        <><SectionWrapper ref={ref} title={['The', 'DANGER', 'zone']} header={'welcome to'}>
            <div className={'flex flex-col gap-4'}>
                {workout.map((value, key) => (
                    <ExerciseCard index={key} key={key} exercise={value}>

                    </ExerciseCard>
                ))}
            </div>
        </SectionWrapper>
            <Button  title='Reset' onClick={() => {
                dispatch(reset())
            }}/></>

    );
}

export default Workout;