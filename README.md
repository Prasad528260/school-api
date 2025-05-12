# School Management API

A RESTful API for managing schools with location data, built with Node.js, Express, and MySQL.

## Features

- Add new schools with name, address, and geographical coordinates
- List all schools sorted by proximity to given coordinates
- Input validation for school data
- Error handling and proper HTTP status codes

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/school-api.git
   cd school-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   - Create a MySQL database named `school_db` (or update the name in `.env`)
   - Create a `.env` file in the root directory with the following variables:
     ```
     DB_HOST=localhost
     DB_USER=your_username
     DB_PASSWORD=your_password
     DB_NAME=school_db
     ```

4. Run database migrations (if any) - see the database setup section below.

## Database Setup

1. Create the database:
   ```sql
   CREATE DATABASE school_db;
   ```

2. Create the schools table:
   ```sql
   USE school_db;
   
   CREATE TABLE IF NOT EXISTS schools (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     address TEXT NOT NULL,
     latitude DECIMAL(10, 8) NOT NULL,
     longitude DECIMAL(11, 8) NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   );
   ```

## Running the Application

1. Start the development server:
   ```bash
   npm start
   ```
   The server will start on `http://localhost:3000` by default.

## API Endpoints

### Add a New School
- **URL**: `POST /api/addSchool`
- **Request Body**:
  ```json
  {
    "name": "School Name",
    "address": "School Address",
    "latitude": 12.9716,
    "longitude": 77.5946
  }
  ```
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "School added successfully",
    "schoolId": 1
  }
  ```

### List Schools by Proximity
- **URL**: `GET /api/listSchools?latitude=12.9716&longitude=77.5946`
- **Query Parameters**:
  - `latitude`: Your current latitude (required)
  - `longitude`: Your current longitude (required)
- **Success Response**:
  ```json
  {
    "success": true,
    "schools": [
      {
        "id": 1,
        "name": "School Name",
        "address": "School Address",
        "latitude": 12.9716,
        "longitude": 77.5946,
        "distance": 0
      }
    ]
  }
  ```

## Error Handling

The API returns appropriate HTTP status codes and error messages in the following format:

```json
{
  "error": "Error message describing the issue"
}
```

## Contributing

1. Fork the repository
2. Create a new branch for your feature (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
