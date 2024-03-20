import { Flex, Icon, Text, Link  } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

const NavLink = ({ link, ...rest }) => {
  const { label, icon, href } = link;
  return (
    <Link as={ReactRouterLink} to={href}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "cyan.400",
            color: "white",
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="18"
              _groupHover={{
                color: "white",
              }}
              as={icon}
            />
          )}
          <Text fontSize="1.2rem">{label}</Text>
        </Flex>
    </Link>
  );
} 

export default NavLink