import React, { FormEvent } from 'react';
import './RadioGroup.scss';

interface Props {
    name: string;
    options: Array<{
        label: string;
        value: string;
    }>
}

function RadioGroup(props: Props) {
    const changeHandler = (e: FormEvent) => {
        const target = e.target as HTMLElement;
        const container = target.closest('div.radio--button');
        const waveContainer = container?.querySelector('div.wave--container') as HTMLDivElement;

        const waveElement = document.createElement('span');
        waveElement.classList.add('wave--animation');
        waveElement.classList.add('--wave');
        waveElement.style.width = `${waveContainer.offsetHeight / 2}px`;
        waveElement.style.height = `${waveContainer.offsetWidth / 2}px`;
        waveElement.style.top = '50%';
        waveElement.style.left = '50%';
        waveElement.style.background = 'var(--accent-one-shade-one)';
        waveContainer.appendChild(waveElement);
        setTimeout(() => {
            if (!waveContainer) return;
            waveContainer.removeChild(waveElement);
        }, 750);
    }

    return (
        <div className="RadioGroup">
            <div className="radio--buttons" onChange={changeHandler}>
                {
                    props.options.map((option, index) => (
                        <label htmlFor={option.value} key={index}>
                            <div className="radio--button">
                                <input type="radio" id={option.value} name={props.name}/>
                                <div className="wave--container">
                                    <div className="hover--wave"></div>
                                </div>
                                <div className="radio--sphere">
                                    <div className="inner--sphere"></div>
                                </div>
                            </div>
                            <span className="radio--label">{option.label}</span>
                        </label>
                    ))
                }
            </div>
        </div>
    )
}

export default RadioGroup;