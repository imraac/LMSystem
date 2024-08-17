import { motion } from 'framer-motion';

const TestimonialCard = ({ name, comment, role, image, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      }
    },
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-[350px]"
      variants={cardVariants}
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
    >
      <div className="p-8 flex-grow flex flex-col">
        <motion.div 
          className="flex items-center mb-4"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
        >
          <img src={image} alt={name} className="w-16 h-16 rounded-full object-cover mr-4" />
          <div>
            <h3 className="font-bold text-lg text-gray-800">{name}</h3>
            <p className="text-gray-600">{role}</p>
          </div>
        </motion.div>
        <motion.p 
          className="text-gray-700 leading-relaxed flex-grow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
        >
          {comment}
        </motion.p>
      </div>
      <motion.div 
        className="bg-[#FF6247] p-4 mt-auto"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
      >
        <svg className="w-8 h-8 text-white opacity-50" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default TestimonialCard;