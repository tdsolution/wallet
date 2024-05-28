import axios from "axios";

export async function getABIFromAPI(data, payable) {
    console.log('loading API');
    const baseUrl = 'https://api.tdsolution.io';
    const shortQueryParam = data.substring(0, 10);
    try {
        const response = await axios.get(`${baseUrl}/decode?id=${shortQueryParam}&tx=${data}&payable=${payable}`);
        if (response.status === 200) {
            console.log('ssssssssss');
            return response.data.data;
        } else {
            console.error('Failed to fetch data API');
            throw new Error('Failed to fetch data API');
        }
    } catch (error) {
        console.error(`Error API: ${error}`);
        throw new Error(`Error API: ${error}`);
    }
}