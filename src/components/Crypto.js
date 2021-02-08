import React, { useState, useEffect, useCallback } from 'react'
import Balance from './Balance';

import { Wallet, getDefaultProvider } from "ethers";

// "before arrest guilt dirt inherit sun affair ship canoe keep explain dumb"


const Crypto = ({ mnemonic, setMnemonic }) => {
    const [walletAddresses, setWalletAddresses] = useState([]);
    const [addressInQueue, setAddressInQueue] = useState(0)
    const provider = getDefaultProvider('ropsten');

    const handleMnemonic = useCallback(() => {
        setMnemonic('')
    }, [setMnemonic])

    useEffect(() => {
        (async () => {
            try {
                let addressList = [];
                for (let i = addressInQueue; i < addressInQueue + 5; i++) {
                    let node = Wallet.fromMnemonic(`${mnemonic}`, `m/44'/60'/0'/0/${i}`);
                    node = node.connect(provider);
                    await node.getAddress().then(response => addressList.push({ address: response, id: i }));
                    console.log(addressList);
                }
                setWalletAddresses(addressList)
            } catch (error) {
                alert(error);
                handleMnemonic()
            }
        })()
    }, [addressInQueue])


    return (
        <>{walletAddresses.length ?
            <Balance walletAddresses={walletAddresses} mnemonic={mnemonic} provider={provider} addressInQueue={addressInQueue} setQueue={setAddressInQueue} />
            : <p className="loading">Loading...</p>}</>
    )
}

export default Crypto;