import tw from "tailwind-styled-components";

interface ContainerProps {
  $expanded: boolean;
}

export const Container = tw.div<ContainerProps>`  
  h-screen
  flex
  flex-col
  justify-between
  transition-all
  duration-300
  ${(p) => (p.$expanded ? "w-64" : "w-16")}
  bg-[#E9E9E9]
  fixed
  top-auto 
  left-0
  z-50
  shadow-md
`;

export const MenuWrapper = tw.div`
  flex
  flex-col
  gap-4
  mt-4
  px-2
`;

export const IconWrapper = tw.div`
  text-black
  text-xl
`;

export const MenuItem = tw.div<{ $selected?: boolean }>`
  flex
  items-center
  gap-4
  p-2
  rounded-md
  cursor-pointer
  transition-colors
  duration-200
  ${(p) => (p.$selected ? "bg-[#9C0D38BF] text-white" : "hover:bg-[#9C0D38] hover:text-white")}
`;

export const IconLabel = tw.span`
  text-black
  font-medium
`;

export const Footer = tw.div`
  flex
  flex-col
  gap-4
  p-2
  mb-4
`;

export const UserInfo = tw.div`
  flex
  items-center
  gap-4
  p-4
  bg-[#9C0D38]
  text-white
  rounded-md
`;

export const UserName = tw.div`
  font-bold
  text-lg
`;

export const UserStatus = tw.div`
  text-sm
  text-green-300
`;
