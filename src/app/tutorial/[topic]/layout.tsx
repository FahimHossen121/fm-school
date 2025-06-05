'use client'
import React, { useEffect, useRef, useState } from 'react';
import Sidebar from '../../Sidebar'
import axios from 'axios';
import { useParams } from 'next/navigation';

const LoadingSpinner: React.FC = () => (
    <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
    </div>
);

export default function TutorialLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ topic: string }>;
}) {
    const { topic } = React.use(params);
    const routeParams = useParams();
    const currentSlug = routeParams?.slug as string;

    const sidebarRef = useRef<HTMLDivElement>(null);
    const [sidebarContents, setSidebarContents] = React.useState([]);
    const [isTopicLoading, setIsTopicLoading] = useState(false);
    const [previousTopic, setPreviousTopic] = useState<string | null>(null);

    const fetchSidebarContents = async () => {
        if (previousTopic && previousTopic !== topic) {
            setIsTopicLoading(true);
        }

        try {
            const res = await axios.get(`/api/tutorial?topic=${topic}`);
            setSidebarContents(res.data);
        } catch (error) {
            console.error("Error fetching sidebar contents:", error);
            setSidebarContents([]);
        } finally {
            setIsTopicLoading(false);
            setPreviousTopic(topic);
        }
    }

    useEffect(() => {
        fetchSidebarContents();
    }, [topic]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target as Node)
            ) {
                setIsSidebarOpen(false);
            }
        };

        if (isSidebarOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isSidebarOpen]);
    useEffect(() => {
        const checkScreenSize = () => {
            const isDesktop = window.innerWidth >= 768;
            setIsSidebarOpen(isDesktop);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    if (isTopicLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="flex min-h-screen relative">
            <Sidebar
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
                topic={topic}
                sidebarContents={sidebarContents}
                currentSlug={currentSlug}
            />
            <main className={`flex-1 bg-gray-900 text-white transition-all duration-300 ${isSidebarOpen ? 'md:ml-0' : 'ml-0'
                }`}>
                {React.cloneElement(children as React.ReactElement, {
                    toggleSidebar,
                    isSidebarOpen
                })}
            </main>
        </div>
    );
}
