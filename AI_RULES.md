# AI Development Rules

This document outlines the tech stack and conventions to follow when developing this application.

## Tech Stack

- **Framework**: React with Vite for a fast development experience.
- **Language**: TypeScript for type safety and better developer experience.
- **Styling**: Tailwind CSS for a utility-first CSS framework.
- **UI Components**: shadcn/ui, a collection of re-usable UI components.
- **Routing**: React Router (`react-router-dom`) for client-side navigation.
- **State Management**: Zustand for simple, scalable global state management.
- **Icons**: Lucide React for a comprehensive and consistent set of icons.
- **Notifications**: Sonner for elegant and non-intrusive toast notifications.
- **Data Fetching**: TanStack Query (React Query) for fetching, caching, and managing server state.
- **Forms**: React Hook Form with Zod for performant and type-safe forms.

## Library Usage and Conventions

- **UI Components**:
  - Always prefer using components from `shadcn/ui` located in `src/components/ui`.
  - For custom, application-specific components, create new files under `src/components`.
  - Keep components small and focused on a single responsibility.

- **Styling**:
  - Use Tailwind CSS classes for all styling. Avoid writing custom CSS files.
  - Use the `cn` utility function from `src/lib/utils.ts` to conditionally apply or merge Tailwind classes.
  - Adhere to the design system defined in `src/index.css` and `tailwind.config.ts`.

- **State Management**:
  - Use Zustand (`src/store/useStore.ts`) for global state that needs to be shared across multiple components (e.g., shopping cart, user favorites).
  - For state that is local to a single component or its immediate children, use React's built-in `useState` and `useReducer` hooks.

- **Routing**:
  - All page routes should be defined in `src/App.tsx` using `react-router-dom`.
  - Page components should be located in the `src/pages` directory.

- **Icons**:
  - Exclusively use icons from the `lucide-react` library to maintain visual consistency.

- **Notifications**:
  - Use `sonner` to provide feedback to the user for actions like adding an item to the cart or favorites. Import it from `sonner`.

- **Code Structure**:
  - `src/components`: Reusable components used across the application.
  - `src/components/ui`: Components from shadcn/ui.
  - `src/pages`: Components that represent a full page/route.
  - `src/data`: Static data, like the product list.
  - `src/store`: Zustand store for global state.
  - `src/lib`: Utility functions.
  - `src/hooks`: Custom React hooks.