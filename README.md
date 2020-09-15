# Interview Scheduler

> A modern client single page application (SPA) for scheduling interviews, built using React and Storybook, and fully tested using Jest, Testing-Library and Cypress. Accompanied by the [Scheduler API](https://github.com/DPintoLL/scheduler-api) built in Node with Express and PostgreSQL.

## Table of contents

- [Functionality](#Functionality)
  - [Full List of Features](#Full-List-of-Features)
- [Screenshots](#Screenshots)
- [Technical Stack](#Technical-Stack)
- [Setup](#Setup)
- [Running the Tests](#Running-the-Tests)
- [Contributing](#contributing)
- [Planned Features](#Planned-Features)
  - [In the works](#in-the-works)
  - [In a near future...](#in-a-near-future)
- [Acknowledgements](#acknowledgements)

---

## Functionality

The app's main functionality is to allow for a student to book and manage an interview with a mentor. The user experience is very smooth with no page refreshes, thanks to the SPA characteristic and the usage of simple indicators to inform the user when asynchronous operations take place. The state client-side is synchronized and persisted with the server via an API that communicates with the Express server and a PostgreSQL database.

#### Full List of Features

For a full list of features, please check the list of [Functional and Behavioral Features](https://github.com/DPintoLL/scheduler-v2/blob/master/docs/functional-behavioral-features.md) of this application.

## Screenshots

![Interview Scheduler Overview](https://github.com/DPintoLL/scheduler-v2/blob/master/docs/interview-scheduler-overview.png)
![Interview Scheduler Adding new appointment](https://github.com/DPintoLL/scheduler-v2/blob/master/docs/interview-scheduler-save.png)
![Interview Scheduler Confirm Deletion](https://github.com/DPintoLL/scheduler-v2/blob/master/docs/interview-scheduler-confirm.png)
![Interview Scheduler Deleting an appointment](https://github.com/DPintoLL/scheduler-v2/blob/master/docs/interview-scheduler-deleting.png)

---

## Technical Stack

- [React](https://reactjs.org/)
- [Storybook](https://storybook.js.org/)
- [Sass](https://sass-lang.com/)
- [axios](https://github.com/axios/axios)
- [WebSockets](https://www.npmjs.com/package/ws)

#### Tested and CI done With

- [Jest](https://www.jestjs.io)
- [Testing-Library](https://testing-library.com/)
- [Cypress](https://www.cypress.io)
- [CircleCI](https://circleci.com/)

#### Backend/API Stack

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)

#### Deployed to
- [Netlify - Frontend](https://bit.ly/interview-scheduler)
- [Heroku - Backend]

---

## Setup

- Install dependencies with `npm install` for both the application and the [API](https://github.com/DPintoLL/scheduler-api)
- Interview Scheduler requires both the Webpack server (this application) and API server to be running at the same time.
- The API requires additional setup with creating and seeding the database. A short guide is provided in README of that repo.

#### Running Webpack Development Server

```sh
npm start
```

## Running the Tests

#### Running Storybook Visual Testbed

```sh
npm run storybook
```

#### Running Jest Test Framework - for Unit and Integration Tests

```sh
npm test
```

#### Running End-to-End Tests with Cypress

```sh
npm run cypress
```

---

## Contributing

_If you would like to contribute in any way with this project, or if you find any bug and want to attempt a fix, please follow these steps:_

1. Fork it (<https://github.com/DPintoLL/scheduler-v2/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`) or issue branch (`git checkout -b issue/issue`)
3. Commit your changes (`git commit -m 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new PR

## Planned Features

#### In a near future
- 100% test coverage
