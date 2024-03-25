import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import useGetAllNews from "../hooks/useGetAllNews";

export default function ActuSliderHomepage() {
  const { news, loading, error } = useGetAllNews();

  let latestNews = [];

  if (!loading && !error) {
    latestNews = news.sort((a, b) => b.id - a.id).slice(0, 5); 
  }

  const truncateContent = (content) => {
    if (content.length > 400) {
      return content.slice(0, 400) + '...';
    }
    return content;
  };

  return (
    <>
      <Swiper
        spaceBetween={30}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {latestNews.map((post, index) => (
          <SwiperSlide key={index}>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {post.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
              {truncateContent(post.content)}
            </p>
           <div className="mt-6 flex items-center gap-x-6">
                    <a
                      href="#"
                      className="rounded-md bg-green-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Plus de détails 
                    </a>
                    <a href="/allnews" className="text-sm font-semibold leading-6 text-gray-900 hover:text-green-900 ">
                      Voir toutes les actus<span className='ml-2' aria-hidden="true">→</span>
                    </a>
                  </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
