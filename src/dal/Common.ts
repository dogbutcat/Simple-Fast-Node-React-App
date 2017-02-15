export interface Write<T> {
    create: (item: T) => any;
    update: (id:string, item: T) => any;
    delete: (id: string) => any;
}
export interface Read<T> {
    retrieve: () => any;
    findById: (id: string) => any;
}