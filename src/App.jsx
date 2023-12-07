import { useState, useEffect } from "react";
import Form from "./components/Form";
import PostsList from "./components/PostsList";
import axios from "axios";

import "./App.css";

function App() {
  const initialFormData = {
    id: "",
    title: "",
    image: "",
    content: "",
    categoryId: "",
    tags: [],
    published: false,
  };

  const [postsList, setPostList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [refreshPage, setRefreshPage] = useState(false);

  const getPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3002/posts/");
      console.log(response.data.result);
      setPostList(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };
  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3002/categories/");
      console.log(response.data);
      setCategoriesList(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getTags = async () => {
    try {
      const response = await axios.get("http://localhost:3002/tags/");
      console.log(response.data);
      setTagsList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
    getCategories();
    getTags();
  }, [refreshPage]);

  async function handleFormSubmit() {
    const newPost = {
      title: formData.title,
      image: formData.image,
      content: formData.content,
      categoryId: parseInt(formData.category),
      tags: [...formData.tags],
      published: formData.published,
    };

    try {
      console.log({ ...newPost });
      await axios.post("http://localhost:3002/posts/", { ...newPost });
      setRefreshPage(true);
    } catch (error) {
      console.log(error);
    }
    setFormData(initialFormData);
  }

  function handleDelete(idToDelete) {
    const updatedPosts = postsList.filter((post) => post.id !== idToDelete);
    setPostList(updatedPosts);
  }

  function handleEdit(idToEdit) {
    let postToEdit = postsList.find((post) => post.id === idToEdit);
    console.log(postToEdit);
    if (postToEdit) {
      setFormData(postToEdit);
      handleDelete(idToEdit);
    }
  }

  function updateFormData(field, newValue) {
    let newFormData = { ...formData };

    newFormData[field] = newValue;

    setFormData(newFormData);
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline">My form!</h1>
      <Form
        propFormData={formData}
        onValueChange={(field, newValue) => updateFormData(field, newValue)}
        onSubmit={handleFormSubmit}
        categories={categoriesList}
        tags={tagsList}
      />
      <PostsList
        posts={postsList}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </>
  );
}

export default App;
