import React, { useState } from 'react';
import Form from './Form';
import Crypto from './Crypto';
import './App.css';


const App = () => {
  const [mnemonicPhrase, setMnemonicPhrase] = useState('');
  const [addressesNumber, setAddressesNumber] = useState(0)

  const handleAccess = (e, mnemonic, number) => {
    e.preventDefault();

    if (mnemonic === "" || number < 1) {
      return alert("Incorrect informations")
    }
    setMnemonicPhrase(mnemonic)
    setAddressesNumber(number)
  }



  return (
    <div className="App">
      {mnemonicPhrase ? <Crypto mnemonic={mnemonicPhrase} addressesNumber={addressesNumber} /> : <Form handleAccess={handleAccess} />}
    </div>
  );
}

export default App;
