import React from 'react'

export default function Selector({getUnit,unit,options,name}) {
    return (
        <select name={name} id={name} onChange={getUnit} value={unit}>
            {
                options.map((option)=>(<option key={option} value={option}>{option}</option>))
            }
        </select>
    )
}
