import useSWRMutation from 'swr/mutation';
import useSWR from 'swr';

import config from '../config';

const REQUEST_METHOD = {
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
};

const getRequestFetcher = (url, init) => {
  return fetch(url, init).then((res) => res.json());
};

export const useGetRequest = (url, requestConfig) => useSWR(config.apiEndpoint + url, getRequestFetcher, requestConfig);

const createPostOrPutFetcher = (requestMethod) => {
  return (url, { arg }) => {
    return fetch(url, {
      method: requestMethod,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(arg),
    }).then((res) => res.json());
  };
};

// https://swr.vercel.app/docs/global-configuration
export const usePostRequest = (url) => useSWRMutation(config.apiEndpoint + url, createPostOrPutFetcher(REQUEST_METHOD.POST));
export const usePutRequest = (url) => useSWRMutation(config.apiEndpoint + url, createPostOrPutFetcher(REQUEST_METHOD.PUT));
export const useDeleteRequest = (url) => useSWRMutation(config.apiEndpoint + url, createPostOrPutFetcher(REQUEST_METHOD.DELETE));
