import axios from 'axios';
import PhotosContentType from './../contentTypes/photos';

const ROOT_API_URL = 'https://api.nasa.gov/mars-photos/api/v1/rovers';

const GetRequestToken = () => {
    const requestToken = axios.CancelToken.source();
    return requestToken;
}

const validateAPIKey = async (API_KEY) => {
    try {
       const response = await axios.get(`${ROOT_API_URL}/curiosity/photos?sol=1000&page=2&api_key=${API_KEY}`);
       return response;
    }
    catch (error) {
        return { error: true };
    }
}

const CancelRequestToken = ({requestToken}) => {
    try {
        requestToken.cancel();        
    } catch (error) {
        console.log("CancelRequestToken error:", error);
    }
}

const GetImages = async ({requestToken, page, API_KEY, rover,dateFromPlanet, dateFromDate}) => {
    try {
        const response = await axios.get(`${ROOT_API_URL}/${rover}/photos?${dateFromPlanet}=${dateFromDate}&page=${page}&api_key=${API_KEY}`, {
            cancelToken: requestToken.token
        });
        
        return response.data.photos.map(photo => PhotosContentType(photo));

    } catch (error) {
        console.log("GetImages error:", error);
    }
}

export { GetRequestToken, CancelRequestToken, GetImages, validateAPIKey }