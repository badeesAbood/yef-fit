
function Button(props: { onClick: () => void, title: string }) {

    const {onClick, title} = props;
    return (
        <button onClick={onClick}

                className='px-8 py-4 mx-auto rounded-md border-2 border-blue-400 border-solid bg-slate-950 blueShadow'>
            <p>{title}</p></button>
    );
}

export default Button;