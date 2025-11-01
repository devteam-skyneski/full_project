# 5th - Educational Platform

A Next.js-based educational platform with role-based dashboards for students, parents, teachers, and administrators.

## Features

- **Multi-role Authentication**: Login system supporting Student, Parent, Teacher, and Admin roles
- **Role-based Dashboards**: Separate dashboards for each user type
- **Animated Login Interface**: Lottie animations for enhanced user experience
- **Modern UI**: Built with Next.js 14, React, and Tailwind CSS

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Lottie React (for animations)
- Lucide React (for icons)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/devteam-skyneski/5th.git
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── auth/              # Authentication page
│   ├── student-dashboard/ # Student dashboard
│   ├── parent-dashboard/  # Parent dashboard
│   ├── teacher-dashboard/ # Teacher dashboard
│   └── admin-dashboard/   # Admin dashboard
├── login(animations)/      # Lottie animation files
└── public/                # Static assets
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## License

This project is private and proprietary.

