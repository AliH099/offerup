type List<T> = {
    next: number;
    previous: number;
    count: number;
    results: T[];
};

type Param = string | number | boolean | readonly string[] | readonly number[] | readonly boolean[];
