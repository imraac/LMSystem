import React, { useState, useEffect } from 'react';
import { Skeleton } from '@chakra-ui/react';

function TutorialCard({ title, description, image, video, techStack }) {
  const [loading, setLoading] = useState(true);

  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:embed\/|v\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const videoId = getYouTubeVideoId(video);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const limitedTags = techStack ? techStack.slice(0, 5) : [];

  return (
    <div className="block bg-white rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:shadow-2xl hover:scale-105">
      {loading ? (
        <div>
          <Skeleton height="192px" width="100%" borderRadius="none" />
          <div className="p-6">
            <Skeleton height="24px" width="60%" mb="4" />
            <Skeleton height="16px" width="80%" mb="4" />
            <Skeleton height="16px" width="70%" mb="4" />
            <div className="flex gap-2 mt-4">
              <Skeleton height="24px" width="50px" borderRadius="full" />
              <Skeleton height="24px" width="50px" borderRadius="full" />
              <Skeleton height="24px" width="50px" borderRadius="full" />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="relative h-48">
            {videoId ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-700">
                No video available
              </div>
            )}
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-[#FF6247] mb-2">
              {title}
            </h3>
            <p className="text-gray-700 mb-4">{description}</p>
            {limitedTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {limitedTags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-[#FF6247] text-white text-xs font-medium px-2.5 py-0.5 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default TutorialCard;
