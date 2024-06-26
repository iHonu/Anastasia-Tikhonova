interface TagsProps {
  handleTagClick: (tag: string) => void;
  query: string | null;
}

const popularTags = ["dog", "cat", "nature", "car"];

export default function Tags({
  handleTagClick,
  query,
}: TagsProps): JSX.Element {
  return (
    <div className="">
      {/* NO TAGS */}
      {!query ? (
        <div>
          <span className="text-orange-500 font-normal lowercase text-sm mr-4">
            Popular Tags:
          </span>
          {popularTags.map((tag) => (
            <a
              key={tag}
              href="#"
              className="mr-3 border-dotted border-b-2 border-black uppercase hover:text-orange-500 hover:border-orange-500 transition-colors duration-300 ease-in-out"
              onClick={(e) => {
                e.preventDefault();
                handleTagClick(tag);
              }}>
              {tag}
            </a>
          ))}
        </div>
      ) : (
        // QUERY TAGS
        <div>
          <span className="text-orange-500 font-normal lowercase text-sm mr-4">
            Tags:
          </span>
          <span className="mr-2 text-xl font-semibold  uppercase">{query}</span>
        </div>
      )}
    </div>
  );
}
