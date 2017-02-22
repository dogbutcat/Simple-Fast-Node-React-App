export interface StatusDal {
    getPaging?: (id: string, pageNum: number, numPerPage: number) => any;
    getTotalCount?: () => any;
}