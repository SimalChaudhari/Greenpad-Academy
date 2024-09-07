import { Helmet } from 'react-helmet-async';

const metadata = {
  title: 'GREENPAD ACADEMY',
  description:
    'The starting point for your next project with GREENPAD ACADEMY UI Kit, built on the newest version of Material-UI ©, ready to be customized to your style',
};

export default function Page() {
  return (
    <Helmet>
      <title> {metadata.title}</title>
      <meta name="description" content={metadata.description} />
    </Helmet>
  );
}