import  { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Hero() {
    const [featuredCourse, setFeaturedCourse] = useState(null);

    useEffect(() => {
        const fetchFeaturedCourse = async () => {
            try {
                const response = await axios.get('http://localhost:5000/courses/1'); // Fetch the course with id 
                setFeaturedCourse(response.data || null);
            } catch (error) {
                console.error('Error fetching featured course:', error);
                setFeaturedCourse(null);
            }
        };

        fetchFeaturedCourse();
    }, []);

    const getYouTubeVideoId = (url) => {
        if (!url) return null;
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:embed\/|v\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    return (
        <div className='pt-[170px] pb-[250px] space-y-[250px]'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8'>
                <div>
                    <div className='flex flex-col justify-center text-center lg:text-left'>
                        <h1 className='text-5xl md:text-5xl lg:text-6xl font-bold header-landing text-baseContent'>
                            Learn To Code
                            <br />
                            <span>
                                {' '}&&{' '}
                                <span className='underline decoration-[#FF6247] decoration-wavy underline-offset-8'>
                                    Have Fun
                                </span>
                            </span>
                            <br />
                            Doing It
                        </h1>
                        <p className='py-[16px] font-medium text-xl text-gray-600'>
                            Build beautiful apps & websites with easy to follow tutorials
                        </p>
                        <div>
                            <Link 
                                to="/courses" 
                                className='inline-block px-20 py-3 font-medium text-white bg-[#FF6247] rounded-lg shadow-md hover:bg-[#e55343]'
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-center md:h-full'>
                    <div className='mockup-window bg-[#0F0F0F] border-2 border-slate-100/20 w-full max-w-[1060px] shadow-xl rounded-xl'>
                        <div className='flex items-center justify-center'>
                            {featuredCourse ? (
                                <div className='w-full p-4'>
                                    <div className='relative pb-[56.25%] h-0 overflow-hidden rounded-xl'>
                                        <iframe
                                            className='absolute top-0 left-0 w-full h-full rounded-xl'
                                            src={`https://www.youtube.com/embed/${getYouTubeVideoId(featuredCourse.video)}`}
                                            allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                                            frameBorder='0'
                                            title='YouTube video'
                                        ></iframe>
                                    </div>
                                </div>
                            ) : (
                                <p className='text-white'>No featured course available.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;