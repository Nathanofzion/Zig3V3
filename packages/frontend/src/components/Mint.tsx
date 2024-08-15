import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import { SorobanContextType, useSorobanReact } from '@soroban-react/core';
import React, { useEffect, useState } from 'react';

import BigNumber from 'bignumber.js';
import { formatTokenAmount } from 'helpers/format';
import { tokenBalance } from 'hooks';
import { useApiTokens } from 'hooks/tokens/useApiTokens';
import { MintButton } from '../components/Buttons/MintButton';
import { TokenType } from '../interfaces';

export function Mint() {
  const sorobanContext: SorobanContextType = useSorobanReact();
  const { tokens: tokensList } = useApiTokens();

  const [inputToken, setInputToken] = useState<TokenType>();
  const [mintTokenId, setMintTokenId] = useState<string>('');
  const [amount, setAmount] = useState(BigNumber(0));

  const handleInputTokenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedToken = tokensList.find((token) => token.code == event.target.value);

    if (selectedToken) {
      setInputToken(selectedToken);
      setMintTokenId(selectedToken.contract);
    }
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(BigNumber(event.target.value));
  };

  useEffect(() => {
    setInputToken(tokensList[0]);
    setMintTokenId(tokensList[0]?.contract);
  }, [tokensList]);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Mint
        </Typography>
        {sorobanContext.address ? (
          <div>
            <TextField
              id="outlined-select-currency"
              select
              label="Token to Mint"
              defaultValue="AAAA"
              onChange={handleInputTokenChange}
            >
              {tokensList.map((option) => (
                <MenuItem key={option.contract} value={option.code}>
                  {`${option.name} (${option.code})`}
                </MenuItem>
              ))}
            </TextField>
            <FormControl>
              <InputLabel htmlFor="outlined-adornment-amount">Amount to Mint</InputLabel>
              <OutlinedInput
                type="number"
                id="outlined-adornment-amount"
                onChange={handleAmountChange}
                startAdornment={
                  <InputAdornment position="start">{inputToken?.code}</InputAdornment>
                }
                label="Amount"
              />
            </FormControl>
            {inputToken && (
              <MintTokens
                sorobanContext={sorobanContext}
                address={sorobanContext.address}
                inputToken={inputToken}
                amountToMint={amount}
              />
            )}
          </div>
        ) : (
          <div>Connect your Wallet</div>
        )}
      </CardContent>
    </Card>
  );
}

export function MintTokens({
  sorobanContext,
  address,
  inputToken,
  amountToMint,
}: {
  sorobanContext: SorobanContextType;
  address: string;
  inputToken: TokenType;
  amountToMint: BigNumber;
}) {
  const [balance, setBalance] = useState<string>();

  useEffect(() => {
    if (sorobanContext.activeChain && sorobanContext.address) {
      tokenBalance(inputToken.contract, sorobanContext.address, sorobanContext).then((resp) => {
        setBalance(formatTokenAmount(resp as BigNumber));
      });
    }
  }, [inputToken.contract, sorobanContext]);

  return (
    <div>
      <p>
        Your current balance: {balance} {inputToken.code}
      </p>
      <CardActions>
        <MintButton
          sorobanContext={sorobanContext}
          token={inputToken}
          amountToMint={amountToMint}
        />
      </CardActions>
    </div>
  );
}
