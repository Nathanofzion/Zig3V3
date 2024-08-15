# Soroswap core Smart Contracts.

Make sure to compile contracts in the right order: token, pair, factory, library, router. If you just do `cd contracts && make build`, this will be done in the correct order ;)

Check the documentation in

- https://github.com/soroswap/docs/
- https://docs.soroswap.finance/

## TLDR;

### 0. Prerequisites

jq, docker, docker-compose, node, yarn

### 1. Setup

1.1. Clone this repo

```
git clone http://github.com/soroswap/core.git
```

1.2 In one terminal: (choose standalone, futurenet or testnet)

```
bash scripts/quickstart.sh standalone # or futurenet or testnet
```

1.3. In another terminal

```
bash scripts/run.sh
```

1.4 yarn install

```
yarn
```


### 2. Deploy populated network

In the same terminal mentioned before, run:

>[!Note]
>- Accepted values for network are: `standalone | testnet | futurenet`
>- Accepted values for mode are: `local | public`
  

```

    bash scripts/populate_network.sh <network> <mode>

```


This will:  
- Create 8 test tokens.

- Build and install the SoroswapPair contract in Soroban.

- Build and Deploy the SoroswapFactory contract and initialize it with the installed SoroswapPair WASM.

- Build and Deploy the SoroswapRouter contract and initialize it with the deployed Factoy address.

- Create 64 Pairs (all combinations between pairs) using the Router contract.

- Create 6 custom liquidity pools.

- Create `.soroban/tokens.json`, `.soroban/factory.json`, `.soroban/pairs.json` and `.soroban/token_admin_keys.json`  
  

This will create the `.soroban` folder with a lot of useful `.json` files with the contract and admin addresses.

When selecting mode you can choose between `local` and `public`. This will modify the script that adds liquidity to the pairs. If you choose `local` the script will use the local addresses from `.soroban` folder. If you choose `public` the script will use the public addresses from `./public` folder.

### 3. (For local development): Serve those .json files

In a new terminal run

```
bash scripts/serve_with_docker.sh
```

This will serve:

- List of tokens at http://localhost:8010/api/tokens
- Factory addresses http://localhost:8010/api/factory
- Router addresses http://localhost:8010/api/router
- Admin keys http://localhost:8010/api/keys
- Created pairs http://localhost:8010/api/keys

The created pairs won't be readed by the front-end, however will be useful to debug

### 4. (For production): Public those .json files and serve them using Vercel

From project root:

```
bash scripts/run.sh
bash scripts/upload_addresses.sh
```

Make sure that the origin is the soroswap/core.git ... Otherwise the only thing to do is to update the files on ./public and push them to main.

If everything goes right. Vercel will serve the created .json files in the following API's:

https://api.soroswap.finance/api/factory
https://api.soroswap.finance/api/keys
https://api.soroswap.finance/api/tokens
https://api.soroswap.finance/api/pairs

#### Note:

If you want to deploy both in standalone an futurenet you can deploy first on futurenet and then on standalone. Then your dapp will connect to standalone using your quickstart containter and to futurenet using the public RPC.

---

# Compile and Test the contracts

## Prepare

1.- Run the Stellar Quickstart and the @esteblock/soroban-preview Docker containers
Here you can choose to use an `standalone` or `futurenet` instance

```
bash scripts/quickstart.sh standalone
```

2.- Run a terminal with the `@esteblock/soroban-preview` image container

```
bash scripts/run.sh
```

## Compile

3.- Inside the soroban-preview container, compile all contracts:

```
cd contracts
make build
```

If you ran this command in the `/workspace` path, this will compile both contracts

## Test

4.- Run tests in all contracts

```
make test
```

## Check budget usage

If you want to know how the memory and CPU instructions usage, you can go, for each contract and do:

```
cd router
cargo test budget -- --nocapture
```

This will run the `/contracts/router/budget.rs` test that by using `env.budget`, calculates the budget.

## Experiment using the soroban CLI

We have some tutorials about this. Check [docs.soroswap.finance](https://docs.soroswap.finance/), [6 chapters dev.to tutorial: ](https://dev.to/esteblock/series/22986) or the [soroswap/docs repo](https://github.com/soroswap/docs)

If you want to go fast to the soroban CLI "manual experiment":

```bash
bash scripts/manual_testing/all.sh standalone local
```

This will take all standalone deployments available in `.soroban` (local) and will do 1) Mint test tokens, 2) Provide Liqudiity 3) Swap 4) Remove Liquidity.

You can change `standalone` for `testnet` and use the `testnet` deployed address.
You can change `local` for `public` in order to take addresses from the `./public` folder

## Stellar Assets

The script `scripts/setup_stellar_classic_assets.sh` gets all the Stellar Assets from `known_stellar_classic_assets.json` and puts them into the tokens.json file for the API

This will get the token id and wrap the native (XLM) token if the network is standalone

```bash
#This gets the address of any Stellar assets --asset can be either native or <TOKEN:ISSUER>
soroban lab token id --network standalone --asset native

#If using standalone the native asset needs to be wrapped for it to work
soroban lab token wrap --asset native --network standalone --source-account my-account

#PS: If it gives an error... or the token is already wrapped or your source account is not funded
```

## `deploy_random_tokens.sh` Script Documentation

#### Overview

The `deploy_random_tokens.sh` script deploys a specified number of random test tokens to a selected blockchain network.

#### Usage

```bash
scripts/deploy_random_tokens.sh <network> [<number_of_tokens>]
```

- `<network>`: Choose from standalone, futurenet, or testnet.
- `<number_of_tokens>`: Optional, defaults to 4 if not specified.

#### Functionality

- Creates a specified number of test tokens.
- Saves token details in .soroban/random_tokens.json.
- Appends new tokens on futurenet and testnet.
- Replaces or appends tokens for standalone based on prior runs.

#### Handling Network Resets

Manually update or delete random_tokens.json post-reset on futurenet or testnet.

# Manual Testing

The following example showcase a local manual testing.
Make sure you have deployed the contracts to testnet and saved it locally 


We provide code for manual testing of the contracts using `soroban-cli`. This will allow us to play aroung without the need of an User Interface.

To run all the transsactions we could do on soroswap protocol just run (inside soroban-preview image):
```bash
# Usage:
# ./all.sh [network] [local_or_public]
# network: Type of the network to configure (standalone, futurenet, testnet, testnet-public)
# local_or_public: Type of contract deployment (local or public)

bash scripts/manual_testing/all.sh testnet local

```

## Running the typescript tests



**Step 1: Start the development environment**

 1. Start the development environment. This can be done by executing the
    following command:
```
bash scripts/quickstart.sh standalone
```
2.  Start the development container. To start the development container, in a new terminal, run the command:
 ```
bash scripts/run.sh
```

3.  Deploy the tokens. Once the development container is started, run the command:
```
bash scripts/deploy_tokens_n_pairs.sh standalone 8
```
 >[!TIP]
 >8 is a suggestion, you can put any even number to not to break the pair creation

This will start a standalone development environment with the contracts running.

4. Deploy the API:

To deploy the API, open a new terminal and run the following command:

Bash

```
scripts/serve_with_docker.sh

```

This will make the following files available for running tests:
-   List of tokens at http://localhost:8010/api/tokens
-   Router addresses at http://localhost:8010/api/router


**Step 2: Run the tests**

This can be done by executing the following command on test environment terminal:
```
yarn test
```
>[!TIP]
>The development container is the one that was opened in step 1.2

This command will run all of the tests for the contracts.
