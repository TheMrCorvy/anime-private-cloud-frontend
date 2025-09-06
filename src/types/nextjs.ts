export interface Page {
    params: Promise<{
        slug: string;
        directoryId: string;
        animeEpisodeId: string;
    }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
