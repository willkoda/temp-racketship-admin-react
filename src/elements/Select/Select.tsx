import React, {useState, useLayoutEffect, useRef, useEffect, useCallback} from 'react';
import './SelectStyle.scss';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {countries} from './select-countries';

type SelectOptionsType = Array<{text: string, value: number | string}> | [];

interface Props {
    error: string;
    id: string;
    initialValue: string;
    options: Array<{text: string, value: number | string}>;
    select(result: SelectResultInterface): void;
    selectColor: string;
    selectContent: 'countries';
    selectText: string;
}

function Select(props: Props) {
    const mappedCountries = countries.map(country => {
        return {
            text: country,
            value: country
        }
    });
    const [optionSelected, setOptionSelected] = useState<number | string>(null!);
    const [selectOptions, setSelectOptions] = useState<SelectOptionsType>(props.selectContent === 'countries' ? mappedCountries : []);
    const [filteredSelectOptions, setFilteredSelectOptions] = useState<SelectOptionsType>(props.selectContent === 'countries' ? mappedCountries : []);
    const [expanded, setExpanded] = useState(true);
    const [pristine, setPristine] = useState(true);
    const list = useRef<HTMLUListElement>(null!);
    const arrow = useRef(null);
    const selectText = useRef<HTMLSpanElement>(null!);
    const input = useRef<HTMLInputElement>(null!);
    const mainSelect = useRef(null);

    return (
        <div>fix later</div>
    )
    // const changeHandler = (e: React.ChangeEvent) => {
    //     if (expanded) {
    //         setExpanded(false);
    //     }
    //     const targetValue = e.target.value.toLowerCase();
    //     const filteredOptions = selectOptions.filter(element => {
    //         const elementValue = element.value.toLowerCase();
    //         return elementValue.includes(targetValue) || element.text.includes(targetValue);
    //     });

    //     setFilteredSelectOptions(filteredOptions);
    // }

    // const keyDownHandler = (e: React.KeyboardEvent) => {
    //     if (e.keyCode === 13) e.preventDefault();
    // }
    
    // const click = (e: React.MouseEvent) => {
    //     input.current.focus();
    //     e.stopPropagation();
        
    //     if (e.target.getAttribute('value') && e.target.tagName === 'LI') { 
    //         input.current.value = e.target.innerText;
            
    //         const updatedOptions = filteredSelectOptions.map(element => {
    //             let ariaSelected = false; 
    //             if (element.value === e.target.value) {
    //                 ariaSelected = true;
    //             }
    //             return {
    //                 ...element,
    //                 ariaSelected: ariaSelected
    //             }
    //         });
    //         setFilteredSelectOptions(updatedOptions);
    //         setOptionSelected(e.target.getAttribute('value'));

    //         const result = {
    //             origin: props.id,
    //             value: e.target.getAttribute('value'),
    //             valid: e.target.getAttribute('value') ? true : false,
    //         }
        
    //         props.select(result);
    //     }
        
    //     setExpanded(!expanded);
    //     setPristine(false);
    // }
    
    // const closeSelect = useCallback(() => {
    //     if (!expanded) {
    //         setExpanded(true);
    //     }
    // }, [expanded]);

    // useLayoutEffect(() => {
    //     if (expanded) {
    //         list.current.style.opacity = '0';
    //         list.current.style.transform = 'scale(0.8)';
    //         setTimeout(() => {
    //             if (list.current) list.current.style.visibility = 'hidden'; 
    //         }, 230);

    //         arrow.current.style.transform = 'rotate(-0deg)';
    //     } else {
    //         list.current.style.visibility = 'visible';
    //         list.current.style.opacity = '1';
    //         list.current.style.transform = 'scale(1)';

    //         arrow.current.style.transform = 'rotate(-180deg)';
    //     }
    //     mainSelect.current.setAttribute('aria-expanded', !expanded);
    // }, [expanded]);

    // useEffect(() => {
    //     window.addEventListener('click', closeSelect);

    //     return () => {
    //         window.removeEventListener('click', closeSelect);
    //     }
    // }, [closeSelect]);

    // useLayoutEffect(() => {
    //     if (!pristine) {
    //         selectText.current.style.transform = 'translate(0, -21px) scale(0.7)';
    //         selectText.current.style.color = props.selectColor || 'var(--accent-one-shade-two)';
    //     }
    // }, [pristine, props.selectColor]);

    // useEffect(() => {
    //     if (props.options) {
    //         setSelectOptions(props.options);
    //         setFilteredSelectOptions(props.options);
    //     }
    // }, [props.options]);

    // useEffect(() => {
    //     if (props.selectContent === 'countries' && props.initialValue) {
    //         const country = selectOptions.find(element => element.value === props.initialValue);            
    //         setOptionSelected(country!.value);
    //         input.current.value = country!.text;
    //         setPristine(false);
    //     }

    //     if (props.initialValue) {
    //         setOptionSelected(props.initialValue);
    //         input.current.value = props.initialValue;
    //         setPristine(false);
    //     }
    // }, [props.initialValue, props.selectContent, selectOptions])

    // return (
    //     <div 
    //         className="Select" 
    //         aria-label="Select" 
    //         role="combobox" 
    //         aria-expanded="false" 
    //         aria-owns={`owned-${props.id}`} 
    //         aria-haspopup="listbox"
    //         aria-controls={`owned-${props.id}`}
    //         onClick={click}
    //         ref={mainSelect}
    //         onKeyDown={keyDownHandler}
    //     >
            
    //         <span className="select--text" ref={selectText}>{props.selectText || 'Select'}</span>
            
    //         <input
    //             className="padding-right-20"
    //             aria-multiline="false"
    //             type="text"
    //             aria-activedescendant="selected-option"
    //             ref={input}
    //             onChange={changeHandler}
    //         /> 

    //         <ArrowDropDownIcon className="select--icon" ref={arrow}  />

    //         <ul className="select--list" role="listbox" id={`owned-${props.id}`} ref={list} onClick={click} >
    //             {filteredSelectOptions.map((element, index) => {
    //                 return <li role="option" aria-selected={element.value === optionSelected ? 'true' : 'false'} key={index} value={element.value}>{element.text}</li>
    //             })}
    //         </ul>
    //         <div className="select--error">{props.error}</div>
    //     </div>
    // )
}

export interface  SelectResultInterface {
    origin: string; 
    value: string;
    valid: boolean;
}

export default Select;