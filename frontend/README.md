## Getting Started

First, make sure to you're in the right directory:

```bash
cd frontend
```

Next, make sure to install all the dependencies:

```bash
npm install
```

You can now, run the development server:

```bash
npm run dev
```

## Key Features of Next.js That you may find different from your expeience with React.js

1. **File-System Based Router**: Next.js uses a file-system based router, where folders are used to define routes and files create the UI for each route segment.

2. **Route Segments**: Each folder in a route signifies a route segment, corresponding to a segment in a URL path.

3. **Nested Routes**: Nested routes can be created by nesting folders within each other.

4. **Special Files**: Next.js offers special files like `layout.js`, `page.js` for specific UI behaviors in nested routes.

### Breif Description of The folder stucture for this porject (feel free to give better suggestions for cleaner code)

- **`app`**: Root directory for the Next.js application.
- **`components`**: This directory stores global components used across the application, as well as components specific to the home page.

- **`constants`**: Contains files that define constants used throughout the application.

- **`[name of page]`**: A directory for each specific page in the application.

  - **`components`**: Inside each page directory, there's a `components` folder for storing components that are specific to that particular page.

  - **`page.js`**: Contains the page-specific logic and layout.

## Tailwind CSS Configuration Overview

We'll also be using [Tailwind CSS]("https://v2.tailwindcss.com/docs") if you haven't used this before don't worry its fairly simple.

With Next Js we can set up a Tailwind configuration file so we don't have to repeat themes throughout. Here's a breif explanation:

- **Theme Customization**:

  - **Screens**: Defines custom breakpoints for responsive design:
    - `xxs` to `xl` with specified pixel values.
  - **Font Family**: Customizes the font family, with `Roboto` set as the primary font.
  - **Font Sizes**: Sets custom font sizes ranging from `2xsm` to `10xl`.

- **Extended Styles**:
  - **Colors**: Defines custom color palette, including `primaryColor`, `secondaryColor`, and two accent colors.
