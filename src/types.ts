export type FileType = 'folder' | 'code' | 'document' | 'image' | 'video' | 'audio' | 'archive' | 'other';

export type FilterType = 'all' | FileType;

export interface FileResult {
    id: string;
    name: string;
    path: string;
    type: FileType;
    size: number;
    modified: Date;
    extension?: string;
    preview?: string;
}

export interface SearchState {
    query: string;
    results: FileResult[];
    isSearching: boolean;
    error?: string;
}

export interface IndexState {
    isIndexing: boolean;
    totalFiles: number;
    indexedFiles: number;
    lastUpdated?: Date;
}
