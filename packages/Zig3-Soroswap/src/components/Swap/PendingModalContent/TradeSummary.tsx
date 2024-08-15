import { styled } from '@mui/material';
import Column from 'components/Column';
import CurrencyLogo from 'components/Logo/CurrencyLogo';
import Row from 'components/Row';
import { LabelSmall } from 'components/Text';
import { formatTokenAmount } from 'helpers/format';
import { SuccessfullSwapResponse } from 'hooks/useSwapCallback';
import { ArrowDown } from 'react-feather';
import { InterfaceTrade } from 'state/routing/types';
import { ArrowContainer } from '../SwapComponent';
import { ArrowWrapper } from '../styleds';

const CustomRowTop = styled(Row)`
  border-radius: var(--arrendodamento, 16px);
  border: 1px solid var(--fora-do-brading-desativado, #4e4e4e);
  padding: 15px;
  margin-bottom: -4px;
`;
const CustomRowBottom = styled(Row)`
  border-radius: var(--arrendodamento, 16px);
  border: 1px solid var(--fora-do-brading-desativado, #4e4e4e);
  padding: 15px;
  margin-top: -4px;
`;

export function TradeSummary({
  trade,
  swapResult,
}: {
  swapResult?: SuccessfullSwapResponse;
  trade: Pick<InterfaceTrade, 'inputAmount' | 'outputAmount'>;
}) {
  const getSwappedAmounts = () => {
    let input = '0';
    let output = '0';
    if (swapResult && swapResult?.switchValues) {
      input = swapResult?.switchValues?.[0];
      output = swapResult?.switchValues?.[swapResult?.switchValues?.length - 1];
    } else {
      input = trade?.inputAmount?.value ?? '0';
      output = trade?.outputAmount?.value ?? '0';
    }

    const formattedInput = formatTokenAmount(input);
    const formattedOutput = formatTokenAmount(output);

    return { formattedInput, formattedOutput };
  };

  return (
    <Column>
      <CustomRowTop>
        <CurrencyLogo
          currency={trade?.inputAmount?.currency}
          size="16px"
          style={{ marginRight: '6px' }}
        />
        <LabelSmall color="textPrimary">
          {`${getSwappedAmounts().formattedInput} ${trade?.inputAmount?.currency.code}`}
        </LabelSmall>
      </CustomRowTop>
      <ArrowWrapper clickable={false}>
        <ArrowContainer data-testid="swap-currency-button">
          <ArrowDown size="16" color={'#000000'} />
        </ArrowContainer>
      </ArrowWrapper>
      <CustomRowBottom>
        <CurrencyLogo
          currency={trade?.outputAmount?.currency}
          size="16px"
          style={{ marginRight: '6px' }}
        />
        <LabelSmall color="textPrimary">
          {`${getSwappedAmounts().formattedOutput} ${trade?.outputAmount?.currency.code}`}{' '}
        </LabelSmall>
      </CustomRowBottom>
    </Column>
  );
}
