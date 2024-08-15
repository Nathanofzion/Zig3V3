import { Keypair } from "@stellar/stellar-sdk";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { AddressBook } from "../utils/address_book.js";
import { bumpContractCode, installContract } from "../utils/contract.js";
import { TokensBook } from "../utils/tokens_book.js";
import { deployToken } from "./deploy_token.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const network = process.argv[2];

export async function deploySorobanTestTokens(
  numberOfTokens: number,
  resetTokensBook: boolean,
  tokensBook: TokensBook,
  addressBook: AddressBook,
  source: Keypair
) {
  const fileName = network=='mainnet' ? `../../scripts/token_name_ideas_mainnet.json` : `../../scripts/token_name_ideas.json`;
  try {
    if (resetTokensBook) {
      tokensBook.resetNetworkTokens(network);
    }
    // Instaling token contract
    await installContract("token", addressBook, source);
    await bumpContractCode("token", addressBook, source);

    const tokenNameIdeas = readFileSync(path.join(__dirname, fileName));
    const tokenNameIdeasObject = JSON.parse(tokenNameIdeas.toString());
    for (let i = 0; i < numberOfTokens; i++) {
      const tokenIdea = tokenNameIdeasObject.tokens[i];
      const deployedToken = await deployToken(
        tokenIdea.name,
        tokenIdea.symbol,
        tokenIdea.icon,
        source,
        addressBook,
      );
      tokensBook.addToken(network, deployedToken!);
      console.log(
        `🚀 Token ${deployedToken?.code} deployed successfully, address ${deployedToken?.contract}`,
      );
    }
    tokensBook.writeToFile();
  } catch (error) {
    console.log("🚀 deploySorobanTestTokens: error:", error);
  }
}
