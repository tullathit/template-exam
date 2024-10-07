import React, { useState } from 'react';
import { ethers } from 'ethers';
import contractAddress from '../contracts/contract-address.json';
import TokenArtifact from '../contracts/Token.json';

const SaveData = () => {
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const saveDataToBlockchain = async () => {
        try {
            // เชื่อมต่อกับ MetaMask
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send('eth_requestAccounts', []);
            const signer = provider.getSigner();

            // สร้าง instance ของ contract
            const contract = new ethers.Contract(
                contractAddress.Token,
                TokenArtifact.abi,
                signer
            );

            // เรียกใช้ฟังก์ชัน updateMessage ใน smart contract
            const tx = await contract.updateMessage(message);
            setStatus('Transaction sent! Waiting for confirmation...');

            // รอให้ธุรกรรมได้รับการยืนยัน
            await tx.wait();
            setStatus('Transaction confirmed! Message saved to blockchain.');
        } catch (error) {
            console.error('Error saving data:', error);
            setStatus('Error: ' + error.message);
        }
    };

    return (
        <div>
            <h2>Save Data to Blockchain</h2>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter message"
            />
            <button onClick={saveDataToBlockchain}>Save to Blockchain</button>
            <p>{status}</p>
        </div>
    );
};

export default SaveData;
