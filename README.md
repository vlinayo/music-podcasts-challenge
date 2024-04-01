# Music Podcasts Challenge

This is a React application built using Vite and TypeScript. It provides a platform to explore music podcasts.

## Development

To start the development mode, make sure you have Node.js installed on your machine. Then, follow these steps:

1. Clone this repository to your local machine:

```bash
git clone https://github.com/vlinayo/music-podcasts-challenge.git
```

2. Navigate to the project directory:

```bash
cd music-podcasts-challenge
```

3. Install dependencies and start your development server:

```bash
npm install && npm run dev
```
The development server will start, and you can access the application at http://localhost:5173/music-podcasts-challenge/ in your web browser.

## Production

The application is hosted in production mode at the following URL:

https://vlinayo.github.io/music-podcasts-challenge/

Feel free to explore and enjoy!


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
