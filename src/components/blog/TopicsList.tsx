import React from "react";

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
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Topics
            </h2>
            <div className="flex flex-wrap gap-2">
                {topics.map((topic) => (
                    <button
                        key={topic}
                        onClick={() => onSelectTopic(topic)}
                        className={`px-3 py-1 rounded-full text-sm font-medium
                            ${
                                selectedTopic === topic
                                    ? "bg-green-600 text-white"
                                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                            }`}
                    >
                        {topic}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TopicsList;
