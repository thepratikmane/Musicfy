import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";

import { logo } from "../assets";
import { links } from "../assets/constants";
import { HiOutlineMenu } from "react-icons/hi";



const NavLinks = ({ handleClick }) => (
  <div className="mt-10" >
    {links.map((item) => (
      // this component is part of react-router-dom
      <NavLink
        key={item.name}
        to={item.to}
        className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400"
        onClick={() => handleClick && handleClick()}
      >
        <item.icon className="2-6 h-6 mr-2" />
        {item.name}
      </NavLink>
    ))}
  </div >
);


const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* sidebar on bigger screens */}
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#191624]" >
        <img src={logo} style={{ width: '150px', height: 'auto', margin: '0 auto' }} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks /> {/*This component is made my me*/}
      </div>

      {/* SIDEBAR OF MOBILE DEVICES */}
      {/* Hamburger and close icons on the right side */}
      <div className="absolute md:hidden block top-6 right-3" >
        {mobileMenuOpen ? (
          <RiCloseLine className="w-6 h-6 text-white mr-2"
            onClick={() => setMobileMenuOpen(false)} />
        ) : <HiOutlineMenu className="w-6 h-6 text-white mr-2"
          onClick={() => setMobileMenuOpen(true)} />}
      </div>

      {/*actual sidebar coming from the left, left-0 and -left-full will make the sidebar appear or not  */}
      <div className={` absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483db] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${mobileMenuOpen ? 'left-0' : '-left-full'} `}>
        <img src={logo} style={{ width: '150px', height: 'auto', margin: '0 auto' }} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks handleClick={() => setMobileMenuOpen(false)} /> {/*This component is made my me , also when clicked on any of the links, the sidebar closes automatically*/}
      </div>
    </>
  );
};

export default Sidebar;
