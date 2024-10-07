import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import contractAddress from '../contracts/contract-address.json';
import TokenArtifact from '../contracts/Token.json';

const TokenData = () => {
    const [tokenName, setTokenName] = useState('');
    const [tokenSymbol, setTokenSymbol] = useState('');
    const [totalSupply, setTotalSupply] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // เชื่อมต่อกับ MetaMask
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = provider.getSigner();

                // สร้าง instance ของ contract โดยใช้ที่อยู่และ ABI
                const contract = new ethers.Contract(
                    contractAddress.Token,
                    TokenArtifact.abi,
                    signer
                );

                // ดึงข้อมูลจากสัญญาอัจฉริยะ
                const name = await contract.name();
                const symbol = await contract.symbol();
                const supply = await contract.totalSupply();

                // อัพเดตข้อมูลใน state
                setTokenName(name);
                setTokenSymbol(symbol);
                setTotalSupply(ethers.utils.formatUnits(supply, 18));
            } catch (error) {
                console.error('Error fetching data from contract:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Token Information</h2>
            <p><strong>Name:</strong> {tokenName}</p>
            <p><strong>Symbol:</strong> {tokenSymbol}</p>
            <p><strong>Total Supply:</strong> {totalSupply}</p>
        </div>
    );
};

export default TokenData;
