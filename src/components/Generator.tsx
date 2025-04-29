import SectionWrapper from "./SectionWrapper.tsx";
import {SCHEMES, WORKOUTS} from "../utils/swoldier.ts";
import {useState} from "react";


export function Header(props: { title: string, index: string, description: string }) {

    const {index, title, description} = props;

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex items-center justify-center gap-2'>
                <p className={'text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-400'}>{index}</p>
                <h4 className={'text-xl sm:text-2xl md:text-3xl '}>
                    {title}
                </h4>
            </div>
            <p className={'text-sm sm:text-base mx-auto'}>{description}</p>
        </div>
    );
}


function Generator() {
    const [showModal, setShowModal] = useState<boolean>(false);
    // const [poison, setPoison] = useState<string>('individual');
    // const [muscle, setMuscle] = useState<string[]>([]);
    // const [goal, setGoal] = useState<string>('strength_power');

    function  toggleModal() {
        setShowModal(!showModal);
    }
    return (
        <SectionWrapper header={"generate your workout"} title={['It\'s', 'Huge', 'o\'clock']}>
            <Header index={'01'} title={"Pick Your Poison"} description={"Select the workout you wish to endure"}/>
            <div className={'grid grid-cols-2 sm:grid-cols-4 gap-4'}>
                {Object.keys(WORKOUTS).map((value, key) => (
                    <button className={'bg-slate-950 border border-blue-400 duration-200 hover:border-blue-600 py-3 rounded-xl'}
                            key={key}>

                        <p className={'capitalize'}> {value.replace('_', ' ')}</p>
                    </button>
                ))}

            </div>
            <Header index={'02'} title={"Lock on targets"} description={"Select the  muscle judged for annihilation"}/>
            <div className={'bg-slate-950 border border-solid border-blue-400 rounded-xl flex flex-col'}>
                <button onClick={toggleModal} className={' relative flex items-center p-3 justify-center'}>
                    <p>Select muscle  groups</p>
                    <i className={'fa-solid fa-caret-down absolute right-2 top-1/2 -translate-y-1/2'}></i>
                </button>
                {showModal && (
                    <div>
                        Modal
                    </div>
                ) }
            </div>
            <Header index={'03'} title={"Pick Your Poison"} description={"Select the workout you wish to endure"}/>
            <div className={'grid grid-cols-3 gap-4'}>
                {Object.keys(SCHEMES).map((value, key) => (
                    <button className={'bg-slate-950 border border-blue-400 duration-200 hover:border-blue-600 py-3 rounded-xl'}
                            key={key}>

                        <p className={'capitalize'}> {value.replace('_', ' ')}</p>
                    </button>
                ))}

            </div>
        </SectionWrapper>
    );
}

export default Generator;