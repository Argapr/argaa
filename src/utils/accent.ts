// Palet aksen neubrutalism. Semua warna cukup terang, jadi selalu dipasangkan
// dengan teks + border hitam (lihat class .nb-tag di globals.css).
export const ACCENTS = [
    "bg-nb-yellow",
    "bg-nb-pink",
    "bg-nb-blue",
    "bg-nb-lime",
    "bg-nb-purple",
    "bg-nb-orange",
] as const;

/**
 * Warna aksen yang stabil untuk sebuah label — string yang sama selalu
 * menghasilkan warna yang sama di seluruh halaman.
 */
export function accentFor(seed: string | number): string {
    const key = String(seed);
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
        hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
    }
    return ACCENTS[hash % ACCENTS.length];
}
