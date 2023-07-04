# GameLinkDB

GameLinkDB is the backend server for the PlayKoDEX website. It provides an API for managing user accounts, authentication, and other features.

## Installation

1. Clone the repository in vs code:

   ```sh
   git clone https://github.com/marcusdavidalo/GameLinkDB.git

   ```

2. Install the dependencies:

```sh
   npm install
```

3. Create a .env file in the root directory of the project and add your configuration values:

```sh
   PORT=5000
   MONGO_URI=your-mongodb-connection-string-here
   API_KEY=your-api-key-here
   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name-here
   CLOUDINARY_API_KEY=your-cloudinary-api-key-here
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret-here
```

4. Start the development server:

```sh
   npm start

   The server will be running on http://localhost:5000.
```

## API Documentation

The GameLinkDB API provides the following endpoints:

```
/api/users: Manage user accounts

/api/gamecomments: Manage game comments

/api/postcomments: Manage post comments

/api/posts: Manage posts

/api/feedback: Manage feedback

/api/auth: Handle user authentication

Please refer to the code for detailed information on the available endpoints and their usage.
```

## Contributing

```
We welcome contributions to PlayKoDEX! If you'd like to contribute, please follow these steps:

1. Fork the repository.

2. Create a new branch for your feature:

   git checkout -b feature/my-feature

3. Make the necessary changes and commit them:

   git commit -m "Add my feature"

4. Push the changes to your forked repository:

   git push origin feature/my-feature

5. Open a pull request, and we will review your changes.
```

## License

This project is licensed under the [MIT License](LICENSE).
