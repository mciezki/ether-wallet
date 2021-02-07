import React, { useState } from 'react'


const Form = ({ handleAccess }) => {
    const [inputValue, setInputValue] = useState('');
    const [numberValue, setNumberValue] = useState(5)


    const handleChange = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case 'mnemonicWords':
                setInputValue(value);
                break;
            case 'addressesNumber':
                setNumberValue(value);
                break;
            default:
                alert(`Sorry, ${name} does not exist. Report this to us and we will check what happened.`);
        }
    }

    return (
        <>
            <form onSubmit={(e) => handleAccess(e, inputValue, numberValue)}>
                <label>Write down Mnemonic Phrase: </label>
                <input
                    name="mnemonicWords"
                    type="text"
                    placeholder="12/24 words..."
                    value={inputValue}
                    onChange={handleChange}
                />
                <label>How many addresses? </label>
                <input
                    name="addressesNumber"
                    type="number"
                    value={numberValue}
                    onChange={handleChange}
                />
                <button type="submit">Enter</button>
            </form>
            <div>
                <h3>Test Mnemonic Phrase:</h3>
                <p>before arrest guilt dirt inherit sun affair ship canoe keep explain dumb</p>
            </div>
        </>
    )
}

export default Form;