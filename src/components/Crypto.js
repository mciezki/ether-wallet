import React, { useState, useEffect } from 'react'
import Balance from './Balance';

import { Wallet, getDefaultProvider } from "ethers";

// "before arrest guilt dirt inherit sun affair ship canoe keep explain dumb"


const Crypto = ({ mnemonic, addressesNumber }) => {
    const [walletAddresses, setWalletAddresses] = useState([]);
    const provider = getDefaultProvider('ropsten');

    useEffect(() => {
        (async () => {
            let addressList = [];
            for (let i = 0; i < addressesNumber; i++) {
                let node = Wallet.fromMnemonic(`${mnemonic}`, `m/44'/60'/0'/0/${i}`);
                node = node.connect(provider);
                await node.getAddress().then(response => addressList.push(response))
                console.log(addressList);
            }
            setWalletAddresses(addressList)
        })()
    }, [])


    return (
        <>{walletAddresses.length ?
            <Balance walletAddresses={walletAddresses} mnemonic={mnemonic} provider={provider} />
            : <p>Loading...</p>}</>
    )
}

export default Crypto;