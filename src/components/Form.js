import React, { useState, useCallback } from 'react'


const Form = ({ handleAccess }) => {
    const [inputValue, setInputValue] = useState('');


    const handleChange = (e) => {
        const { value } = e.target;
        setInputValue(value);
    }

    return (
        <>
            <form onSubmit={(e) => handleAccess(e, inputValue)}>
                <label>Mnemonic Phrase: </label>
                <input
                    name="mnemonicWords"
                    className="mnemonic"
                    type="text"
                    placeholder="12/24 words..."
                    value={inputValue}
                    onChange={handleChange}
                />
                <button type="submit">Enter</button>
            </form>
            <div className="test-wallet">
                <h3>Test Mnemonic Phrase:</h3>
                <p>before arrest guilt dirt inherit sun affair ship canoe keep explain dumb</p>
            </div>
        </>
    )
}

export default Form;