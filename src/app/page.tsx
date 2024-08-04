import React from 'react';
import Home from './components/home';
import MainPageSection from '@/models/mainPageSection';

async function getchSections(): Promise<MainPageSection[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/content`);
  
  if (!res.ok) {
    throw new Error('Network response was not ok.');
  }

  return res.json() as Promise<MainPageSection[]>;
}

const Page = async () => {
  try {
    const mainPageSections = await getchSections();
    return (
      <Home sections={mainPageSections} />
    );
  } catch (error) {
    console.error('Error fetching contents:', error);
    return <div>Error loading contents.</div>;
  }
};

export default Page;
