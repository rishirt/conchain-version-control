import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';

export default () => {
  return (
    <Menu style={{ marginTop: '10px' }}>
      <Link route="/">
        <a className="item"><h1>ConChain</h1></a>
      </Link>

      <Menu.Menu position="right">
        <Link route="/">
          <a className="item"><h3>Payments</h3></a>
        </Link>

        <Link route="/campaigns/new">
          <a className="item"><h3>Version Control</h3></a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};
