import { QueryKey } from 'react-query';
import { axiosInstanceWithAuthNoInterceptor } from '../../utils/axiosConfig';
import { User } from './interface';
import { API_URLS } from '../../constants/api';

export const fetchUserDetails = async ({ queryKey }:  { queryKey: QueryKey }): Promise<User> => {
    const [, user] = queryKey as [string, User];

    const response = await axiosInstanceWithAuthNoInterceptor.get<User>(API_URLS.USER_GET(user.id));

    return response.data;
};