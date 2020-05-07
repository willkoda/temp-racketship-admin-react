interface Params {
    event: React.MouseEvent,
    waveRef: React.MutableRefObject<HTMLSpanElement>,
    waveElementRef: React.MutableRefObject<HTMLElement>
}

export function waveAnimation(params: Params) {

    params.waveRef.current.style.width = params.waveElementRef.current.offsetWidth / 2 + 'px';
    params.waveRef.current.style.height = params.waveElementRef.current.offsetWidth / 2 + 'px';    

    params.waveRef.current.classList.remove('wave--animation');
    setTimeout(() => {
        params.waveRef.current.classList.add('wave--animation');
    }, 100)

    const rect = params.waveElementRef.current.getBoundingClientRect();
    const offset = {
        top: rect.top,
        left: rect.left
    }

    const x = (params.event.pageX - offset.left)
    const y = (params.event.pageY - offset.top)

    params.waveRef.current.style.left = `${x}px`;
    params.waveRef.current.style.top = `${y}px`;
}