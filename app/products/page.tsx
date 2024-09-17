import { Metadata } from 'next';
import Products from './products';
import { IProductsProps, IProduct } from './interfaces';
import { optionsAppJson } from '@/utils/server.helpers';
import ContentComponent from '@/components/content';

export const metadata: Metadata = {
  title: 'Product List',
};

const getProducts = async (): Promise<IProduct[]> => {
  let data: IProduct[] = [];
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/products`, {
      headers: (await optionsAppJson()).headers,
    });

    if (!res.ok) {
      throw new Error('Network response was not ok');
    }

    data = await res.json();
  } catch (error) {
    throw new Error((error as string).toString());
  }
  return data;
};

export default async function Page() {
  const data = await getProducts();
  const productsData: IProductsProps = {
    rows: data,
    totalData: data.length,
  };
  const breadcrumbs = [{ title: 'general.products-title', href: '/products' }];
  return (
    <ContentComponent title="general.products-title" breadcrumbs={breadcrumbs}>
      <Products {...productsData} />
    </ContentComponent>
  );
}
