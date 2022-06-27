import { posts } from '$lib/posts';

const siteURL = 'https://orlov-vo.ru';
const siteTitle = 'Your site title here';
const siteDescription = 'Your site description here';

export const get = async () => {
    const body = render();
    const headers = {
        'Cache-Control': 'max-age=0, s-maxage=3600',
        'Content-Type': 'application/xml',
    };

    return {
        body,
        headers,
    };
};

const render = () =>
    `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${siteTitle}</title>
<description>${siteDescription}</description>
<link>${siteURL}</link>
<atom:link href="${siteURL}/rss.xml" rel="self" type="application/rss+xml"/>
${posts
    .map(
        (post) => `<item>
<guid isPermaLink="true">${siteURL}/${post.url}</guid>
<title>${post.title}</title>
<link>${siteURL}/${post.url}</link>
<description>${post.excerpt}</description>
<pubDate>${new Date(post.postedAt).toUTCString()}</pubDate>
</item>`,
    )
    .join('')}
</channel>
</rss>
`;
