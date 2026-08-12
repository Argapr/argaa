/** Blok status bergaya neubrutalism: loading, error, dan empty state. */

export function Loader({ label = "Loading" }: { label?: string }) {
    return (
        <div className="flex flex-col items-center justify-center gap-4 py-16">
            <div className="flex gap-2">
                {["bg-nb-yellow", "bg-nb-pink", "bg-nb-blue"].map(
                    (accent, i) => (
                        <span
                            key={accent}
                            className={`h-5 w-5 animate-nb-bounce border-3 border-black ${accent}`}
                            style={{ animationDelay: `${i * 120}ms` }}
                        />
                    )
                )}
            </div>
            <p className="font-display text-sm uppercase tracking-widest text-nb-muted">
                {label}...
            </p>
        </div>
    );
}

export function ErrorBox({ message }: { message: string }) {
    return (
        <div className="mb-8 border-3 border-black bg-nb-red p-4 text-black shadow-ink">
            <p className="font-display text-xs uppercase tracking-widest">
                Error
            </p>
            <p className="mt-1 font-bold">{message}</p>
        </div>
    );
}

export function EmptyState({ message }: { message: string }) {
    return (
        <div className="nb-card border-dashed p-10 text-center">
            <p className="font-display text-lg uppercase tracking-wide text-nb-muted">
                {message}
            </p>
        </div>
    );
}
