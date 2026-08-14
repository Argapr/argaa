// Perkiraan waktu baca dari konten HTML, dengan asumsi 200 kata per menit.
export function readingTimeFromHtml(html: string): number {
    const words = html
        .replace(/<[^>]+>/g, " ")
        .split(/\s+/)
        .filter(Boolean).length;

    return Math.max(1, Math.round(words / 200));
}
