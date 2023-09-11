import { AsyncLocalStorage } from 'async_hooks';
export declare const UserStorage: {
    storage: AsyncLocalStorage<any>;
    get(): any;
    set(user: any): any;
};
