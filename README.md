# Loop Insights - Feedback Collection Widget

## Overview

**Loop Insights** is a powerful feedback collection widget designed to seamlessly integrate with any website. With this tool, users can easily collect valuable feedback from their visitors, visualize it, and use it to drive data-driven decisions. 

The widget collects feedback through a simple code snippet that users can paste directly into their HTML. Once embedded, the widget starts gathering data, which is displayed in a responsive and customizable table powered by **TanStack Query** (formerly React Query). The table is implemented entirely server-side for optimal performance and scalability. 

Loop Insights also provides additional features like control over the number of projects allowed under a free plan, seamless Stripe integration for payment processing, and robust user authentication via **Clerk**.

## Key Features

1. **Seamless Widget Integration**  
   - Users can integrate the feedback widget by pasting a single JavaScript snippet into their website’s HTML, enabling automatic feedback collection.
   - The widget is highly customizable, allowing businesses to define the type of feedback to collect (e.g., ratings, text comments, suggestions) and configure its appearance using **TailwindCSS** and **Shadcn UI**.

2. **Server-Side Rendering (SSR) with TanStack React Query**  
   - Feedback data is displayed in a table rendered **server-side**, optimizing performance by minimizing page load times and improving scalability.
   - Pagination, sorting, and data fetching are fully managed using **TanStack React Query**, ensuring an efficient and smooth user experience.

3. **URL State Control for Table Interaction**  
   - **URL state management** is implemented to allow users to control table interactions directly via the URL. Features such as sorting, pagination, and filtering are reflected in the URL, enabling users to share or bookmark specific table views.
   - This approach enhances usability by ensuring the table's state is preserved across sessions and is easily shareable with others.

4. **Prisma for Database Mutations**  
   - **Prisma** is used to handle all database mutations (inserts, updates, deletes), ensuring smooth, type-safe interaction with the database. 
   - This allows feedback data to be securely stored and efficiently queried, with Prisma's powerful ORM ensuring data consistency and reducing the complexity of database operations.

5. **Project Management & Plan Controls**  
   - **Free Plan Limitations**: Users on the free plan can create a limited number of projects. This is ideal for small businesses or those wanting to try the tool before upgrading.
   - **Paid Plans**: Users can unlock additional features and remove project restrictions by upgrading to a paid plan. **Stripe** integration is used to handle subscriptions and payments smoothly.

6. **Stripe Integration for Payments**  
   - Loop Insights integrates with **Stripe** to handle subscription payments, offering a secure and reliable payment processing experience.
   - Users can easily manage their billing, upgrade/downgrade plans, and process payments through Stripe’s robust platform.

7. **Secure Authentication with Clerk**  
   - **Clerk** handles user authentication, providing secure sign-up and login flows. It supports multiple authentication methods, including email-based sign-ins, OAuth providers (Google, GitHub, etc.), and passwordless login via magic links.
   - Authentication is seamlessly integrated, ensuring that both admins and users can securely access the platform.

8. **Real-Time Data Fetching and Updates**  
   - Data fetching is handled asynchronously using **TanStack React Query**, ensuring real-time data display without the need for manual page refreshes.
   - The real-time updates enable admins to manage incoming feedback instantly, with changes reflected in the data table without delay.
  
## Tech Stack

- **Next.js**: A full-stack React framework for building optimized and scalable web applications.
- **TailwindCSS**: A utility-first CSS framework for fast UI development and styling.
- **Shadcn UI**: A component library built with accessibility and developer-friendliness in mind.
- **TanStack React Query**: A powerful data-fetching library to manage and cache server-side data, providing a smooth and fast user experience.
- **Prisma** for seamless and type-safe database interaction and mutations.
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A statically typed language for better code quality and error prevention.
- **Clerk**: A user authentication service to manage login, sign-up, and user sessions easily.
- **Stripe**: A payment processing platform to handle subscriptions and payments securely.


## Usage

- Login to the sass application and create a project.
- Copy and paste the winget code from code intructions provided in the application
- After embedding the widget, feedback data will be stored on the server and made available in your Loop Insights dashboard.
- View feedback in a table that is fully paginated and fetched via server-side queries, ensuring fast and smooth navigation even with large datasets.
- Admins can filter, sort, and perform actions on the collected feedback, with the data fully managed via **TanStack React Query** for real-time updates.

## Payment & Plans

Loop Insights offers a **free plan** that allows you to create a limited number of projects. For more advanced features and unlimited project creation, you can upgrade to a paid plan via **Stripe**.

- **Free Plan**: Allows creation of up to 5 projects.
- **Paid Plans**: Available through **Stripe**, with various tiers for larger businesses or more extensive usage.

You can easily manage your subscription, upgrade/downgrade plans, and securely process payments directly within the Loop Insights dashboard.

## Authentication

Loop Insights uses **Clerk** for user authentication. This means you can easily integrate authentication for both admins and users without worrying about complex login flows or security concerns. Clerk supports multiple authentication methods including:

- Email-based sign-ups/sign-ins
- OAuth providers (Google, GitHub, etc.)
- Passwordless login (magic links)

This makes user management effortless and secure for both your team and users.

## How It Works (Backend)

1. **User Feedback Collection**: Once the widget is embedded, users can submit feedback (e.g., ratings, comments, or suggestions).
2. **Data Storage**: Feedback data is stored in the database and is made available through **TanStack React Query**, providing a smooth data-fetching experience.
3. **Server-Side Rendering (SSR)**: The data table is rendered server-side, providing quick loading times even with large datasets, ensuring a highly responsive experience for end users.
4. **Project & User Management**: Admins can manage multiple projects, view feedback data, and control the number of projects created under the free plan. Stripe is used to handle billing and subscription for the paid plans.

## Development Setup

If you'd like to contribute or run the project locally, you can set up the development environment by following these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/sidyr6002/loop-insights-web.git
   ```

2. **Install dependencies**:

   Navigate to the project directory and install the required dependencies:

   ```bash
   cd loop-insights
   npm install
   ```

3. **Run the development server**:

   Start the development server to see the app in action:

   ```bash
   npm run dev
   ```

4. **Visit the app**: Open your browser and go to `http://localhost:3000` to see the application in action.

## Contributing

We welcome contributions! If you'd like to help improve **Loop Insights**, you can:

1. Fork the repository
2. Create a new branch
3. Make your changes and write tests
4. Submit a pull request

Please ensure that your code follows the project's style guide and is thoroughly tested.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---