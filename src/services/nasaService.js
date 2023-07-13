import axios from 'axios';
const ROOT_API_URL = 'https://api.nasa.gov/mars-photos/api/v1/rovers';

const GetRequestToken = () => {debugger;
    const requestToken = axios.CancelToken.source();
    return requestToken;
}

const CancelRequestToken = ({requestToken}) => {
    try {
        requestToken.cancel();        
    } catch (error) {
        console.log("CancelRequestToken error:", error);
    }
}

const GetImages = async ({requestToken, page, API_KEY, rover,dateFromPlanet, dateFromDate}) => {
    try {debugger
        const response = await axios.get(`${ROOT_API_URL}/${rover}/photos?${dateFromPlanet}=${dateFromDate}&page=${page}&api_key=${API_KEY}`, {
            cancelToken: requestToken.token
        });
        return response.data.photos;
    } catch (error) {
        console.log("GetImages error:", error);
    }
}

export { GetRequestToken, CancelRequestToken, GetImages }