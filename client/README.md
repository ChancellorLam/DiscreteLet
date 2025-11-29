# DiscreteLet

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- Firebase account

### Backend Setup

1. Navigate to server folder:
```
   cd server
```

2. Install dependencies:
```
   npm install
```

3. Create `.env` file from example:
```
   cp .env.example .env
```

4. Edit `.env` and add your actual values:
   - PostgreSQL password
   - JWT secret (any random string)
   - Firebase service account path

5. Download Firebase service account JSON:
   - Go to Firebase Console > Project Settings > Service Accounts
   - Click "Generate new private key"
   - Save as `firebase-service-account.json` in `server/` folder

6. Start the backend:
```
   npm run dev
```

### Frontend Setup

1. Navigate to project root

2. Install dependencies:
```
   npm install
```

3. Create environment files from example:
```
   cp src/environments/environment.example.ts src/environments/environment.development.ts
   cp src/environments/environment.example.ts src/environments/environment.ts
```

4. Edit both environment files and add your Firebase config values:
   - Get from Firebase Console > Project Settings > Your apps

5. Start the frontend:
```
   ng serve
```

### Database Setup

1. Create PostgreSQL database:
```
   psql -U postgres
   CREATE DATABASE discrete_math_app;
```

2. Run the SQL scripts to create tables (see backend documentation)

## Important: Never Commit These Files
- `server/.env`
- `server/firebase-service-account.json`
- `src/environments/environment.ts`
- `src/environments/environment.development.ts`




This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.2.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


