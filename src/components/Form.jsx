const Form = ({ propFormData, onValueChange, onSubmit, categories, tags }) => {
  function handleInputChange(e, field) {
    const newValue = e.target.value;
    onValueChange(field, newValue);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  function handleTagChange(tag) {
    let updatedTags = propFormData.tags.includes(tag)
      ? propFormData.tags.filter((t) => t !== tag)
      : [...propFormData.tags, tag];

    onValueChange("tags", updatedTags);
  }

  function handlePublishedChange() {
    onValueChange("published", !propFormData.published);
  }

  return (
    <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
      <h2 className="font-semibold rext-2x1 mb-4 block text-center">
        Create a Post
      </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={propFormData.title}
            onChange={(e) => handleInputChange(e, "title")}
            className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
            placeholder="Enter Title"
          />
        </div>
        <div>
          <label>Image</label>
          <input
            type="text"
            value={propFormData.image}
            onChange={(e) => handleInputChange(e, "image")}
            className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
            placeholder="Enter Image URL"
          />
        </div>
        <div>
          <label>Content</label>
          <textarea
            raw="5"
            value={propFormData.content}
            onChange={(e) => handleInputChange(e, "content")}
            cols="50"
            className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
            placeholder="Enter Long Content..."
          />
        </div>
        <div>
          <label>Published</label>
          <input
            type="checkbox"
            id="published"
            checked={propFormData.published}
            onChange={handlePublishedChange}
            className="m-4"
          />
        </div>
        <div>
          <label>Category</label>
          <select
            value={propFormData.categoryId}
            onChange={(e) => handleInputChange(e, "categoryId")}
            className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Tags</label>
          {tags.map((tag) => (
            <div key={tag.id}>
              <input
                type="checkbox"
                id={tag.id}
                checked={propFormData.tags.includes(tag.id)}
                onChange={() => handleTagChange(tag.id)}
                className="mr-2"
              />
              <label htmlFor={tag.id}>{tag.title}</label>
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Form;
