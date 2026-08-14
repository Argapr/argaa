import React from "react";
import TopicButton from "@/components/blog/TopicButton";

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
                        <TopicButton
                            key={topic}
                            label={topic}
                            isActive={selectedTopic === topic}
                            onClick={() => onSelectTopic(topic)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TopicsList;
