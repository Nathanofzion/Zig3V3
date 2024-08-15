import { Box, Switch, SwitchProps, styled, useMediaQuery, useTheme } from '@mui/material';
import logo from 'assets/images/logo.png';
import darkModeMoon from 'assets/svg/darkModeMoon.svg';
import lightModeSun from 'assets/svg/lightModeSun.svg';
import { ActiveAirdropButton, AirdropButton } from 'components/Buttons/Airdrop';
import { ColorModeContext } from 'contexts';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Menu } from 'react-feather';
import ProfileSection, { ActiveChainHeaderChip } from './ProfileSection';

const HeaderContainer = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const MainBox = styled('div') <{ isMobile: boolean }>`
  display: flex;
  width: 100%;
  padding: ${({ isMobile }) => (isMobile ? '24px 15px' : '24px 75px')};
  align-items: center;
  justify-content: space-between;
  gap: 40px;
`;

const BorderBox = styled('div')`
  height: 10px;
  background: linear-gradient(90deg,#a588e4,#b7fee0);
`

const NavBar = styled('div')`
  display: flex;
  height: 56px;
  padding: 8px 16px;
  align-items: center;
  gap: 8px;
  border-radius: 32px;
  background: ${({ theme }) => theme.palette.background.paper};
  box-shadow: 0px 4px 10px 0px rgba(136, 102, 221, 0.03);
`;

const NavBarMobile = styled('div')`
  display: flex;
  height: 48px;
  width: 100%;
  padding: 8px 16px;
  align-items: center;
  gap: 8px;
  border-radius: 32px;
  background: ${({ theme }) => theme.palette.background.paper};
  box-shadow: 0px 4px 10px 0px rgba(136, 102, 221, 0.03);
`;

const NavBarContainer = styled('div')`
  position: fixed;
  bottom: 1rem;
  display: flex;
  left: 50%;
  transform: translateX(-50%);
`;

const ButtonsBox = styled('div')`
  display: flex;
  align-items: center;
`;

const NavItem = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'active',
}) <{ active?: boolean }>`
  display: flex;
  padding: 4px 24px;
  align-items: center;
  gap: 10px;
  border-radius: 32px;
  background: ${({ active }) => (active ? '#00615F' : '')};
  text-align: center;
  color: ${({ theme, active }) => (active ? '#FFFFFF' : theme.palette.custom.textTertiary)};
  font-family: Inter;
  font-size: 20px;
  font-weight: 600;
  line-height: 140%;
`;

const NavItemMobile = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'active',
}) <{ active?: boolean }>`
  display: flex;
  padding: 8px 18px;
  align-items: center;
  gap: 10px;
  border-radius: 18px;
  background: ${({ active }) => (active ? '#00615F' : '')};
  text-align: center;
  color: ${({ theme, active }) => (active ? '#FFFFFF' : theme.palette.custom.textTertiary)};
  font-family: Inter;
  font-size: 16px;
  font-weight: 600;
  line-height: 100%;
`;

export const ModeSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 104,
  height: 56,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 8,
    '&.Mui-checked': {
      transform: 'translateX(46px)',
      color: '#00615F',
      '& .MuiSwitch-thumb:before': {
        backgroundColor: '#00615F',
        borderRadius: 32,
        backgroundImage: `url('${darkModeMoon.src}')`,
      },
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.background.paper,
        opacity: 1,
        border: 0,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#F88F6D',
    width: 40,
    height: 40,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('${lightModeSun.src}')`,
    },
  },
  '& .MuiSwitch-track': {
    borderRadius: 32,
    backgroundColor: theme.palette.background.paper,
    opacity: 1,
  },
}));



interface HeaderProps {
  isDrawerOpen: boolean;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({ isDrawerOpen, setDrawerOpen }: HeaderProps) {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  const router = useRouter();
  const { pathname } = router;

  const isMobile = useMediaQuery(theme.breakpoints.down(1220));

  const logoWidth = isMobile ? 48 : 70;
  const logoHeight = isMobile ? 48 : 70;

  interface NavItem {
    href: string;
    label: string;
    target?: string;
  }

  const navItems: NavItem[] = [
    { href: '/balance', label: 'Balance', target: '_self' },
    { href: '/swap', label: 'Swap', target: '_self' },
    { href: '/liquidity', label: 'Liquidity', target: '_self' },
    { href: '/bridge', label: 'Bridge', target: '_self' },
    { href: 'https://info.soroswap.finance', label: 'Info', target: '_blank' },
  ];

  return (
    <HeaderContainer>
      <MainBox isMobile={isMobile} >
        <Image
          src={
            theme.palette.mode === 'dark'
              ? logo.src
              : logo.src
          }
          width={70}
          height={70}
          style={{
            width: '100%',
            height: '100%',
            maxWidth: logoWidth,
            maxHeight: logoHeight,
            minHeight: 30,
            minWidth: 30,
          }}
          alt={'Soroswap'}
        />

        {!isMobile ? (
          <>
            <NavBar data-testid="nav">
              {navItems.map((item) => (
                <NavItem
                  key={item.href}
                  href={item.href}
                  active={item.label === 'Swap' ? (pathname.includes(item.href) || pathname === '/') : pathname.includes(item.href)}
                  target={item.target}
                  data-testid="nav-link"
                >
                  {item.label}
                </NavItem>
              ))}
            </NavBar>
            <ButtonsBox>
              <ModeSwitch
                sx={{ m: 1 }}
                defaultChecked={theme.palette.mode === 'dark' ? true : false}
                onChange={(e) => colorMode.toggleColorMode()}
              />
              <AirdropButton style={{ marginRight: '8px' }} />
              <ProfileSection />
            </ButtonsBox>
          </>
        ) : (
          <>
            <Box display="flex" alignItems="center" gap="18px" >
              <ActiveChainHeaderChip isMobile={isMobile} />
              <ActiveAirdropButton style={{ marginLeft: '8px' }} />
              <Menu
                onClick={() => setDrawerOpen(!isDrawerOpen)}
                width={24}
                height={24}
                color={theme.palette.custom.borderColor}
              />
            </Box>
            <NavBarContainer>
              <NavBarMobile>
                {navItems.map((item) => (
                  <NavItemMobile
                    key={item.href}
                    href={item.href}
                    active={item.label === 'Swap' ? (pathname.includes(item.href) || pathname === '/') : pathname.includes(item.href)}
                  >
                    {item.label}
                  </NavItemMobile>
                ))}
              </NavBarMobile>
            </NavBarContainer>
          </>
        )}
      </MainBox>
      <BorderBox />
    </HeaderContainer>
  );
}
