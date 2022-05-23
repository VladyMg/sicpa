export interface ResponseEntity<TDocument> {
    ok?: boolean;
    resp?: TDocument;
    message?: string;
}

export interface PaginationEntity<TDocument> {
    totalPages?: number;
    totalRows?: number;
    data?: TDocument[];
    pageSize?: number;
    page?: number;
}
