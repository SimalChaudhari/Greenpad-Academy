import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import SignUp from 'src/sections/auth/authentication/sign-up-view';


// ----------------------------------------------------------------------

const metadata = { title: `Sign up | Jwt - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <SignUp />
    </>
  );
}
