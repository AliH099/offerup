import { fetcher } from 'helpers/http-request';
import useSWRImmutable from 'swr/immutable';
import type { SWRConfiguration } from 'swr';

const useFetch = <T>(url: string | null, config?: SWRConfiguration) => {
    const { data, error, isValidating, mutate } = useSWRImmutable<T>(url, fetcher<T>, config);

    return { data, loading: isValidating, error, mutate };
};

export default useFetch;
