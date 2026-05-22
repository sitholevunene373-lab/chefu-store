export type OSType = 'Windows' | 'macOS' | 'Linux';

export interface App {
    id: string;
    name: string;
    developer: string;
    description: string;
    longDescription: string;
    category: string;
    icon: string;
    rating: number;
    downloads: number;
    version: string;
    size: string;
    supportedOS: OSType[];
    screenshots: string[];
    featured: boolean;
    trending: boolean;
    installed?: boolean;
    hasUpdate?: boolean;
}
