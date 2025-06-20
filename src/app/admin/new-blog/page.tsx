'use client';
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function NewBlogPage() {
  const [data, setData] = useState({
    title: '',
    description: '',
    content: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('content', data.content);
    if (file) {
      formData.append('image', file);
    }

    try {
      const response = await axios.post('/api/blogs', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setData({ title: '', description: '', content: '' });
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error submitting form');
    }
  };

  return (
    <div className="flex justify-center py-10 px-4 bg-background text-foreground">
      <div className="w-full max-w-2xl bg-card shadow-xl rounded-xl p-8">
        <h1 className="text-3xl font-bold text-card-foreground mb-6 text-center">Create New Blog</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-muted-foreground mb-1">
              Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              value={data.title}
              onChange={handleChange}
              className="w-full border border-border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-muted-foreground mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={data.description}
              onChange={handleChange}
              rows={3}
              className="w-full border border-border px-4 py-2 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-semibold text-muted-foreground mb-1">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={data.content}
              onChange={handleChange}
              rows={5}
              className="w-full border border-border px-4 py-2 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-semibold text-muted-foreground mb-1">
              Upload Image
            </label>
            <input
              id="image"
              type="file"
              name="image"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="w-full text-muted-foreground border border-border px-4 py-2 rounded-lg focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-muted file:text-muted-foreground hover:file:bg-muted-foreground/10"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:bg-primary/90 transition duration-300"
          >
            Submit Blog
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewBlogPage;
