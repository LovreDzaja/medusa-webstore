import PageDetailsProduct from '@/components/PageDetailsProduct';

interface PageProps {
  params: {
    productId: string;
  };
}

const Page = ({ params }: PageProps) => {
  return <PageDetailsProduct params={params} />
};

export default Page;