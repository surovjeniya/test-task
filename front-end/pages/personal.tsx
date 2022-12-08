import axios from "axios";
import { useAuth } from "hooks/useAuth";
import { GetStaticProps } from "next";
import { Personal } from "pages/Personal/Personal";
import { NextPageAuth } from "providers/private-route.interface";
import { useEffect, useState } from "react";
import { userService } from "services/user.service";
import { store } from "store/store";
import { IUser } from "types/user.interface";

const PersonalPage: NextPageAuth = () => {
  return <Personal />;
};

PersonalPage.isOnlyUser = true;

// export const getStaticProps: GetStaticProps = async () => {
//   const data = await userService.getPersonalInfo();
//   return {
//     props: {
//       data,
//     },
//   };
// };

export default PersonalPage;
