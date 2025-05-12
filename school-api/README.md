# School API

A RESTful API for managing schools with location data, built with Node.js, Express, and MySQL.

## Features

- Add new schools with name, address, and coordinates
- List all schools sorted by proximity to a given location
- Input validation and error handling
- CORS enabled
- Environment-based configuration

## Prerequisites

- Node.js (v14 or higher)
- MySQL database (local or cloud-based like PlanetScale)
- npm or yarn

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd school-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update the database credentials in `.env`

4. Initialize the database:
   - Create a new MySQL database
   - Run the SQL commands from `db/init.sql` to create the tables

## Development

```bash
# Start development server with hot-reload
npm run dev

# Start production server
npm start
```

## API Endpoints

- `POST /api/addSchool` - Add a new school
  - Body: `{ "name": "School Name", "address": "123 Street", "latitude": 12.34, "longitude": 56.78 }`

- `GET /api/listSchools?latitude=12.34&longitude=56.78` - List all schools sorted by distance

## Deployment

### Option 1: Deploy to Render (Recommended)

1. Push your code to a GitHub repository
2. Sign up at [Render](https://render.com/)
3. Click "New" and select "Web Service"
4. Connect your GitHub repository
5. Configure the following:
   - Name: `school-api`
   - Region: Choose the closest to your users
   - Branch: `main` or your preferred branch
   - Build Command: `npm install`
   - Start Command: `npm start`
6. Add environment variables from your `.env` file
7. Click "Create Web Service"

### Option 2: Deploy to Heroku

1. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
2. Login to Heroku:
   ```bash
   heroku login
   ```
3. Create a new Heroku app:
   ```bash
   heroku create your-app-name
   ```
4. Add MySQL add-on (JawsDB or ClearDB):
   ```bash
   heroku addons:create jawsdb:kitefin
   ```
5. Deploy your code:
   ```bash
   git push heroku main
   ```

## Environment Variables

```
NODE_ENV=production
PORT=10000
DB_HOST=your-db-host
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=your-db-name
```

## License

ISC
