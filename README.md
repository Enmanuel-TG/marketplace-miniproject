# Steps to Run the Project

## #1 Install Dependencies

Navigate from the root folder to the backend folder to install all dependencies with the command `npm i` in the terminal. Then return to the root folder to move to the frontend, where you will execute the same command to install the necessary dependencies for the frontend.

## #2 Configure Environment Variables

For the project to work correctly, you must set the environment variables within a **.env** file, which are as follows:

- TOKEN_SECRET: Key used by tokens for protection.
- DATABASE_URL: Contains the URL that connects you to the database.
- PORT: Port where the server is hosted.
- TOKEN_EXPIRES: Set the time when the token will expire.

- CLOUD_NAME, API_KEY, API_SECRET: Connections with the Cloudinary cloud, which you can obtain by creating an account on their website.
- MAIN_ADMIN: Here should be the main account for the main admin

**Note:** Remember that the **.env** file must be in the **src** folder in the backend.

## #3 Execute Commands to Run the Program

First, navigate to the backend and execute the following commands in the terminal:
- npm run docker
- npm run dev

**npm run docker**: This command will raise Docker, which has an image with PostgreSQL, which is being used as the database in this project.

**Note:** Remember to give all necessary permissions to Docker before executing the command, as it will not work otherwise. If you are using Windows, and if you are using Ubuntu, add `sudo` before the command and enter your device's password to give Docker permissions (sudo npm run docker).

**npm run dev**: This command is responsible for starting the server and putting it into operation. Once the server is up and running, everything will be ready on the backend.

With the backend running, open another console and navigate to the frontend folder where you will execute the following command.

**npm run dev**: With this command, Vite will launch a local or remote server. Select the link you want to use the program with.



# Workflow

The development of this project is based on two of the most modern and optimal collaborative work strategies, which are **GitHub Flow** and **Ship/Show/Ask**.

By combining GitHub Flow with Ship/Show/Ask, the team will have an iterative and collaborative approach to software development (in this case, it's a team of two people, the student and the coach, but this can scale to the team size).

### GitHub Flow

GitHub Flow is a collaborative work model focused on branches (for features or bugs) and Pull Requests for continuous integration and frequent code deployments to production.

### Ship/Show/Ask

Ship/Show/Ask is a development strategy that allows choosing between directly shipping changes to `main`, requesting feedback, or pausing for review before merging. It fosters collaboration and code quality, but at the same time, the team must have confidence in each other.

1. **Ship:** Allows the direct implementation of changes to the `main` branch without waiting for additional approval or review, suitable for simple or well-established changes.
2. **Show:** Facilitates presenting changes through Pull Requests to gather feedback and reviews, with the option to merge without waiting for approval, promoting collaboration and continuous improvement.
3. **Ask:** Encourages pausing before merging changes to ask for opinions or help, useful when validation is needed or facing unknown challenges in development.

#### How to determine if it's Ship, Show, or Ask?

The decision lies with the developer (in this case, the student), who must consciously and analytically decide which option is best for the project. Not everything should be **Ask** to avoid overloading other developers (in this case, the coach), but neither should everything be **Show** or **Ship**, as some changes require more attention.

**More information about these strategies in the following links:**

- [The best Git strategy for working with branches and as a team](https://www.youtube.com/watch?v=3FssKkNqUHE)
- [Git Strategy: Ship/Show/Ask](https://midu.dev/ship-show-ask-estrategia-git/)
- [Ship/Show/Ask is a branching strategy that helps teams wait less and ship more, without losing out on feedback](https://martinfowler.com/articles/ship-show-ask.html)
- [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow)

### Kanban Board

- **To-do:** This is an _issue_ ready to start working on.
- **In Progress:** Move the _issue_ to this column when the developer starts working on it. It's important for the developer to have only one ticket at a time in this column, and in case of any impediment, communicate it to the PM (or in this case, the coach).
- **Client UAT (in this case Feature Review):** Normally, a demo is sent to the client or stakeholders for review and approval. In this case, it will be a meeting where the student will show the work done to the coach.
- **Done:** For _issues_ that are already deployed to production and, therefore, merged into the **main** branch; this column concludes the workflow.

It's important to move the _issues_ to their corresponding column at each moment so that the rest of the team knows what you are working on.

⚠️ In our case, being a project for educational purposes, we do not use the Backlog, Code Review, QA, Client UAT, and Deploy columns, but we will add an additional column called **Feature Review** before Done.

### What is a Feature Review?

It is a meeting between the student and the coach where the student demonstrates the feature fully functional, both in the backend and frontend. If the coach considers that it does not meet the [requirements](https://docs.google.com/document/d/1j4d7e5m_gIX5GceB0nG6Txrun9319MtpWm5nzpZSCNo/edit#heading=h.o38wiplmnjzl) defined from the beginning, the coach can provide feedback for necessary changes.

### Steps to take a feature from requirement to production

1. Create an _issue_ in this case in GitHub Project, with the requirements of the feature both in the backend and frontend.
2. Choose what type it will be (ship, show, or ask).
   1. In case of **Ship** work on that _issue_ in `main`.
   2. In case of **Show** create a branch from `main` and merge it when ready.
   3. In case of **Ask** create a branch from `main`, assign and notify the PR to the developer who will be reviewing that _issue_, when approved merge with `main`.

**Note:** Conventional Commits should be used at all times with _issue ID_. **Example:** `docs: clean readme (#3)`.
