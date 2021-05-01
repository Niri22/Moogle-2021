# Moogle
Moogle is a search engine built for Monday.com workspace. This app can be installed into a user's workspace and will provide a user interface to search for various objects, such as boards, items, and updates. Filters are provided to help refine your search.

# Installation
Download the repository, and in the folder, run:
```sh
  npm install
```

Find your personal Monday.com API token, and copy it into the App.js file where the comment indicates.

# Running the code locally
To run the code, execute the command:
```sh
  npm start
```
This will compile the code and and run ngrok to create a public url for the application. This command will open the app in localhost:3000, howver, this instance of the application will not have access to the Monday.com workspace. Instead, visit localhost:4040 to obtain an ngrok url. This url will be placed within your Monday.com workspace. Create an app in your Monday.com workspace, create a new feature, and in the widget edit screen, add the ngrok url. Then, you can click 'Preview' to view the app and run the search in your workspace.

