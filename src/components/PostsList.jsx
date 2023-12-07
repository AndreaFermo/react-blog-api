const PostsList = ({ posts, onDelete, onEdit }) => {
  function handleDelete(id) {
    onDelete(id);
  }

  function handleEdit(id) {
    onEdit(id);
  }

  return (
    <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
      <h2 className="font-semibold text-2xl mb-4 block text-center">Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="flex justify-between py-4 border-b">
            <div>{post.title}</div>
            <div className="flex space-x-2">
              <span
                className="bg-yellow-500 hover:bg-yellow-300 px-2 font-bold rounded cursor-pointer ms-2"
                onClick={() => handleEdit(post.id)}
              >
                Edit
              </span>
              <span
                className="bg-red-500 hover:bg-red-300 px-2 font-bold rounded cursor-pointer ms-2"
                onClick={() => handleDelete(post.id)}
              >
                X
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsList;
