# PassKeep - Secure Password Manager

PassKeep is a secure password manager built with Next.js. It leverages cutting-edge technologies to ensure that your sensitive data remains safe and easily accessible. This project is designed to help you securely store and manage your passwords, with a focus on user experience and simplicity.

---

## Live Demo

You can try out the app live at:

[PassKeep Live Demo](https://passkeepr.vercel.app/)

---

## Features

- **Secure Storage**: Your passwords are encrypted using advanced algorithms to ensure data security.
- **LocalStorage Integration**: Password data is stored in `localStorage` for persistent access across sessions. Data is securely encrypted before storage.
- **Responsive Design**: The UI is fully responsive, making it easy to use on any device.
- **User Authentication**: Implemented secure login and multi-factor authentication (MFA) features.
- **Radix UI Components**: Built with Radix UI components (Shadcn), offering a robust set of accessible UI primitives.
- **Optimized for Performance**: Powered by Next.js, ensuring fast page loads and smooth performance.

---

## Tech Stack

- **Next.js**: A React framework that enables server-side rendering, static site generation, and API routes.
- **Radix UI**: A set of low-level UI primitives for building accessible and customizable components.
- **Tailwind CSS**: A utility-first CSS framework used to style the app.
- **CryptoJS**: A JavaScript library for encrypting and decrypting sensitive information.
- **localStorage**: Used for persistent client-side storage of encrypted password data.
- **Zod**: TypeScript-first schema validation.
- **React Hook Form**: A library for handling form validation and submission.

---

## Getting Started

To get started with PassKeep locally, follow these steps:

### Prerequisites

- **Node.js** (>= 16.x.x)
- **npm** or **yarn**

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/passkeep.git
   cd passkeep

2. Install the dependencies:

   Using npm:

   ```bash
   npm install

3. Running Locally
   
   To run the development server:
   
   ```bash
   npm run dev

---

## Folder Structure

- **/pages**: Contains the main pages and routing logic.
- **/components**: Contains reusable components, including Radix UI components.
- **/lib**: Contains utility functions and helpers.
- **/styles**: Contains global CSS styles and Tailwind configuration.

---

## LocalStorage Usage

PassKeep utilizes the browser's `localStorage` for storing encrypted password data. This allows your password data to persist between sessions, even after you close and reopen the browser. However, **ensure that your device is secure** since `localStorage` data is stored locally on the user's browser.

- Passwords are encrypted before being stored in `localStorage` using **CryptoJS**.
- The data can be retrieved securely upon the user's next session.
  
Note: While `localStorage` offers convenient client-side storage, it's important to understand the risks associated with storing sensitive data in it. We strongly recommend ensuring proper security measures (e.g., password-based encryption and multi-factor authentication) are in place.

---

## Scripts

- **dev**: Starts the development server.
- **build**: Builds the app for production.
- **start**: Starts the app in production mode.
- **lint**: Runs ESLint to check for code quality issues.

---

## Dependencies

Here are the key dependencies used in this project:

- **@hookform/resolvers**: For integrating validation with React Hook Form.
- **@radix-ui/react-accordion**: Accordion component from Radix UI.
- **@radix-ui/react-alert-dialog**: Alert Dialog component from Radix UI.
- **crypto-js**: For handling encryption and decryption of passwords.
- **date-fns**: For date handling utilities.
- **react-hook-form**: For handling forms in React.
- **next-themes**: For managing themes and dark mode.
- **tailwindcss**: For utility-first styling.
- **zod**: For validating TypeScript schemas.

---

## Contributing

We welcome contributions! If you'd like to contribute, feel free to fork the repository, create a branch, and submit a pull request. Please follow the code style and write tests for any new functionality.

---

## License

PassKeep is licensed under the MIT License. See [LICENSE](./LICENSE) for more details.

---

## Acknowledgments

- **Radix UI** for providing high-quality, accessible UI components.
- **Tailwind CSS** for making styling easier and faster.
- **Next.js** for its powerful features and optimized performance.
