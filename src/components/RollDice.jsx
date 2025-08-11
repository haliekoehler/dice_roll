// RollDice.js File
import React, { Component } from 'react'
import './RollDice.css'
import Die from './Die'

class RollDice extends Component {

    // Face numbers passes as default props
    static defaultProps = {
        sides: ['one', 'two', 'three',
            'four', 'five', 'six'],
        numDice: 2 //number of dice to role
    }
    constructor(props) {
        super(props)

        // States
        this.state = {
            //use array to allow dynamic # of die
            dice: Array.from({length: this.props.numDice }, () => 'one'),
            rolling: false,
            numDice: this.props.numDice // controlled by user input
        }
        this.roll = this.roll.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        const value = parseInt(e.target.value)
        this.setState({ numDice: isNaN(value) ? 0 : value })
    }

    updateDiceCount() {
        const { numDice } = this.state
        const newDice = Array.from({ length: numDice }, () => 'one')
        this.setState({ dice: newDice })
    }

    roll() {
        const { sides } = this.props
        const { numDice } = this.state
        this.setState({rolling: true})

        setTimeout(() => {
            const newDice = Array.from({ length: numDice }, () =>
                sides[Math.floor(Math.random() * sides.length)]
            )
            this.setState({
                dice: newDice,
                rolling: false                
            })
        }, 1000)
    }

    render() {
        const handleBtn = this.state.rolling ?
            'RollDice-rolling' : ''
        const { die1, die2, rolling } = this.state
        return (
            <div className='RollDice'>
                <div className='RollDice-settings'>
                    <input
                        type='number'
                        min='1'
                        value={this.state.numDice}
                        onChange={this.handleChange}
                    />
                    <button onClick={this.updateDiceCount}>
                        Set Number of Dice
                    </button>
                </div>
                <div className='RollDice-container'>
                    {this.state.dice.map((face, idx) => (
                        <Die key={idx} face={face} rolling={this.state.rolling} />
                    ))}
                </div>
                <button className={handleBtn}
                    disabled={this.state.rolling}
                    onClick={this.roll}>
                    {this.state.rolling ? 'Rolling' : 'Roll Dice!'}
                </button>
                
            </div>
        )
    }
}

export default RollDice