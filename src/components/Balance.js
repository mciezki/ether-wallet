import React, { useState } from 'react';
import Transaction from './Transaction';

import { Wallet } from "ethers";
import { formatEther } from 'ethers/lib/utils';

// "before arrest guilt dirt inherit sun affair ship canoe keep explain dumb"

const Balance = ({ walletAddresses, mnemonic, provider }) => {
    const [openBalance, setOpenBalance] = useState(false)
    const [addressBalance, setAddressBalance] = useState('');
    const [walletId, setWalletId] = useState('')


    const selectAddress = async (e) => {
        const id = e.target.options[e.target.selectedIndex].id;
        setWalletId(id)
        setAddressBalance('')
        if (id === "empty") {
            setOpenBalance(false)
            return;
        }
        setOpenBalance(true);
        let node = Wallet.fromMnemonic(`${mnemonic}`, `m/44'/60'/0'/0/${id}`);
        node = node.connect(provider);
        await node.getBalance()
            .then(response => formatEther(response._hex))
            .then(response => setAddressBalance(response))
    }

    const selectList = walletAddresses.map((address, index) => <option key={index} id={index} value={address}>{address}</option>)

    return (
        <div>
            <p>Select Wallet Address:</p>
            <select name="addresses" className="ad" onChange={selectAddress}>
                <option value="--" id="empty">--</option>
                {selectList}
            </select>
            {openBalance ?
                addressBalance ? <><p>{addressBalance} ROP</p> <Transaction walletId={walletId} addressBalance={addressBalance} mnemonic={mnemonic} provider={provider} /></>
                    : <p>Loading...</p>
                : null}
        </div>
    )
}

export default Balance;