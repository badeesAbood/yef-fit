import SectionWrapper from "./SectionWrapper.tsx";

function Generator() {
    return (
        <SectionWrapper header={"generate your workout"} title={['It\'s' , 'Huge' , 'o\'clock']}>
            <div className='min-h-screen '>Generator</div>
        </SectionWrapper>
    );
}

export default Generator;