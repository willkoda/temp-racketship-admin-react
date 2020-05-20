interface Params {
    event: React.MouseEvent,
    waveElementRef: React.MutableRefObject<HTMLElement>,
    waveColor: string
}

export function waveAnimation(params: Params) {
    params.waveElementRef.current.style.position = 'relative';
    
    if (!params.waveElementRef.current.querySelector('.wave--cover')) {
        const cover = document.createElement('span');
        cover.classList.add('wave--cover');
        cover.style.position = 'relative';
        cover.style.display = 'block';

        cover.style.width = params.waveElementRef.current.offsetWidth + 'px';
        cover.style.height = params.waveElementRef.current.offsetHeight + 'px';
        cover.style.zIndex = '1';
        cover.style.position = 'absolute';
        cover.style.top = '0px';
        cover.style.left = '0px';
        
        params.waveElementRef.current.appendChild(cover);
    }

    const waveElement = document.createElement('span');
    waveElement.style.width = params.waveElementRef.current.offsetWidth / 2 + 'px';
    waveElement.style.height = params.waveElementRef.current.offsetWidth / 2 + 'px';
    waveElement.style.backgroundColor = params.waveColor;
    waveElement.style.zIndex = '0';
    waveElement.classList.add('wave--animation');
    waveElement.classList.add('--wave');

    const coverElement = params.waveElementRef.current.querySelector('.wave--cover') as HTMLElement;
    coverElement.style.overflow = 'hidden';
    coverElement.appendChild(waveElement);
    setTimeout(() => {
        if (!params.waveElementRef.current) return;
        coverElement?.removeChild(waveElement)
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