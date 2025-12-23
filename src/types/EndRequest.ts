interface EndRequest {
    url: string,
    body: Record<string, any>,
    headers: Record<string, string>,
    params: Record<string, string>
};
export type { EndRequest };