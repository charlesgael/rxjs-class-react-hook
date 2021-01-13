export interface Persistor<T = any> {
    save(value: any): Promise<void>;
    load(): Promise<T>;
    delete(): Promise<void>;
}

export class LocalStoragePersistor<T = any> implements Persistor<T> {
    private key: string;

    constructor(key: string) {
        this.key = key;
    }

    async save(value) {
        localStorage.setItem(this.key, JSON.stringify(value));
    }

    async load() {
        return JSON.parse(localStorage.getItem(this.key)) as T;
    }

    async delete() {
        localStorage.removeItem(this.key);
    }
}
