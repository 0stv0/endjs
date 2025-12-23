interface EndResponse
{
    setStatus: (code: number) => void,
    send: (body: Record<string, any>) => void
};
export type { EndResponse };