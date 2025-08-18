// RollDice.js
import React, { useState, useEffect } from 'react'
import './RollDice.css'
import Die from './Die'

const RollDice = ({ sides = ['one', 'two', 'three', 'four', 'five', 'six'], numDice: defaultNumDice = 2 }) => {
    const [numDice, setNumDice] = useState(defaultNumDice)
    const [dice, setDice] = useState(Array.from({ length: defaultNumDice }, () => 'one'))
    const [rolling, setRolling] = useState(false)

    useEffect(() => {
        setDice(Array.from({ length: numDice }, () => 'one'))
    }, [numDice])

    const handleChange = (e) => {
        const value = parseInt(e.target.value)
        setNumDice(isNaN(value) ? 0 : value)
    }

    const roll = () => {
        setRolling(true)
        setTimeout(() => {
            const newDice = Array.from({ length: numDice }, () =>
                sides[Math.floor(Math.random() * sides.length)]
            )
            setDice(newDice)
            setRolling(false)
        }, 1000)
    }

    return (
        <div className='RollDice'>
            <h1>Dice Roller!</h1>
            <div>
                <div>
                    <div className='RollDice-settings'>
                        <label htmlFor="numberOfDie">Number of Die:</label>
                        <input
                            id="numberOfDie"
                            type='number'
                            min='1'
                            value={numDice}
                            onChange={handleChange}
                        />
                        <button
                        className={rolling ? 'RollDice-rolling' : ''}
                        disabled={rolling}
                        onClick={roll}
                        >
                            {rolling ? 'Rolling' : 'Roll Dice!'}
                        </button>
                    <div className='RollDice-results'>
                        <h2>Results:</h2>
                        <ul>
                            {dice.map((face, idx) => (
                                <li key={idx}>Die {idx + 1}: {face}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
                <div className='RollDice-container'>
                    {dice.map((face, idx) => (
                        <Die key={idx} face={face} rolling={rolling} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RollDice
