# clone the repository
git clone <your-repository-url>
cd your-repository-name

# Backend Setup

1.Navigate to the backend directory.
cd backend 

2.Install dependencies:
npm install

3.Create a .env file in the backend directory and add your PostgreSQL database configuration:
DB_HOST=localhost
DB_PORT=5432
DB_USER=your-db-username
DB_PASSWORD=your-db-password
DB_NAME=your-database-name

4.Run database migrations (if needed):
npx sequelize-cli db:migrate

5.Start the backend server:
npm start

# Frontend Setup
Navigate to the frontend directory:
cd frontend

Install Angular dependencies:
npm install

Start the Angular development server:
ng serve --open
