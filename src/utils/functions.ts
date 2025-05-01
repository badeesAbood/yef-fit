

import { EXERCISES, SCHEMES, TEMPOS, WORKOUTS } from "./swoldier";

// Define types for the data structures used
export interface Exercise {
    meta: {
        environment: string;
    };
    muscles: string[];
    type: "compound" | "accessory";
    unit: "reps" | "duration";
    description?: string;
    substitutes?: string[];
    [key: string]: any; // To handle additional dynamic keys
}

export interface Scheme {
    ratio: number[];
    repRanges: number[];
    rest: [number, number];
}

 export interface WorkoutArgs {
    muscles: string[];
    poison: string; // Renamed from "workout" due to destructuring
    goal: string;
}

export interface Set {
    setType: "compound" | "accessory";
    muscleGroup: string;
}

export interface GeneratedWorkout {
    name: string;
    tempo: string;
    rest: number;
    reps: number;
    [key: string]: any; // Additional properties for exercises
}

// Flatten EXERCISES
const exercises: Record<string, Exercise> = exercisesFlattener(EXERCISES);

export function generateWorkout(args: WorkoutArgs): GeneratedWorkout[] {
    const { muscles, poison: workout, goal } = args;

    // Filter exercises by environment
    const exer = Object.keys(exercises).filter(
        (key) => exercises[key]?.meta?.environment !== "home"
    );

    const includedTracker: string[] = [];
    let listOfMuscles: string[];

    if (workout === "individual") {
        listOfMuscles = muscles;
    } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        listOfMuscles = WORKOUTS[workout]?.[muscles[0]] || [];
    }

    listOfMuscles = shuffleArray(listOfMuscles);
    const arrOfMuscles = Array.from(new Set(listOfMuscles));
    const scheme = goal;

    // Generate sets
    const sets: Set[] = SCHEMES[scheme as keyof typeof SCHEMES]?.ratio.flatMap((curr, index) => {
        return Array(curr).fill(index === 0 ? "compound" : "accessory").map((setType) => ({
            setType,
            muscleGroup: arrOfMuscles[index % arrOfMuscles.length],
        }));
    });

    // Filter exercises into compound and accessory categories
    const { compound: compoundExercises, accessory: accessoryExercises } = exer.reduce(
        (acc: Record<"compound" | "accessory", Record<string, Exercise>>, curr) => {
            if (!exercises[curr]) return acc;

            const exerciseHasRequiredMuscle = exercises[curr].muscles.some((musc) =>
                arrOfMuscles.includes(musc)
            );

            if (exerciseHasRequiredMuscle) {
                acc[exercises[curr].type] = {
                    ...acc[exercises[curr].type],
                    [curr]: exercises[curr],
                };
            }

            return acc;
        },
        { compound: {}, accessory: {} }
    );

    // Generate workout of the day (WOD)
    const genWOD: GeneratedWorkout[] = sets.map(({ setType, muscleGroup }) => {
        const exercisePool =
            setType === "compound" ? compoundExercises : accessoryExercises;

        const filteredObj = Object.keys(exercisePool).reduce((acc, curr) => {
            if (
                includedTracker.includes(curr) ||
                !exercisePool[curr]?.muscles.includes(muscleGroup)
            ) {
                return acc;
            }
            return { ...acc, [curr]: exercisePool[curr] };
        }, {});

        const filteredDataList = Object.keys(filteredObj);
        const filteredOppList = Object.keys(
            setType === "compound" ? accessoryExercises : compoundExercises
        ).filter((val) => !includedTracker.includes(val));

        const randomExercise =
            filteredDataList[
                Math.floor(Math.random() * filteredDataList.length)
                ] ||
            filteredOppList[
                Math.floor(Math.random() * filteredOppList.length)
                ];

        if (!randomExercise) {
            return {} as GeneratedWorkout; // Return an empty object for invalid cases
        }

        let repsOrDuration =
            exercises[randomExercise]?.unit === "reps"
                ? Math.min(...SCHEMES[scheme as keyof typeof SCHEMES].repRanges) +
                Math.floor(
                    Math.random() *
                    (Math.max(...SCHEMES[scheme as keyof typeof SCHEMES].repRanges) -
                        Math.min(...SCHEMES[scheme as keyof typeof SCHEMES].repRanges))
                ) +
                (setType === "accessory" ? 4 : 0)
                : Math.floor(Math.random() * 40) + 20;

        const tempo = TEMPOS[Math.floor(Math.random() * TEMPOS.length)];

        if (exercises[randomExercise]?.unit === "reps") {
            const tempoSum = tempo
                .split(" ")
                .reduce((acc, curr) => acc + parseInt(curr), 0);

            if (tempoSum * repsOrDuration > 85) {
                repsOrDuration = Math.floor(85 / tempoSum);
            }
        } else {
            repsOrDuration = Math.ceil(repsOrDuration / 5) * 5; // Adjust to nearest 5 seconds
        }

        includedTracker.push(randomExercise);

        return {
            name: randomExercise,
            tempo,
            rest: SCHEMES[scheme as keyof typeof SCHEMES]?.rest?.[setType === "compound" ? 0 : 1],
            reps: repsOrDuration,
            ...exercises[randomExercise],
        };
    });

    return genWOD.filter((element) => Object.keys(element).length > 0); // Filter out empty objects
}

// Utility function for shuffling arrays
function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

// Flatten exercises into a single-level object


function exercisesFlattener(exercisesObj: Record<string, any>): Record<string, Exercise> {
    const flattenedObj: Record<string, Exercise> = {};

    for (const [key, val] of Object.entries(exercisesObj)) {
        if (!("variants" in val)) {
            flattenedObj[key] = val;
        } else {
            for (const variant in val.variants) {
                const variantName = `${variant}_${key}`;
                const variantSubstitutes = Object.keys(val.variants)
                    .map((element) => `${element} ${key}`)
                    .filter((element) => element.split(" ").join("_") !== variantName);

                flattenedObj[variantName] = {
                    ...val,
                    description: `${val.description}___${val.variants[variant]}`,
                    substitutes: [...(val.substitutes || []), variantSubstitutes].slice(0, 5),
                };
            }
        }
    }
    return flattenedObj;
}