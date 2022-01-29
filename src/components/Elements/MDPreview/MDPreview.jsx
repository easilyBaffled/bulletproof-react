import ReactMarkdown from 'react-markdown';

export const MDPreview = ({ value = '' }) => {
    return (
        <div className="p-2 w-full prose prose-indigo">
            <ReactMarkdown>{value}</ReactMarkdown>
        </div>
    );
};
