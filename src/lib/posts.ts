import type { SvelteComponent } from 'svelte';

const urls = import.meta.glob('/src/content/**/*.md', { eager: true });

type Page = {
    readonly url: string;
    readonly title: string;
    readonly type: string;
    readonly summary: string;
    readonly thumbnail: string;
    readonly isDraft: boolean;
    readonly postedAt: number;
    readonly tags: readonly string[];
    readonly Component: typeof SvelteComponent;
    readonly match: (path: string) => boolean;
};

type MarkdownContent = {
    readonly default: typeof SvelteComponent;
    readonly metadata: {
        readonly aliases?: readonly string[];
        readonly date?: number | string;
        readonly slug?: string;
        readonly draft?: boolean;
        readonly title?: string;
        readonly summary?: string;
        readonly thumbnail?: string;
        readonly tags?: readonly string[];
    };
};

export const pages: Page[] = [];

const getSlug = (path: string): string => {
    const chunks = path.split('/');
    const lastChunk = chunks[chunks.length - 1] ?? '';

    return lastChunk === 'index.md'
        ? chunks[chunks.length - 2] ?? ''
        : lastChunk.replace('.md', '');
};

Object.entries(urls).forEach(([filepath, content]) => {
    const path = filepath.replace('/src/content/', '');
    const { metadata, default: Component } = content as MarkdownContent;

    const postedAt = +new Date(metadata.date || 0);
    if (Number.isNaN(postedAt)) {
        throw new Error(`Invalid date for ${filepath}`);
    }

    const slug = metadata.slug ?? getSlug(path);
    const url = `/${new Date(postedAt).getFullYear()}/${slug}`;
    const paths = [url, ...(metadata.aliases ?? [])];

    pages.push({
        url,
        type: path.startsWith('posts/') ? 'post' : 'page',
        postedAt,
        isDraft: Boolean(metadata.draft),
        title: metadata.title ?? '',
        summary: metadata.summary ?? '',
        thumbnail: metadata.thumbnail ?? '',
        tags: metadata.tags ?? [],
        Component,
        match: (path) => paths.includes(path),
    });
});

pages.sort((a, b) => b.postedAt - a.postedAt);

export const posts = pages.filter((d) => d.type === 'post');
posts.sort((a, b) => b.postedAt - a.postedAt);

export const recentPosts = posts.filter((a) => !a.isDraft).slice(0, 10);
