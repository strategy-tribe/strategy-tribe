# StrategyTribe

Source code for StrategyTribe, an open source project dedicated to crowdsourcing and crowdfunding OSINT locating the cryptowallets of threat actors.

This is a work in progress.

## Stack

- [NextJs](https://nextjs.org/ 'NextJs')
- [Moralis](https://moralis.io/ 'Moralis')
- [React-Query](https://react-query.tanstack.com/overview 'React-Query')
- [Framer-Motion](https://www.framer.com/docs/ 'Framer-Motion')
- [TailwindCSS](https://tailwindcss.com/docs/installation 'TailwindCSS')

## How to run locally

### 1. Get the files

    git clone <repo_url>
    cd strategy-tribe


### 2. Set up the backend & env variables

StrategyTribe runs with a Moralis backend. Create one [here](https://moralis.io/ 'here'). Once created, add the `server_url` and the `application_id` as env variables.

Create a `.env.local` on the root of the strategy-tribe folder:

```
//On your .env.local
NEXT_PUBLIC_SERVER_URL = <your_server_url>
NEXT_PUBLIC_APP_ID = <your_server_app_id>
```

This url will depend on what network was picked when creating the server.

```
//On your .env.local
NEXT_PUBLIC_ETHERSCAN_URL = https://rinkeby.etherscan.io/address/
```

If deploying to something like Netlify of Vercel, update this domain.

```
//On your .env.local
NEXT_PUBLIC_BASE_URL= http://localhost:YOURPORT
```

### 3. Set up the server cloud functions

In `src/moralis/cloud` is all the code Moralis cloud functions need to work. In the dashboard of Moralis, click on your server, then on the 'Cloud Functions' button. Click there and there will be a command template. Now:

1. [Install Moralis CLI](https://docs.moralis.io/moralis-dapp/tools/moralis-admin-cli 'Install Moralis CLI').
2. Copy the template command.
3. Point the CLI to the `src/moralis/cloud` folder.
4. Run it.

The command should look something like this, with the last section being the path to the `cloud` folder:
<br/>
`moralis-admin-cli watch-cloud-folder --moralisApiKey <your_key> --moralisApiSecret <your_api_secret> --moralisSubdomain <your_subdomain> --autoSave 1 --moralisCloudfolder ./src/moralis/cloud`

This command will listen to changes in the cloud folder and upload them to the moralis server.

#### Server variables

The server has its own env variables, Moralis calls them "parameters". Set them up in
<br/>
`Your Dashboard > Your server > Dashboard > Config`.

Add a new parameter and name it `CHAIN_CODE`. This is the chain code of the blockchain the server is running on. For example, mainnet would be `0x1` and rinkeby `0x4`. Must be the same as the one picked when creating the server.

<br/>

### 4. Start the local server

Run:

    npm install
    npm run dev
