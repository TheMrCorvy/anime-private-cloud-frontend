"use client";

import { HttpMethod } from "@/services/HttpBase";
import { NasApiRoutes } from "@/utils/routes";
import { useEffect, useState } from "react";

interface SecureVideoPlayerProps {
    apiKey: string;
    filePath: string;
    baseUrl: string;
}

const SecureVideoPlayer: React.FC<SecureVideoPlayerProps> = ({
    apiKey,
    filePath,
    baseUrl,
}) => {
    const [videoBlobUrl, setVideoBlobUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchVideo();

        return () => {
            if (videoBlobUrl) {
                URL.revokeObjectURL(videoBlobUrl);
            }
        };
    }, [apiKey, filePath]);

    const fetchVideo = async () => {
        try {
            const res = await fetch(baseUrl + NasApiRoutes.serveAnimeEpisode, {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
                method: HttpMethod.POST,
                body: JSON.stringify({
                    filePath,
                }),
            });

            if (!res.ok) {
                throw new Error(`Failed to fetch video: ${res.status}`);
            }

            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            setVideoBlobUrl(url);
        } catch (err: any) {
            console.error("Error fetching video:", err);
            setError(err.message || "Failed to load video.");
        }
    };

    if (error) return <p>Error loading video: {error}</p>;

    return (
        <div>
            {videoBlobUrl ? (
                <video
                    controls
                    width="800"
                    src={videoBlobUrl}
                    style={{ maxWidth: "100%" }}
                >
                    Your browser does not support the video tag.
                </video>
            ) : (
                <p>Loading video...</p>
            )}
        </div>
    );
};

export default SecureVideoPlayer;
