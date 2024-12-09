import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

const projects = [
  {
    image: "https://pmschandauli.com/upload/project/9/main/240108045216.jpg",
    title: "Type 1, Type 2 and Type 4 Quarters"
  },
  {
    image: "https://pmschandauli.com/upload/project/9/main/240108045338.png",
    title: "STW No-433 MG(s), Village- Te..."
  },
  {
    image: "https://pmschandauli.com/upload/project/26/main/231220123543.jpg",
    title: "424 MG (s), Village- Dhanapur"
  },
  {
    image: "https://pmschandauli.com/upload/project/9/main/240108045216.jpg",
    title: "Construction Progress Phase 1"
  }
];

export function ProjectGallery() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold">Projects in Bhadohi</h2>
        </motion.div>

        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          className="pb-12"
        >
          {projects.map((project, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative rounded-lg overflow-hidden aspect-video"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white text-lg font-semibold">{project.title}</h3>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex justify-center gap-2 mt-4">
          {[0, 1, 2, 3].map((index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-blue-600' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}