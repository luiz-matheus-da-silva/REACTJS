import axios from "axios";

const api = axios.create({
    baseURL: 'https://itunes.apple.com/search'
})

export const musicList = async (term: string, entity: string = 'musicTrack') => {
    try {
        const response = await api.get(`?term=${term}&entity=${entity}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching music data:', error);
        throw error;
    }
}
