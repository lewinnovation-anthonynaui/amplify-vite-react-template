import { generateClient } from 'aws-amplify/data';
import { useEffect, useState } from 'react';

// import { useAuthenticator } from '@aws-amplify/ui-react';

import type { Schema } from '../amplify/data/resource';
const client = generateClient<Schema>();

function App2() {
  // const { user, signOut } = useAuthenticator();
  const [assets, setAssets] = useState<Array<Schema['Assets']['type']>>([]);

  useEffect(() => {
    client.models.Assets.observeQuery().subscribe({
      next: (data) => setAssets([...data.items]),
    });
  }, []);

  function createAsset() {
    client.models.Assets.create({ vehicle: window.prompt('Asset vehicle') });
  }

  function deleteAsset(id: string) {
    client.models.Assets.delete({ id });
  }

  async function getAssets() {
    const x = await client.models.Assets.list();
    console.log('x: ', x);
  }

  return (
    <main>
      {/* <h1>{user?.signInDetails?.loginId}'s todos</h1> */}
      <h1>My todos</h1>
      <button onClick={createAsset}>+ new</button>
      <ul>
        {assets.map((asset) => (
          <li key={asset.id} onClick={() => deleteAsset(asset.id)}>
            {asset.vehicle}
          </li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
      <button onClick={getAssets}>Get Assets</button>
      {/* <button onClick={signOut}>Sign out</button> */}
    </main>
  );
}

export default App2;
