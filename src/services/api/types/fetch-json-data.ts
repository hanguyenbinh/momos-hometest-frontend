/* eslint-disable prettier/prettier */
export type FetchJsonData<T> = {
    status: true | false;
    data: T;
    message: string;
};
