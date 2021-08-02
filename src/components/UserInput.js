import React from 'react';
import Selector from './Selector';

export default function UserInput({getUserInput, getUnit, userInput, unit, options, name}) {

    return (
        <div>
            <input type="number" name="" id="" onChange={getUserInput} value={userInput}/>
            <Selector
                getUnit={getUnit}
                unit={unit}
                options={options}
            />
        </div>
    )
}
