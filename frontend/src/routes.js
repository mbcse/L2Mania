
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import WalletAuth from 'views/examples/WalletAuth.js'
import L2Assets from "views/examples/L2Assets.js";
import TransactionBar from "views/examples/TransactionBar";

var routes = [
  {
    path: "/index",
    name: "L2 Explorer",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "ni ni-planet text-blue",
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: Maps,
  //   layout: "/admin"
  // },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: Profile,
  //   layout: "/admin"
  // },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: Tables,
  //   layout: "/admin"
  // },
  // {
  //   path: "/login",
  //   name: "Login",
  //   icon: "ni ni-key-25 text-info",
  //   component: Login,
  //   layout: "/auth"
  // },
  // {
  //   path: "/register",
  //   name: "Register",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: Register,
  //   layout: "/auth"
  // },
  {
    path: "/login",
    name: "Landing",
    icon: "ni ni-key-25 text-info",
    component: WalletAuth,
    layout: "/landing"
  },

  {
    path: "/l2assets",
    name: "L2 Assets",
    icon: "ni ni-bullet-list-67 text-red",
    component: L2Assets,
    layout: "/admin"
  },
  {
    path: "/transactionsearch",
    name: "Transaction",
    icon: "ni ni-bullet-list-67 text-red",
    component: TransactionBar,
    layout: "/admin"
  },
];
export default routes;
