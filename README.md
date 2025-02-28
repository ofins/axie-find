# Axie Find

Axie Find is a web application built with React, TypeScript, and Vite. It helps users to find and manage their Axie Infinity assets efficiently.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Features

- Search for Axie Infinity assets
- Filter and sort results
- Detailed view of each asset
- Responsive design

## Installation

To get started with Axie Find, follow these steps:

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/axie-find.git
   cd axie-find
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```

## Usage

Once the development server is running, you can access the application at `http://localhost:3000`. Use the search bar to find Axie Infinity assets and explore the features of the application.

## Development

_Currently in the progress of major change as `axie-find-server` had a major migration from JavaScript to TypeScript along with endpoint updates._

This project uses React, TypeScript, and Vite for development. Below are some useful commands:

- **Start development server**: `npm run dev`
- **Build for production**: `npm run build`
- **Run tests**: `npm test`
- **Lint code**: `npm run lint`

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

- Configure the top-level `parserOptions` property like this:

  ```js
  export default {
    // ...existing code...
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      project: ["./tsconfig.json", "./tsconfig.node.json"],
      tsconfigRootDir: __dirname,
    },
  };
  ```

- Replace `plugin:@typescript-eslint/recommended` with `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
