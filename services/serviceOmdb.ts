import { API_OMDB } from "./http";

export const getMovies = async (params: any) => {
    const endpoint = "";
  
    const request = await API_OMDB.get(endpoint, { params });
    const response = request.data;
  
    return response;
};
