import axios, {
    AxiosError,
    AxiosRequestConfig,
    AxiosResponse,
    RawAxiosRequestHeaders,
} from 'axios';
import { GetServerSidePropsContext } from 'next';
import { toast } from 'react-toastify';
import { getToken } from './auth';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export const fetcher = <T>(url: string) => httpRequest<T>(url, 'GET').then((res) => res.data);

interface ErrorResponse {
    detail: string;
}

export type ApiError = AxiosError<ErrorResponse>;

// Send http request to the api
const httpRequest = <T>(
    url: string,
    method: HttpMethod = 'GET',
    params?: { [name: string]: any },
    hasFile: boolean = false,
    ssrToken?: string | null,
    onUpload?: (progressEvent: any) => void,
): Promise<AxiosResponse<T>> => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    // Get JWT from browser cookies
    const token: string | null = ssrToken ? ssrToken : getToken();

    // Set request content type
    let headers: RawAxiosRequestHeaders = {
        'Content-Type': hasFile ? 'multipart/form-data' : 'application/json',
    };

    // Set Authorization header if token exists
    if (token) {
        headers['Authorization'] = 'Bearer ' + token;
    }

    let options: AxiosRequestConfig = {
        headers,
        method,
    };

    if (params) {
        // Set params to url if request method was GET.(query-params)
        // Otherwise set params to request body
        if (method === 'GET') {
            url += Object.keys(params).length ? jsonToQueryString(params) : '';
        } else {
            options.data = params;
        }
    }

    // Return a promise to handle errors out of function
    return new Promise<AxiosResponse<T>>((resolve, reject) => {
        axios({
            ...options,
            url: url.startsWith('http') ? url : baseUrl + url,
            onUploadProgress: onUpload,
        })
            .then((res: AxiosResponse<T>) => {
                resolve(res);
            })
            .catch((error: ApiError) => {
                reject(error);
            });
    });
};

export const catchRequestError = (err: ApiError, hasDetail?: boolean) => {
    toast.error(hasDetail ? err.response?.data.detail : 'خطایی رخ داده است');
    console.log(err.response?.data?.detail);
};

// Convert JSON to url query params
export const jsonToQueryString = (json: {
    [name: string]: string | string[] | undefined;
}): string => {
    return (
        '?' +
        Object.keys(json)
            .map(function (key) {
                if (Array.isArray(json[key])) json[key] = Array(json[key]).join(',');
                const value: string = json[key] as string;
                return encodeURIComponent(key) + '=' + encodeURIComponent(value);
            })
            .join('&')
    );
};

export const serverSideFetch = async <T>(
    context: GetServerSidePropsContext,
    url: string,
    params?: {
        [name: string]: any;
    },
) => {
    const token = getToken(context.req.cookies);

    try {
        const res = await httpRequest<T>(url, 'GET', params, false, token);
        return {
            props: {
                data: res.data,
            },
        };
    } catch (err) {
        console.log(err);
        return {
            props: {
                data: null,
            },
        };
    }
};

export default httpRequest;
