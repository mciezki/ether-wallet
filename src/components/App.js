import React, { useState } from 'react';
import Form from './Form';
import Crypto from './Crypto';
import './App.css';


const App = () => {
  const [mnemonicPhrase, setMnemonicPhrase] = useState('');


  const handleAccess = (e, mnemonic, number) => {
    e.preventDefault();

    if (mnemonic === "" || number < 1) {
      return alert("Incorrect informations")
    }
    setMnemonicPhrase(mnemonic);
  }


  return (
    <div className="App">
      {mnemonicPhrase ? <Crypto mnemonic={mnemonicPhrase} setMnemonic={setMnemonicPhrase} /> : <Form handleAccess={handleAccess} />}
    </div>
  );
}

export default App;
