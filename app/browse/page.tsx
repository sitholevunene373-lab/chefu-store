import type { Metadata } from 'next';
import { BrowseContent } from './BrowseContent';

export const metadata: Metadata = {
  title: 'Browse Apps - CheFu Store',
  description: 'Browse thousands of applications for Windows, macOS, and Linux.',
  openGraph: {
    title: 'Browse Apps - CheFu Store',
    description: 'Browse thousands of applications for Windows, macOS, and Linux.',
    type: 'website',
  },
};

interface BrowsePageProps {
  searchParams?: {
    search?: string;
    category?: string;
  };
}

export default function BrowsePage(props: BrowsePageProps) {
  return <BrowseContent searchParams={props.searchParams} />;
}
