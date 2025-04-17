'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

interface Blog {
    _id: string;
    title: string;
    description: string;
    image: string;
    content: string;
}

const Page: React.FC = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const fetchBlogs = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('/api/blogs');
            setBlogs(response.data.data || []);
        } catch (error) {
            console.error('Error fetching blogs:', error);
            toast.error('Failed to fetch blogs');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this blog?')) {
            try {
                setDeletingId(id);
                await axios.delete(`/api/blogs/${id}`);
                toast.success('Blog deleted successfully');
                fetchBlogs();
            } catch (error) {
                console.error('Delete failed:', error);
                toast.error('Failed to delete blog');
            } finally {
                setDeletingId(null);
            }
        }
    };

    const openEditModal = (blog: Blog) => {
        setSelectedBlog(blog);
        setImage(null);
        setImagePreview(null);
        setIsEditing(true);
    };

    const closeEditModal = () => {
        setSelectedBlog(null);
        setImage(null);
        setImagePreview(null);
        setIsEditing(false);
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (selectedBlog) {
            setSelectedBlog({ ...selectedBlog, [name]: value });
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setImage(selectedFile);
            setImagePreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleEditSubmit = async () => {
        if (!selectedBlog) return;

        try {
            setIsSaving(true);
            const formData = new FormData();
            formData.append('title', selectedBlog.title);
            formData.append('description', selectedBlog.description);
            formData.append('content', selectedBlog.content);
            if (image) formData.append('image', image);

            const response = await axios.put(`/api/blogs/${selectedBlog._id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.data.success) {
                toast.success(response.data.message);
                closeEditModal();
                fetchBlogs();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Update failed:', error);
            toast.error('Failed to update blog');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-10 bg-background text-foreground">
            <h1 className="text-3xl font-bold text-center mb-10 text-primary">📚 Blog Manager</h1>

            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div
                            key={i}
                            className="w-full h-[420px] border border-border rounded-lg shadow-md p-4 flex flex-col justify-between animate-pulse bg-card"
                        >
                            <div className="w-full h-40 bg-muted rounded mb-3"></div>
                            <div className="flex-1 space-y-2">
                                <div className="h-5 bg-muted rounded w-3/4"></div>
                                <div className="h-4 bg-muted rounded w-full"></div>
                                <div className="h-4 bg-muted rounded w-5/6"></div>
                            </div>
                            <div className="flex gap-2 mt-4">
                                <div className="h-8 w-16 bg-muted rounded"></div>
                                <div className="h-8 w-16 bg-muted rounded"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.map((blog) => (
                        <div
                            key={blog._id}
                            className="bg-card rounded-xl shadow-md p-4 hover:shadow-lg transition-all duration-300"
                        >
                            <img
                                src={`${blog.image}?t=${Date.now()}`}
                                alt={blog.title}
                                className="w-full h-40 object-cover rounded-md mb-4"
                            />
                            <h2 className="text-lg font-semibold line-clamp-2 text-card-foreground">{blog.title}</h2>
                            <p className="text-sm mt-2 line-clamp-3 text-muted-foreground">{blog.description}</p>
                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    onClick={() => openEditModal(blog)}
                                    className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(blog._id)}
                                    disabled={deletingId === blog._id}
                                    className={`px-3 py-1 text-sm text-white rounded ${deletingId === blog._id
                                        ? 'bg-destructive/50 cursor-not-allowed'
                                        : 'bg-destructive hover:bg-destructive/90'
                                        }`}
                                >
                                    {deletingId === blog._id ? 'Deleting...' : 'Delete'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isEditing && selectedBlog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm px-4 py-20">
                    <div className="bg-card rounded-xl p-6 w-full max-w-md shadow-xl">
                        <h3 className="text-xl font-semibold mb-2 text-card-foreground">Edit Blog</h3>
                        <p className="text-xs text-destructive mb-4">Note: Changing title may affect URL.</p>

                        <input
                            type="text"
                            name="title"
                            value={selectedBlog.title}
                            onChange={handleEditChange}
                            placeholder="Title"
                            className="w-full p-2 border border-border rounded mb-4 bg-input text-foreground"
                        />

                        <label htmlFor="image">
                            <img
                                src={imagePreview || selectedBlog.image}
                                alt="Preview"
                                className="w-full h-40 object-cover rounded cursor-pointer mb-4"
                            />
                        </label>
                        <input
                            hidden
                            type="file"
                            accept="image/*"
                            id="image"
                            onChange={handleImageChange}
                        />

                        <textarea
                            name="description"
                            value={selectedBlog.description}
                            onChange={handleEditChange}
                            placeholder="Description"
                            rows={3}
                            className="w-full p-2 border border-border rounded mb-4 bg-input text-foreground"
                        />

                        <textarea
                            name="content"
                            value={selectedBlog.content}
                            onChange={handleEditChange}
                            placeholder="Content"
                            rows={6}
                            className="w-full p-2 border border-border rounded mb-4 bg-input text-foreground"
                        />

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={closeEditModal}
                                className="px-4 py-2 bg-muted text-muted-foreground rounded hover:bg-muted/90"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleEditSubmit}
                                disabled={isSaving}
                                className={`px-4 py-2 text-white rounded ${isSaving ? 'bg-primary/50' : 'bg-primary hover:bg-primary/90'
                                    }`}
                            >
                                {isSaving ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;
