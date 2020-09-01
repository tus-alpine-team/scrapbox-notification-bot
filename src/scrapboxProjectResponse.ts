export interface ScrapboxProjectResponse {
    projectName: string;
    skip: number;
    limit: number;
    count: number;
    pages: {
        id: string;
        title: string;
        image: string;
        descriptions: string[];
        user: {
            id: string;
        };
        pin: number;
        views: number;
        linked: number;
        commitId: string;
        created: number;
        updated: number;
        accessed: number;
        snapshotCreated: number;
    }[];
}
