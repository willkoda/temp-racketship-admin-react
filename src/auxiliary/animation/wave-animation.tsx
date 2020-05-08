interface Params {
    event: React.MouseEvent,
    waveElementRef: React.MutableRefObject<HTMLElement>,
    waveColor: string
}

export function waveAnimation(params: Params) {
    const waveElement = document.createElement('span');
    waveElement.style.width = params.waveElementRef.current.offsetWidth / 2 + 'px';
    waveElement.style.height = params.waveElementRef.current.offsetWidth / 2 + 'px';
    waveElement.style.backgroundColor = params.waveColor;
    waveElement.classList.add('wave--animation');
    waveElement.classList.add('--wave');
    params.waveElementRef.current.appendChild(waveElement);

    setTimeout(() => {
        params.waveElementRef.current.removeChild(waveElement);
    }, 750);

    const rect = params.waveElementRef.current.getBoundingClientRect();
    const offset = {
        top: rect.top,
        left: rect.left
    }

    const x = (params.event.pageX - offset.left)
    const y = (params.event.pageY - offset.top)

    waveElement.style.left = `${x}px`;
    waveElement.style.top = `${y}px`;
}