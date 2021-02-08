import React, { useState } from 'react';
import Transaction from './Transaction';

import { Wallet } from "ethers";
import { formatEther } from 'ethers/lib/utils';

// "before arrest guilt dirt inherit sun affair ship canoe keep explain dumb"

const Balance = ({ walletAddresses, mnemonic, provider, addressInQueue, setQueue }) => {
    const [openBalance, setOpenBalance] = useState(false)
    const [addressBalance, setAddressBalance] = useState('');
    const [walletId, setWalletId] = useState('')

    const handleQueue = (e) => {
        const { id } = e.target
        switch (id) {
            case 'plus':
                setQueue(prevState => prevState + 5);
                break;
            case 'minus':
                setQueue(prevState => prevState - 5);
                break;
            default:
                alert(`Error, try again :)`);
        }
    }


    const selectAddress = async (e) => {
        const id = e.target.id;
        setWalletId(id)
        setAddressBalance('')
        setOpenBalance(true);
        let node = Wallet.fromMnemonic(`${mnemonic}`, `m/44'/60'/0'/0/${id}`);
        node = node.connect(provider);
        await node.getBalance()
            .then(response => formatEther(response._hex))
            .then(response => setAddressBalance(response))
    }

    const selectList = walletAddresses.map((address, index) => <li key={index} id={address.id} onClick={selectAddress}>{address.address}</li>)

    return (
        <div>
            <h3 className="select-title">Select Wallet Address:</h3>
            <ul>
                {selectList}
            </ul>
            {addressInQueue >= 5 ? <button id="minus" onClick={handleQueue}>Previous addresses</button> : null}
            <button id="plus" onClick={handleQueue}>Next addresses</button>
            {openBalance ?
                addressBalance ? <div className="value-container"><p className="crypto-value">{addressBalance} <span>ROP</span></p> <Transaction walletId={walletId} addressBalance={addressBalance} mnemonic={mnemonic} provider={provider} /></div>
                    : <p className="waiting">Loading...</p>
                : null}
        </div>
    )
}

export default Balance;