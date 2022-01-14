// import { react, useState } from 'react';
// import {
//   getAuth,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
// } from 'firebase/auth';
// import 'styles.css';

// const AuthForm = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [newAccount, setNewAccount] = useState(true);
//   const toggleAccount = () => setNewAccount((prev) => !prev);

//   const onChange = (e) => {
//     const {
//       target: { name, value },
//     } = e;
//     if (name === "email") {
//       setEmail(value);
//     } else if (name === "password") {
//       setPassword(value);
//     }
//   };
//   const onSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const auth = getAuth();
//       let data;
//       if (newAccount) {
//         // 계정 생성
//         data = await createUserWithEmailAndPassword(auth, email, password);
//       } else {
//         // 로그ㅜ인
//         data = await signInWithEmailAndPassword(auth, email, password);
//       }
//     } catch (error) {
//       setError(error.message);
//       alert("아래의 에러메세지를 확인 후 다시 시도해주세요 \n" + error);
//     }
//   };

//   return (
//     <form onSubmit={onSubmit} className="AuthForm">
//       <input
//         name="email"
//         type="text"
//         placeholder="Email"
//         required
//         value={email}
//         onChange={onChange}
//         className="Input_IdPw"
//       />
//       <input
//         name="password"
//         type="password"
//         placeholder="password"
//         required
//         value={password}
//         onChange={onChange}
//         className="Input_IdPw"
//       />
//       <div>
//         계정이 없으신가요?
//         <input
//           type="submit"
//           value={"계정 생성하기"}
//           className="Button_CreateAccount"
//         />
//       </div>
//       <input type="submit" value={"로그인"} className="Button_Login" />
//     </form>
//   );
// };

// export default AuthForm;
