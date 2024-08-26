import { axiosInstanceWithAuthNoInterceptor } from '../../utils/axiosConfig';
import { Config } from './interface';
import { API_URLS } from '../../constants/api';

export const fetchConfig = async (): Promise<Config> => {
    const response = await axiosInstanceWithAuthNoInterceptor.get<Config>(API_URLS.CONFIG, {

    });

    return response.data;
};