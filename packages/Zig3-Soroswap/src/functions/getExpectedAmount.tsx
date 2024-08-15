import { SorobanContextType } from '@soroban-react/core';
import BigNumber from 'bignumber.js';
import { reservesBNWithTokens } from 'hooks/useReserves';
import { TokenType } from 'interfaces';
import { TradeType } from 'state/routing/types';
import fromExactInputGetExpectedOutput from './fromExactInputGetExpectedOutput';
import fromExactOutputGetExpectedInput from './fromExactOutputGetExpectedInput';
import { getPairAddress } from './getPairAddress';

interface customReservesType {
  token0: TokenType;
  token1: TokenType;
  reserve0: BigNumber;
  reserve1: BigNumber;
}

export async function getExpectedAmount(
  currencyIn: TokenType | undefined,
  currencyOut: TokenType | undefined,
  amountIn: BigNumber,
  sorobanContext: SorobanContextType,
  tradeType?: TradeType,
  customReserves?: customReservesType,
) {
  if (!currencyIn || !currencyOut) return BigNumber('0');

  try {
    const pairAddress = await getPairAddress(
      currencyIn.contract,
      currencyOut.contract,
      sorobanContext,
    );
    const reserves = customReserves ?? (await reservesBNWithTokens(pairAddress, sorobanContext));

    let expectedOutput;
    if (tradeType === TradeType.EXACT_INPUT) {
      expectedOutput = fromExactInputGetExpectedOutput(
        amountIn,
        reserves.reserve0,
        reserves.reserve1,
      );
    } else {
      expectedOutput = fromExactOutputGetExpectedInput(
        amountIn,
        reserves.reserve0,
        reserves.reserve1,
      );
    }

    return expectedOutput;
  } catch (error) {
    return BigNumber(0);
  }
}

export interface ReservesType {
  reserve0: BigNumber | undefined;
  reserve1: BigNumber | undefined;
  token0?: string;
  token1?: string;
}
//This function do not call pairAddress and reservesBNWithTokens every time the input changes, instead it uses the reserves passed as argument
export async function getExpectedAmountNew(
  currencyIn: TokenType | undefined,
  currencyOut: TokenType | undefined,
  amountIn: BigNumber,
  reserves: ReservesType,
  tradeType?: TradeType,
) {
  if (!currencyIn || !currencyOut) return BigNumber('0');

  reserves.token0 == currencyIn.contract;
  let reserveIn: BigNumber | undefined, reserveOut: BigNumber | undefined;

  if (reserves.token0 == currencyIn.contract) {
    reserveIn = reserves.reserve0;
    reserveOut = reserves.reserve1;
  } else {
    reserveIn = reserves.reserve1;
    reserveOut = reserves.reserve0;
  }

  try {
    let expectedOutput;
    if (tradeType === TradeType.EXACT_INPUT) {
      expectedOutput = fromExactInputGetExpectedOutput(
        amountIn,
        reserveIn,
        reserveOut,
        currencyIn.decimals ?? 7,
      );
    } else {
      expectedOutput = fromExactOutputGetExpectedInput(amountIn, reserveIn, reserveOut);
    }

    return expectedOutput;
  } catch (error) {
    return BigNumber(0);
  }
}
