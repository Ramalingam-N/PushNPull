# PushNPull

**PushNPull** is a web application built using Node.js and Express.js that allows developers to easily send HTTP requests, customize headers and body data, and inspect responses. It supports various HTTP methods such as GET, POST, PUT, DELETE, HEAD, and more. The application includes authentication mechanisms like Basic Authentication and Bearer Token, and it keeps a history of past requests with all associated parameters for easy re-testing.

## Features

- **Multiple HTTP Methods**: Supports GET, POST, PUT, DELETE, HEAD, and other HTTP methods.
- **Authentication**: Includes Basic Authentication and Bearer Token authentication for secure access.
- **Request History**: Maintains a history of previous requests with parameters for quick re-testing.
- **Customizable Headers and Body**: Allows developers to configure headers and body data for API requests.
- **Response Inspection**: View detailed responses to verify successful API interactions.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Languages**: JavaScript, JSON
- **Authentication**: Basic Auth, Bearer Token

## Setup and Installation

### Prerequisites

- Node.js (v12 or higher)
- npm (Node Package Manager)

### Steps

1. **Clone the repository**:

    ```bash
    git clone https://github.com/Ramalingam-N/PushNPull
    cd pushnpull
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Run the application**:

    ```bash
    npm start
    ```

4. **Access the application**:
    Run the "index.html" file in your browser.

## Usage

- Send HTTP requests using GET, POST, PUT, DELETE, and other methods.
- Authenticate with Basic Auth or Bearer Token when required.
- Customize request headers and body to fit API specifications.
- View detailed responses and status codes.
- Access the history of previous requests for quick re-testing.

## Contributing

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/your-feature`.
3. Commit your changes: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Create a pull request.

## License

This project is licensed under the MIT License.
