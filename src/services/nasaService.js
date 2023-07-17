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

const GetImages = async ({requestToken, page, API_KEY, rover, camera, dateFromPlanet, dateFromDate}) => {
    try {
        let url = `${ROOT_API_URL}/${rover}/photos?${dateFromPlanet}=${dateFromDate}&page=${page}&api_key=${API_KEY}`;
        url = camera ? `${url}&camera=${camera}` : url;
        const response = await axios.get(url, {
            cancelToken: requestToken.token
        });
        
        return response.data.photos.map(photo => PhotosContentType(photo));

    } catch (error) {
        return ErrorHandler(error.response.data.error);
    }
}

const ErrorHandler = (error) => {
    switch (error.code) {
        case 'OVER_RATE_LIMIT':
            return {
                error: true,
                message: "Your API Key has have exceeded your rate limit. Try again later or contact us at https://api.nasa.gov:443/contact/ for assistance"
            };
        default: return { error: true, message: error.message };
    }
}

export { GetRequestToken, CancelRequestToken, GetImages, validateAPIKey }