export async function GET(): Promise<Response> {
  const robots = `User-agent: *
Allow: /
Allow: /en/
Allow: /zh/

# Disallow admin areas
Disallow: /dashboardqwertyuiop/
Disallow: /api/

# Sitemap
Sitemap: https://randomgenerator.com/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1`

  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  })
}
