import { styled } from '@mui/material'
import { lighten } from 'polished'
import { loadingAnimation } from '../Loader/styled'

/* Loading state bubbles (animation style from: src/components/Loader/styled.tsx) */
export const LoadingBubble = styled('div')<{
  height?: string
  width?: string
  round?: boolean
  delay?: string
  margin?: string
}>`
  border-radius: 12px;
  border-radius: ${({ round }) => (round ? '50%' : '12px')};
  ${({ margin }) => margin && `margin: ${margin}`};
  height: ${({ height }) => height ?? '24px'};
  width: 50%;
  width: ${({ width }) => width ?? '50%'};
  animation: ${loadingAnimation} 1.5s infinite;
  ${({ delay }) => delay && `animation-delay: ${delay};`}
  animation-fill-mode: both;
  background: linear-gradient(
    to left,
    ${({ theme }) => theme.palette.customBackground.interactive} 25%,
    ${({ theme }) => lighten(0.075, theme.palette.customBackground.interactive)} 50%,
    ${({ theme }) => theme.palette.customBackground.interactive} 75%
  );
  will-change: background-position;
  background-size: 400%;
`
