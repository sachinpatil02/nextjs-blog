# Project Plan

## Reusable Prompts

### Build the Recipe Finder

Create a responsive Recipe Finder app in Next.js with TypeScript and Tailwind CSS. Integrate an external recipe API, support recipe search, category filters, and recipe detail links. Include loading, empty, and error states. Keep the UI clean and practical, and make the app responsive on mobile and desktop. Add saved recipes if persistence is needed, using Local Storage or Zustand/Context API.

### Build the Expense Tracker

Create a responsive Expense Tracker app in Next.js with TypeScript and Tailwind CSS. Support full CRUD operations for expenses, including description, amount, category, due date, and priority level. Add search and category filters, summary metrics, and data visualization charts. Persist data with Local Storage and include loading, empty, validation, and edit states. Use interface definitions, union types, and generic types where they improve the TypeScript design.

### Build the Movie / Book Review Site

Create a responsive Movie and Book Review app in Next.js with TypeScript and Tailwind CSS. Let users add, edit, delete, search, and filter reviews by type and category. Support ratings, comments, and a personal library. Persist reviews with Local Storage or Zustand/Context API. Structure the app so authentication can be added later, without requiring authentication in the first version. Include clear empty, validation, and responsive states.

## Shared Requirements

- Next.js
- TypeScript
- Tailwind CSS
- Zustand or React Context API for client state where appropriate
- Local Storage persistence for browser-first data
- CRUD operations
- Categories
- Due dates
- Priority levels
- Search and filtering
- Responsive mobile and desktop layouts
- Loading, error, empty, and validation states
- Accessible labels, controls, and keyboard-friendly interactions
- TypeScript interface definitions
- TypeScript union types
- TypeScript generic types where appropriate

## Route Plan

- `/projects`: project overview and links
- `/projects/recipe-finder`: Recipe Finder app
- `/projects/expense-tracker`: Expense Tracker app
- `/projects/reviews`: Movie / Book Review app

## Current Status

- Projects overview page: implemented
- Expense Tracker: implemented with CRUD, search, filters, chart, and Local Storage
- Recipe Finder: route and core API search implemented; final styling and validation remain
- Movie / Book Review site: route and core review interactions implemented; final styling and validation remain

## Future Enhancements

- Add dedicated detail pages for recipes.
- Add saved/favorite recipes.
- Add monthly expense budgets and date-range reports.
- Add charts using a dedicated visualization library if the dashboard grows.
- Add authentication and user accounts to the review site.
- Add external movie and book metadata APIs.
- Add cloud persistence and database-backed CRUD operations.
- Add automated tests for core forms, filters, persistence, and API states.
