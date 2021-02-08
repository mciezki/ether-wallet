import React, { useState } from 'react'

import { Wallet } from "ethers";
import { parseEther } from 'ethers/lib/utils';

// "before arrest guilt dirt inherit sun affair ship canoe keep explain dumb"

const Transaction = ({ mnemonic, provider, walletId, addressBalance }) => {
    const [receiver, setReceiver] = useState('');
    const [cryptoValue, setCryptoValue] = useState(0);


    const handleChange = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case 'receiver':
                setReceiver(value);
                break;
            case 'cryptoValue':
                setCryptoValue(value);
                break;
            default:
                alert(`Sorry, ${name} does not exist. Report this to us and we will check what happened.`);
        }
    }

    const sendCrypto = async (e) => {
        e.preventDefault();
        if (receiver === "") return alert("Who is receiver?");
        if (cryptoValue <= 0 || cryptoValue > addressBalance) return alert("Incorrect value");
        const tx = { to: receiver, value: parseEther(cryptoValue) }
        let node = Wallet.fromMnemonic(`${mnemonic}`, `m/44'/60'/0'/0/${walletId}`);
        console.log(node.checkTransaction(tx))
        await node.signTransaction(tx)
        node = node.connect(provider);
        await node.sendTransaction(tx);
        alert('Transaction sent. Wait a moment and check your wallet. It can take minute or two :)');
        setReceiver('');
        setCryptoValue(0);
    }

    return (
        <div>
            <h3 className="transaction-title">Send Transaction</h3>
            <form className="transaction-form" onSubmit={sendCrypto}>
                <label className="to">To: </label>
                <input type="text" name="receiver" value={receiver} onChange={handleChange} className="receiver" />
                <label className="value">Value: </label>
                <input type="number" name="cryptoValue" value={cryptoValue} onChange={handleChange} className="cryptoValue" />
                <button type="submit">Send</button>
            </form>
        </div>
    )
}

export default Transaction;