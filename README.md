## nooze - Top ten news articles powered by New York Times

This app was created using [Create React App](https://github.com/facebook/create-react-app) which uses a convention over configuration concept by abstracting out Webpack, Jest and Babel configs. This allowed me to concentrate on the application logic while saving time by omitting boilerplate setup code.

Due to the simple nature of the app, a state management system such as Redux wasn't included and instead, the app stores state locally and passes state down to child components via props.

For testing, Jest is used as the test runner, and Enzyme is used to make testing React components easier.

There is no backend for the app, but local storage is used in the browser to persist search history and saved searches. Search history and saved searches will therefore persist thougouht browser sessions, but not accross different devices.
