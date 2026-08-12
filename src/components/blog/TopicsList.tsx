import React from "react";
import { accentFor } from "@/utils/accent";

interface TopicsListProps {
    topics: string[];
    selectedTopic: string | null;
    onSelectTopic: (topic: string) => void;
}

const TopicsList: React.FC<TopicsListProps> = ({
    topics,
    selectedTopic,
    onSelectTopic,
}) => {
    return (
        <div className="nb-card p-5">
            <h2 className="nb-heading mb-4 text-xl">Topics</h2>

            {topics.length === 0 ? (
                <p className="font-mono text-sm text-nb-muted">
                    {"// belum ada topik"}
                </p>
            ) : (
                <div className="flex flex-wrap gap-2">
                    {topics.map((topic) => (
                        <button
                            key={topic}
                            onClick={() => onSelectTopic(topic)}
                            className={`border-2 px-3 py-1 text-xs font-bold uppercase tracking-wide transition-all duration-100 hover:-translate-x-0.5 hover:-translate-y-0.5 ${
                                selectedTopic === topic
                                    ? `border-black text-black shadow-ink hover:shadow-ink-lg ${accentFor(
                                          topic
                                      )}`
                                    : "border-nb-border bg-nb-surface text-nb-ink shadow-nb-sm hover:shadow-nb"
                            }`}
                        >
                            {topic}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TopicsList;
