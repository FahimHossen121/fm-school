'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit, Plus, Upload, Save, X, Eye } from 'lucide-react';
import axios from 'axios';
import { tutorials } from "@/app/tutorials/tutorialsData";

interface Tutorial {
    _id: string;
    title: string;
    slug: string;
    content: string;
    topic: string;
    createdAt: Date;
}

// const topics = [
//     { name: 'HTML', slug: 'html' },
//     { name: 'CSS', slug: 'css' },
//     { name: 'JavaScript', slug: 'js' },
//     { name: 'Python', slug: 'python' },
//     { name: 'C', slug: 'c' },
//     { name: 'React', slug: 'react' },
//     { name: 'Java', slug: 'java' },
//     { name: 'Node.js', slug: 'nodejs' },
//     { name: 'PHP', slug: 'php' },
//     { name: 'Ruby', slug: 'ruby' },
// ];
const topics = tutorials.map(tutorial => ({
    name: tutorial.topic.charAt(0).toUpperCase() + tutorial.topic.slice(1),
    slug: tutorial.topic.toLowerCase(),
}));

export default function TutorialManagementPage() {
    const [tutorials, setTutorials] = useState<Tutorial[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTutorial, setEditingTutorial] = useState<Tutorial | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState<string>(topics[0].slug);
    const [viewingTutorial, setViewingTutorial] = useState<Tutorial | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        topic: '',
    });

    // Fetch tutorials by topic
    const fetchTutorials = async (topic: string) => {
        try {
            setIsLoading(true);
            const response = await axios.get(`/api/tutorial?topic=${(topic)}`);

            const data = response.data;
            console.log('Fetched tutorials:', data);

            setTutorials(data.map((tutorial: Tutorial) => ({
                ...tutorial,
                createdAt: new Date(tutorial.createdAt)
            })));

        } catch (error) {
            console.error('Error fetching tutorials:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTutorials(selectedTopic);
    }, [selectedTopic]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (editingTutorial) {
                // Update existing tutorial
                const response = await axios.put(`/api/tutorial?id=${editingTutorial._id}`, {
                    title: formData.title,
                    content: formData.content,
                    topic: formData.topic,
                });

                if (response.data.success) {
                    resetForm();
                    fetchTutorials(selectedTopic);
                }
            } else {
                // Create new tutorial
                const formDataToSend = new FormData();
                formDataToSend.append('title', formData.title);
                formDataToSend.append('content', formData.content);
                formDataToSend.append('topic', formData.topic);

                const response = await fetch('/api/tutorial', {
                    method: 'POST',
                    body: formDataToSend,
                });

                const result = await response.json();

                if (result.success) {
                    resetForm();
                    // Refresh tutorials if the new tutorial belongs to the currently selected topic
                    if (formData.topic === selectedTopic) {
                        fetchTutorials(selectedTopic);
                    }
                }
            }
        } catch (error) {
            console.error('Error saving tutorial:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (tutorial: Tutorial) => {
        setEditingTutorial(tutorial);
        setFormData({
            title: tutorial.title,
            content: tutorial.content,
            topic: tutorial.topic,
        });
        setIsFormOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this tutorial?')) {
            try {
                setIsLoading(true);
                const response = await axios.delete(`/api/tutorial?id=${id}`);

                if (response.data.success) {
                    fetchTutorials(selectedTopic);
                }
            } catch (error) {
                console.error('Error deleting tutorial:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleView = (tutorial: Tutorial) => {
        setViewingTutorial(tutorial);
    };

    const closeViewModal = () => {
        setViewingTutorial(null);
    };

    const resetForm = () => {
        setFormData({
            title: '',
            content: '',
            topic: selectedTopic,
        });
        setIsFormOpen(false);
        setEditingTutorial(null);
    };

    const handleTopicChange = (topicSlug: string) => {
        setSelectedTopic(topicSlug);
        setFormData(prev => ({ ...prev, topic: topicSlug }));
    };

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Tutorial Management</h1>
                <Button
                    onClick={() => {
                        setFormData(prev => ({ ...prev, topic: selectedTopic }));
                        setIsFormOpen(true);
                    }}
                    className="flex items-center gap-2"
                >
                    <Plus className="h-4 w-4" />
                    Add Tutorial
                </Button>
            </div>

            {/* Topic Selector */}
            <Card>
                <CardHeader>
                    <CardTitle>Select Topic</CardTitle>
                </CardHeader>
                <CardContent>
                    <Select value={selectedTopic} onValueChange={handleTopicChange}>
                        <SelectTrigger className="w-full md:w-64">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {topics.map(topic => (
                                <SelectItem key={topic.slug} value={topic.slug}>
                                    {topic.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </CardContent>
            </Card>

            {/* Tutorial View Modal */}
            {viewingTutorial && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
                        <div className="flex items-center justify-between p-6 border-b">
                            <h2 className="text-2xl font-bold">{viewingTutorial.title}</h2>
                            <Button variant="ghost" size="sm" onClick={closeViewModal}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                            <div className="mb-4">
                                <Badge variant="outline" className="mb-2">{viewingTutorial.topic}</Badge>
                                <p className="text-sm text-gray-600">Slug: {viewingTutorial.slug}</p>
                                <p className="text-sm text-gray-500">Created: {viewingTutorial.createdAt.toLocaleDateString()}</p>
                            </div>
                            <div className="prose max-w-none">
                                <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                                    {viewingTutorial.content}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 p-6 border-t bg-gray-50">
                            <Button variant="outline" onClick={() => handleEdit(viewingTutorial)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Tutorial
                            </Button>
                            <Button variant="outline" onClick={closeViewModal}>
                                Close
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Tutorial Form */}
            {isFormOpen && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            {editingTutorial ? 'Edit Tutorial' : 'Add New Tutorial'}
                            <Button variant="ghost" size="sm" onClick={resetForm}>
                                <X className="h-4 w-4" />
                            </Button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Title</label>
                                    <Input
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                        placeholder="Tutorial title"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Topic</label>
                                    <Select
                                        required
                                        value={formData.topic}
                                        onValueChange={(value) => setFormData(prev => ({ ...prev, topic: value }))}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select topic" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {topics.map(topic => (
                                                <SelectItem key={topic.slug} value={topic.slug}>
                                                    {topic.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Content</label>
                                <Textarea
                                    required
                                    value={formData.content}
                                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                                    placeholder="Tutorial content"
                                    rows={6}
                                />
                            </div>

                            <div className="flex gap-2">
                                <Button type="submit" disabled={isLoading} className="flex items-center gap-2">
                                    <Save className="h-4 w-4" />
                                    {isLoading ? (editingTutorial ? 'Updating...' : 'Creating...') : editingTutorial ? 'Update Tutorial' : 'Create Tutorial'}
                                </Button>
                                <Button type="button" variant="outline" onClick={resetForm}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* Tutorials List */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        {topics.find(t => t.slug === selectedTopic)?.name} Tutorials
                        <Badge variant="secondary">{tutorials.length} tutorials</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="text-center py-8">Loading tutorials...</div>
                    ) : tutorials.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {tutorials.map(tutorial => (
                                <div key={tutorial._id} className="border rounded-lg p-4 space-y-3">
                                    <div>
                                        <h3 className="font-semibold text-lg">{tutorial.title}</h3>
                                        <p className="text-sm text-gray-600 line-clamp-3">{tutorial.content}</p>
                                        <p className="text-xs text-blue-600 mt-2">Slug: {tutorial.slug}</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <Badge variant="outline">{tutorial.topic}</Badge>
                                        <div className="flex gap-1">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleView(tutorial)}
                                                disabled={isLoading}
                                                title="View tutorial"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleEdit(tutorial)}
                                                disabled={isLoading}
                                                title="Edit tutorial"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleDelete(tutorial._id)}
                                                disabled={isLoading}
                                                title="Delete tutorial"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        Created: {tutorial.createdAt.toLocaleDateString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                            <h3 className="text-lg font-semibold mb-2">No tutorials yet</h3>
                            <p className="text-gray-600 mb-4">Get started by adding your first tutorial for {topics.find(t => t.slug === selectedTopic)?.name}</p>
                            <Button onClick={() => {
                                setFormData(prev => ({ ...prev, topic: selectedTopic }));
                                setIsFormOpen(true);
                            }}>
                                <Plus className="h-4 w-4 mr-2" />
                                Add Tutorial
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
