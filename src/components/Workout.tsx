import SectionWrapper from "./SectionWrapper.tsx";
import ExerciseCard from "./ExerciseCard.tsx";
import {GeneratedWorkout} from "../utils/functions.ts";
import {RefObject} from "react";

function Workout(props: {
    workout: GeneratedWorkout[], ref: RefObject<HTMLDivElement | null>,
}) {
    const {workout , ref}  = props;
    return (
        <SectionWrapper ref={ref} title={['The', 'DANGER', 'zone']} header={'welcome to'}>
            <div className={'flex flex-col gap-4'}>
                {workout.map((value, key) => (
                    <ExerciseCard index={key} key={key} exercise={value}>

                    </ExerciseCard>
                ))}
            </div>
        </SectionWrapper>

    );
}

export default Workout;