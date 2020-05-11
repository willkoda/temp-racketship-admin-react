import React, {useCallback, useRef, useLayoutEffect} from 'react';
import './SearchInput.scss';
import {debounce} from 'lodash';
import PropTypes from 'prop-types';

{/* <SearchInput 
    searchCallback={searchCallback} id="filter-members" value={props.ownerMembers.searchQuery} margin="margin-bottom-10" /> */}

interface Props {
    searchCallback(params: {eventType: string, value: string}): void;
    id: string;
    value: string;
    margin?: string
}

function SearchInput(props: Props) {
    const inputRef = useRef<HTMLInputElement>(null!);
    const placeholderRef = useRef(null!);
    const debouncedSearchCallback = useCallback(debounce(props.searchCallback, 500), []);

    useLayoutEffect(() => {
        if (props.value.length > 0) {
            inputRef.current.dataset.hasContent = 'true'
        } else {
            inputRef.current.dataset.hasContent = 'false'
        }
    }, [props.value])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        debouncedSearchCallback({eventType: 'debounced', value: e.target.value});
        props.searchCallback({eventType: 'immediate', value: e.target.value})
    }

    return (
        <label htmlFor={props.id} className={`SearchInput ${props.margin}`}>
            <input id={props.id} type="text" onChange={handleChange} ref={inputRef} value={props.value || ''} />
            <span className="input--placeholder" ref={placeholderRef}>Search</span>
            <div className="input--border"></div>
        </label>
    )
}

SearchInput.propTypes = {
    id:  PropTypes.string.isRequired,
    margin: PropTypes.string,
    searchCallback: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
}

export default SearchInput;