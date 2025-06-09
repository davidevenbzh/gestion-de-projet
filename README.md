# Project Management

This is a demo project demonstrating a production-ready implementation of CQRS (Command Query Responsibility Segregation) and Event Sourcing. Built for my personal portfolio as a Senior Developer, it showcases modern architectural patterns suitable for scalable and maintainable enterprise applications. This project is implemented entirely in TypeScript.

## Features

- **CQRS**: Separates read and write operations for better performance and increased scalability.
- **Event Sourcing**: Stores the application's state as a sequence of events, enabling complete traceability of changes.
- **Modular Architecture**: Promotes code reusability and testability.

## Technologies Used

- TypeScript
- Node.js
- SQL database (e.g., PostgreSQL, MySQL, or SQLite)
- RabbitMQ for event management
- Swagger (OpenAPI) for API documentation

## Installation

1. Clone the repository: `git clone https://your-repo.git`
2. Go to the project folder: `cd project-name`
3. Install dependencies: `npm install`
4. Set up the database (see documentation for details)
5. Start the application: `npm run start`

## Usage

- The API is accessible at `http://localhost:5000`
- API documentation is available via Swagger at `/swagger`

## Contributing

Contributions are welcome! Please submit a pull request for any improvements or bug fixes.

## Acknowledgements

- This project was inspired by real-world needs encountered in enterprise application development.
- Thanks to the open-source community for the amazing tools and libraries that made this project possible.
