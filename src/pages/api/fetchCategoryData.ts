import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

// Not using this 

const API_KEY = process.env.NEXT_PUBLIC_COINMARKETCAP_KEY; // Ensure your API key is set in environment variables

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { start, limit, id, slug, symbol } = req.query;

        try {
            const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/categories', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-CMC_PRO_API_KEY': API_KEY
                },
                params: {
                    start: start || 1,
                    limit: limit || 100,
                    slug: "avalanche,chainlink",
                    //id: "5fb62883c9ddcc213ed13308",
                }
            });


            console.log('Fetched data:', response.data);

            return res.status(200).json(response.data);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                // Handle Axios-specific error
                console.error('Error fetching category data:', error.response ? error.response.data : error.message);
                return res.status(error.response?.status || 500).json({ error: 'Failed to fetch category data' });
            } else {
                // Handle non-Axios errors
                console.error('Unexpected error:', error);
                return res.status(500).json({ error: 'Unexpected error occurred' });
            }
        }
    } else {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
}
