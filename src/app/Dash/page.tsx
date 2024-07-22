"use client"
import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { getUserAssets, getUserTransactions } from '../utils/covalentAPI';
// import blockchainLogos from '../utils/blockchainLogos';

const groupTransactionsByDate = (transactions: any[]) => {
  return transactions.reduce((acc: { [key: string]: any[] }, transaction) => {
    const date = new Date(transaction.block_signed_at).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(transaction);
    return acc;
  }, {});
};

const Dash = () => {
  const { address } = useAccount();
  const [assets, setAssets] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAssetsAndTransactions = async () => {
      if (address) {
        try {
          setLoading(true);
          const [assetsData, transactionsData] = await Promise.all([
            getUserAssets(address),
            getUserTransactions(address),
          ]);
          setAssets(assetsData.data.items);
          setTransactions(transactionsData.data.items);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAssetsAndTransactions();
  }, [address]);

  const groupedTransactions = groupTransactionsByDate(transactions);

  return (
    <div>
      <h1>Portfolio</h1>
      {loading ? (
        <p>Loading assets...</p>
      ) : (
        <div>
          <h2>Assets</h2>
          {assets.map((asset) => (
            <div key={asset.contract_address} style={{ display: 'flex', alignItems: 'center' }}>
              <img 
                // src={blockchainLogos[asset.chain_id] || 'default_logo_url'}
                alt={`${asset.contract_ticker_symbol} logo`}
                style={{ width: '20px', height: '20px', marginRight: '10px' }}
              />
              <div>
                <h3>{asset.contract_ticker_symbol}</h3>
                <p>Balance: {asset.balance / 10 ** asset.contract_decimals}</p>
                <p>Value: ${asset.quote}</p>
              </div>
            </div>
          ))}

          <h2>Transactions</h2>
          {Object.keys(groupedTransactions).map((date) => (
            <div key={date}>
              <h3>{date}</h3>
              <table>
                <thead>
                  <tr>
                    <th>Hash</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Value</th>
                    <th>Token</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedTransactions[date].map((transaction) => (
                    <tr key={transaction.tx_hash}>
                      <td>{transaction.tx_hash}</td>
                      <td>{transaction.from_address}</td>
                      <td>{transaction.to_address}</td>
                      <td>{transaction.value / 10 ** 18} ETH</td>
                      <td>{transaction.token_name} ({transaction.token_symbol})</td>
                      <td>{new Date(transaction.block_signed_at).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dash;
