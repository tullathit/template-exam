import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import TokenArtifact from '../contracts/Token.json';

function HomePage() {
  const [totalSupply, setTotalSupply] = useState(0);

  useEffect(() => {
    const fetchTotalSupply = async () => {
      try {
        // เชื่อมต่อกับ MetaMask
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();

        // สร้าง instance ของ contract โดยใช้ signer
        const contract = new ethers.Contract(
          '0x7a8E6B04A56418b4C73d0FE636bD7d224c3D9050', // ที่อยู่ของ Smart Contract
          TokenArtifact.abi,
          signer
        );

        // เรียกใช้ฟังก์ชัน `totalSupply` จาก Smart Contract
        const supply = await contract.totalSupply();

        // แปลงค่าและอัพเดตข้อมูลใน state
        setTotalSupply(ethers.utils.formatUnits(supply, 18));
      } catch (error) {
        console.error('Error fetching total supply:', error);
      }
    };

    fetchTotalSupply();
  }, []);

  return (
    <div>
      <h1>Total Supply: {totalSupply}</h1>
    </div>
  );
}

export default HomePage;
