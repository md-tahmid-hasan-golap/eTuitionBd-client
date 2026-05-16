# eTuitionBd - Professional Tuition Management Platform

eTuitionBd is a premium full-stack tuition management application that connects students with expert tutors across Bangladesh. The platform includes role-based dashboards, secure payments, tuition moderation, and analytics.

## Live Demo

[eTuitionBd Live URL](https://e-tuition-bd-client-eight.vercel.app)

## Core Features

### For Students

- Browse tuition posts with search, class filter, sorting, and pagination.
- Post new tuition requirements and manage existing tuition posts.
- Review tutor applications, hire tutors, reject applicants, and track payments.
- Manage profile information and view ongoing tuition activity.

### For Tutors

- Explore approved tuition opportunities and apply with qualifications, experience, and salary expectations.
- Edit or delete pending applications before review.
- Track application status, ongoing tuitions, and revenue history.

### For Admins

- Review and approve or reject tuition posts and tutor applications.
- Manage users, change roles, update verification details, and remove accounts.
- Monitor revenue, user distribution, and platform performance from analytics charts.

## Technology Stack

- Frontend: React.js, Vite, Tailwind CSS, DaisyUI
- State Management: TanStack Query
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: Firebase Authentication
- Payments: Stripe
- Charts: Recharts
- Notifications: React Hot Toast, SweetAlert2

## Packages Used

- `@tanstack/react-query`
- `axios`
- `firebase`
- `framer-motion`
- `react-hook-form`
- `react-router-dom`
- `@stripe/react-stripe-js`
- `@stripe/stripe-js`
- `recharts`
- `sweetalert2`
- `react-hot-toast`
- `lottie-react`
- `swiper`

## Installation & Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/md-tahmid-hasan-golap/etuitionbd-client.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file and add:

   ```env
   VITE_API_URL=your_backend_url
   VITE_apiKey=your_firebase_api_key
   VITE_authDomain=your_firebase_auth_domain
   VITE_projectId=your_firebase_project_id
   VITE_storageBucket=your_firebase_storage_bucket
   VITE_messagingSenderId=your_firebase_messaging_sender_id
   VITE_appId=your_firebase_app_id
   VITE_imgbb_apiKey=your_imgbb_api_key
   VITE_Payment_Gateway_PK=your_stripe_publishable_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## License

This project is licensed under the MIT License.
