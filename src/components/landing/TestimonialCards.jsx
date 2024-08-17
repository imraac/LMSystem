import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import TestimonialCard from './TestimonialCard';

const TestimonialCards = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight } = document.documentElement;
      const sectionTop = document.querySelector('.testimonial-section').offsetTop;

      if (scrollTop + clientHeight > sectionTop + 150) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const testimonials = [
    { name: 'John Doe', role: 'Frontend Developer', comment: 'This course transformed my career. The practical projects and in-depth explanations were exactly what I needed to level up my skills.', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { name: 'Jane Smith', role: 'UX Designer', comment: 'I\'m now confident in my coding skills. The course structure made learning complex concepts a breeze, and I\'ve already applied what I\'ve learned to my daily work.', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { name: 'Bob Johnson', role: 'Full Stack Developer', comment: 'The tutorials are easy to follow and very effective. I appreciated the emphasis on best practices and modern development techniques.', image: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { name: 'Alice Brown', role: 'Data Scientist', comment: 'I landed my dream job thanks to SkillQuest! The machine learning and AI modules were particularly impressive and gave me a solid foundation.', image: 'https://randomuser.me/api/portraits/women/4.jpg' },
    { name: 'Charlie Davis', role: 'DevOps Engineer', comment: 'The community support is amazing. I always found help when I needed it, and the collaborative projects taught me a lot about working in a team.', image: 'https://randomuser.me/api/portraits/men/5.jpg' },
    { name: 'Eva Wilson', role: 'Mobile App Developer', comment: 'I\'ve tried many platforms, but this is the best by far. The mobile development track was comprehensive and up-to-date with the latest industry trends.', image: 'https://randomuser.me/api/portraits/women/6.jpg' },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      }
    },
  };

  return (
    <section className="py-24 testimonial-section bg-gray-100">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-5xl font-bold mb-16 text-center text-[#FF6247]"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Voices of Success
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialCards;
