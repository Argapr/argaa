import { formatDate } from "@/utils/formatDate";

type NotionText = { plain_text?: string; text?: { content?: string } };

type NotionFile = {
    file?: { url?: string };
    external?: { url?: string };
};

// Properti database Notion. `Multi-select` dipertahankan sebagai fallback untuk
// nama properti lama, sebelum dipisah jadi `Category` + `Tags`.
export type NotionProperties = {
    Name?: { title?: NotionText[] };
    Date?: { date?: { start?: string } | null };
    description?: { rich_text?: NotionText[] };
    Category?: { select?: { name?: string } | null };
    Tags?: { multi_select?: { name: string }[] };
    "Multi-select"?: { multi_select?: { name: string }[] };
    "Files & media"?: { files?: NotionFile[] };
};

export type NotionPage = {
    id: string;
    properties?: NotionProperties;
};

export type BlogPostSummary = {
    id: string;
    title: string;
    /** Tanggal siap tampil (id-ID). */
    date: string;
    /** Tanggal ISO mentah, dipakai untuk pengurutan. */
    rawDate: string;
    description: string;
    category: string;
    tags: string[];
    /** Kategori + tags, dipakai sebagai chip di kartu post. */
    labels: string[];
    image: string;
};

const readText = (items?: NotionText[]) =>
    items?.[0]?.plain_text || items?.[0]?.text?.content || "";

export const getPostTitle = (props?: NotionProperties) =>
    readText(props?.Name?.title) || "Untitled";

export const getPostDescription = (props?: NotionProperties) =>
    readText(props?.description?.rich_text);

export const getPostDate = (props?: NotionProperties) =>
    props?.Date?.date?.start || "";

export const getPostCategory = (props?: NotionProperties) =>
    props?.Category?.select?.name || "";

export const getPostTags = (props?: NotionProperties) =>
    (props?.Tags?.multi_select || props?.["Multi-select"]?.multi_select || [])
        .map((tag) => tag.name);

export const getPostCover = (props?: NotionProperties) => {
    const file = props?.["Files & media"]?.files?.[0];
    return file?.file?.url || file?.external?.url || "";
};

export const mapNotionPost = (page: NotionPage): BlogPostSummary => {
    const props = page.properties;
    const rawDate = getPostDate(props);
    const category = getPostCategory(props);
    const tags = getPostTags(props);

    return {
        id: page.id,
        title: getPostTitle(props),
        date: rawDate ? formatDate(rawDate) : "No date",
        rawDate,
        description: getPostDescription(props) || "No description available.",
        category,
        tags,
        labels: Array.from(new Set([category, ...tags].filter(Boolean))),
        image: getPostCover(props),
    };
};

/** Daftar kategori unik dari sekumpulan post, untuk tombol filter. */
export const collectCategories = (posts: BlogPostSummary[]) =>
    Array.from(new Set(posts.map((post) => post.category).filter(Boolean)));

/** Post dianggap cocok kalau kategori atau salah satu tag-nya sama. */
export const matchesTopic = (post: BlogPostSummary, topic: string) =>
    post.category === topic || post.tags.includes(topic);
