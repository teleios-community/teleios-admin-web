# TELEIOS ADMIN-WEB

## Requirements

| Tech |  Version   |
| :--: | :--------: |
| node | `v20.11.1` |
| npm  |  `8.0.0`   |

## Setup

1.- Clone the repo and install deps: `git clone https://github.com/teleios-community/teleios-admin-web && npm install`

2.- Once you are in the app folder, create your environment file by copying the example provided: `cp .env`.
(Ask the administrator for the values)

**Sample Environment Variables (App is running on VITE)**

`VITE_URL=` (Specify the base URL for the API)

`VITE_SESSION_KEY=` (Provide the encryption key)

3.- Install deps: `npm install`

4.- Run the app: `npm start`

## GitFlow

The development branch is `development`, **all branches should branch of from this branch for any development** The main branch is `main`

|    Branch     | Environment |
| :-----------: | :---------: |
| `development` |             |
|    `main`     |             |

Git flow: create your `feature/*`,`fix/*`, `hotfix/*` or `bug/*` branch from the correct branch, and once you're done with your changes open a MR

## Folder Structure

This project follows a **Feature-Based Structure**, which combines the organization of code by features with the encapsulation of components and their related files. This structure promotes modularity, reusability, and maintainability, making it suitable for large-scale applications.

### pages/

- **`pages/`**: Contains feature-specific directories.
  - **`dashboard/`**: Example feature directory.
    - **`index.tsx`**: The main page component for the feature, which imports and renders the feature's components.

### components/

- **`components/`**: Contains common, reusable components used across multiple features.
  - **`dashboard/`**: Directory for dashboard components. .
    - **`index.tsx`**: Example of a common component directory.
    - **`dashboard-card/`**: The component's logic.
  - **`shared/`**: Directory for common components.
    - **`button/`**: Example of a common component directory.
      - **`index.tsx`**: The component's logic.
    - **`Input/`**: Another common component.

**Code example: pages/dashboard/index.tsx**

```js
import React from 'react';

import { Dasboard } from 'components';

const DashboardPage = () => {
  return (
    <div>
      <Dasboard />
    </div>
  );
};

export default DashboardPage;
```
