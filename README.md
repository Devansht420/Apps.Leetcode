# Leetcode Stats on Rocket.Chat

<br />
<div align="center">
  <h3 align="center">Leetcode Stats Feature for RocketChat</h3>

  <p align="center">
    <a href="https://github.com/Devansht420/Apps.Leetcode">View Demo</a>
    ·
    <a href="https://github.com/Devansht420/Apps.Leetcode/issues">Report Bug</a>
    ·
    <a href="https://github.com/Devansht420/Apps.Leetcode/issues">Request Feature</a>
  </p>
</div>


## 📜 Getting Started

### Prerequisites

-   You need a Rocket.Chat Server Setup
-   Rocket.Chat.Apps CLI,

*   In case you don't have run:
    ```sh
    npm install -g @rocket.chat/apps-cli
    ```

### ⚙️ Installation

-   Every RocketChat Apps runs on RocketChat Server, thus everytime you wanna test you need to deploy the app with this note. lets start setting up:

1. Clone the repo
    ```sh
    git clone https://github.com/<yourusername>/Apps.Leetcode.git
    ```
2. Install NPM packages
    ```sh
    npm ci
    ```
3. Deploy app using:

    ```sh
    rc-apps deploy --url <url> --username <username> --password <password>
    ```

<!-- ABOUT THE PROJECT -->

## ✅ About The Project:

```

The project aims to provide users efficiency by introducing a quick solution for checking leetcode stats of users on the go.
This will allow agents/user to check number of questions sovled by the user, their ranking, acceptance rate etc using the leetcodeAPI, accessible via a slash command.
By choosing leetcode stats app users can instantly get leetcode info instead of manually going to the leetcode website, finding the user and then getting the required info, improving productivity and user satisfaction.

```

## :rocket: Usage :

👋 Need some help with /lc or /lc user and stats?

-   **`/lc`**: Get started with Leetcode App
-   **`/lc <user-name> ques`**: Gets the number of total questions and types of questions
-   **`/lc <user-name> stats`**: List the Acceptance rate and ranking of the leetcode user
-   **`/lc help`**: Get help with using Leetcode App

<!-- CONTRIBUTING -->

## 🧑‍💻 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue.
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feat/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: adds some amazing feature'`)
4. Push to the Branch (`git push origin feat/AmazingFeature`)
5. Open a Pull Request

## 📚 Resources

Here are some links to examples and documentation:

-   [Rocket.Chat Apps TypeScript Definitions Documentation](https://rocketchat.github.io/Rocket.Chat.Apps-engine/)
-   [Rocket.Chat Apps TypeScript Definitions Repository](https://github.com/RocketChat/Rocket.Chat.Apps-engine)
-   [Example Rocket.Chat Apps](https://github.com/graywolf336/RocketChatApps)
-   [DemoApp](https://github.com/RocketChat/Rocket.Chat.Demo.App)
-   [GithubApp](https://github.com/RocketChat/Apps.Github22)
-   Community Forums
    -   [App Requests](https://forums.rocket.chat/c/rocket-chat-apps/requests)
    -   [App Guides](https://forums.rocket.chat/c/rocket-chat-apps/guides)
    -   [Top View of Both Categories](https://forums.rocket.chat/c/rocket-chat-apps)
-   [#rocketchat-apps on Open.Rocket.Chat](https://open.rocket.chat/channel/rocketchat-apps)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
