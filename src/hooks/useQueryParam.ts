import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const useQueryParam = <T extends Param>(paramName: string) => {
    const router = useRouter();
    const statparam = useSearchParams();

    const setParam = (param: T) => {
        const params = new URLSearchParams(statparam.toString());
        if (Array.isArray(param)) {
            param.map((item) => {
                params.set(paramName, String(item));
            });
        } else {
            params.set(paramName, String(param));
        }
        router.query[paramName] = params.get(paramName) || '';
        router.push({ query: { ...router.query } }, undefined);
    };

    const resetParam = () => {
        const newQuery = {};
        for (const key of statparam.keys()) {
            key !== paramName && Object.assign(newQuery, { [key]: statparam.getAll(key) });
        }
        router.query = newQuery;
        router.push({ query: { ...router.query } }, undefined);
    };

    const paramsArray = statparam.getAll(paramName);
    const param = statparam.getAll(paramName)[0];

    return { setParam, resetParam, param, paramsArray, statparam };
};

export default useQueryParam;
