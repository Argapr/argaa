import { accentFor } from "@/utils/accent";

type TopicButtonProps = {
    label: string;
    isActive: boolean;
    onClick: () => void;
};

/** Chip filter bergaya neubrutalism — aktif berwarna aksen, non-aktif polos. */
export default function TopicButton({
    label,
    isActive,
    onClick,
}: TopicButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`border-2 px-3 py-1 text-xs font-bold uppercase tracking-wide transition-all duration-100 hover:-translate-x-0.5 hover:-translate-y-0.5 ${
                isActive
                    ? `border-black text-black shadow-ink hover:shadow-ink-lg ${accentFor(
                          label
                      )}`
                    : "border-nb-border bg-nb-surface text-nb-ink shadow-nb-sm hover:shadow-nb"
            }`}
        >
            {label}
        </button>
    );
}
