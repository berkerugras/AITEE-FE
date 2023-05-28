// import React, { createContext, useState, useEffect } from "react";
// import jwt_decode from "jwt-decode";
// import { useLocation, useHistory, useNavigate } from 'react-router-dom';

// const AuthContext = createContext();

// export const AuthContextProvider = ({ children }) => {
//     const history = useNavigate();

//     const [valid, setValid] = useState(null);

//     useEffect(() => {
//         if (localStorage.getItem('userData') !== null) {
//             try {
//                 let token = JSON.parse(localStorage.getItem("userData")).token;
//                 console.log(token);
//                 if (token !== null) {
//                     let decodedToken = jwt_decode(token);
//                     console.log("Decoded Token", decodedToken);
//                     let currentDate = new Date();
//                     console.log(currentDate.getTime());
//                     if (decodedToken.exp * 1000 < currentDate.getTime()) {
//                         setValid(false);
//                         history('/signin')
//                         localStorage.clear();
//                     } else {
//                         setValid(true);
//                         console.log("Valid token");
//                     }
//                 }
//             } catch {
//                 setValid(false);
//                 localStorage.clear();
//             }
//         }
//     }, [history]);

//     return (
//         <AuthContext.Provider value={{ valid }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export default AuthContext;