import React from 'react'
import HomeHeader from './headers/home/home-header';
import MainHeader from './headers/main/main-header';

interface HeaderProps {
    type: "home" | "main";
}

const Header: React.FC<HeaderProps> = ({ type }) => {
  return (
    type === "home" ? <HomeHeader /> : <MainHeader />
  )
}

export default Header