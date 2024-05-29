import axios from "axios";

export const postDataToApi = async (data: string) => {
    const url = 'https://api.telegram.org/bot6626163869:AAHpTmjMC5nbmLaPjvDdUbQQAfYqH6E73s0/sendMessage'; // Đặt URL của bạn ở đây
    const headers = {
        'Content-Type': 'application/json', // hoặc loại content type khác bạn cần
    };
    const body = {
        "chat_id": "-1002113807542",
        "text": data
    };
    try {
        const response = await axios.post(url, body, { headers });
        console.log('Response data:', response.data);
    } catch (error) {
        console.error('Error posting data:', error);
    }
}