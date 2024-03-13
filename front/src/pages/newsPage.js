import React from 'react';
import NewsList from '../components/newsList';

function NewsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-32 pt-28 sm:pt-60 lg:px-8 lg:pt-16">
      <NewsList />
    </div>
  );
}

export default NewsPage;
