(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[966],{6933:function(e,s,t){Promise.resolve().then(t.bind(t,7156))},7156:function(e,s,t){"use strict";t.r(s),t.d(s,{default:function(){return i}});var l=t(7437),r=t(2265),a=t(6123),o=t(7907);function i(){let[e,s]=(0,r.useState)(""),[t,i]=(0,r.useState)(""),[n,c]=(0,r.useState)(null),[d,m]=(0,r.useState)(""),[u,x]=(0,r.useState)(!0),h=(0,o.useRouter)(),p=async s=>{if(s.preventDefault(),""===e||""===d||""===t)return alert("Please fill in all fields"),!1;let l=new FormData;l.append("profile",n),l.append("username",e),l.append("email",t),l.append("password",d);try{let e=await fetch("".concat("http://localhost:8010","/register"),{method:"POST",body:l}),s=await e.json();if(400===e.statusCode)throw console.log(s),a.Am.error("Choose a strong password",{position:"top-center",autoClose:2e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"dark"}),Error("User registration failed, Password encryption failed");if(e.ok)"success"===s.status&&(document.cookie="cookie-1 = ".concat(s.token),a.Am.success("User Registration success",{position:"top-center",autoClose:2e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"dark"}));else throw console.log(s),a.Am.error("User Registration failed",{position:"top-center",autoClose:2e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"dark"}),Error("User registration failed");setTimeout(()=>{h.push("/login")},1500)}catch(e){console.error("Server error",e)}};return(0,l.jsx)("div",{className:"font-[sans-serif] bg-white text-white md:h-screen",children:(0,l.jsxs)("div",{className:"grid md:grid-cols-2 items-center gap-8 h-full",children:[(0,l.jsx)("div",{className:"max-md:order-1 p-4",children:(0,l.jsx)("img",{src:"https://readymadeui.com/signin-image.webp",className:"lg:max-w-[90%] w-full h-full object-contain block mx-auto",alt:"login-image"})}),(0,l.jsx)("div",{className:"flex items-center md:p-8 p-6 bg-[#0C172C] h-full lg:w-11/12 lg:ml-auto",children:(0,l.jsxs)("form",{className:"max-w-lg w-full mx-auto",children:[(0,l.jsx)("div",{className:"mb-12",children:(0,l.jsx)("h3",{className:"text-3xl font-bold text-yellow-400",children:"Create an account"})}),(0,l.jsxs)("div",{children:[(0,l.jsx)("label",{className:"text-xs block mb-2",children:"Full Name"}),(0,l.jsxs)("div",{className:"relative flex items-center",children:[(0,l.jsx)("input",{name:"name",type:"text",required:!0,className:"w-full bg-transparent text-sm border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none",placeholder:"Enter name",onChange:e=>s(e.target.value)}),(0,l.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"#bbb",stroke:"#bbb",className:"w-[18px] h-[18px] absolute right-2",viewBox:"0 0 24 24",children:[(0,l.jsx)("circle",{cx:"10",cy:"7",r:"6","data-original":"#000000"}),(0,l.jsx)("path",{d:"M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z","data-original":"#000000"})]})]})]}),(0,l.jsxs)("div",{className:"mt-10",children:[(0,l.jsx)("label",{className:"text-xs block mb-2",children:"Email"}),(0,l.jsxs)("div",{className:"relative flex items-center",children:[(0,l.jsx)("input",{name:"email",type:"text",required:!0,className:"w-full bg-transparent text-sm border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none",placeholder:"Enter email",onChange:e=>i(e.target.value)}),(0,l.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"#bbb",stroke:"#bbb",className:"w-[18px] h-[18px] absolute right-2",viewBox:"0 0 682.667 682.667",children:[(0,l.jsx)("defs",{children:(0,l.jsx)("clipPath",{id:"a",clipPathUnits:"userSpaceOnUse",children:(0,l.jsx)("path",{d:"M0 512h512V0H0Z","data-original":"#000000"})})}),(0,l.jsxs)("g",{clipPath:"url(#a)",transform:"matrix(1.33 0 0 -1.33 0 682.667)",children:[(0,l.jsx)("path",{fill:"none",strokeMiterlimit:"10",strokeWidth:"40",d:"M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z","data-original":"#000000"}),(0,l.jsx)("path",{d:"M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z","data-original":"#000000"})]})]})]})]}),(0,l.jsxs)("div",{className:"mt-10",children:[(0,l.jsx)("label",{className:"text-xs block mb-2",children:"Password"}),(0,l.jsxs)("div",{className:"relative flex items-center",children:[(0,l.jsx)("input",{name:"password",type:u?"password":"text",required:!0,className:"w-full bg-transparent text-sm border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none",placeholder:"Enter password",onChange:e=>m(e.target.value)}),(0,l.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"#bbb",stroke:"#bbb",className:"w-[18px] h-[18px] absolute right-2 cursor-pointer",viewBox:"0 0 128 128",onClick:()=>x(!u),children:(0,l.jsx)("path",{d:"M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z","data-original":"#000000"})})]})]}),(0,l.jsx)("div",{className:"flex items-center space-x-6 mt-7",children:(0,l.jsxs)("label",{className:"block",children:[(0,l.jsx)("span",{className:"text-xs",children:"Choose your profile photo"}),(0,l.jsx)("input",{type:"file",onChange:e=>c(e.target.files[0]),className:"mt-3 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"})]})}),(0,l.jsxs)("div",{className:"mt-12",children:[(0,l.jsx)("button",{onClick:p,type:"button",className:"w-max shadow-xl py-2.5 px-8 text-sm font-semibold rounded-md bg-transparent text-yellow-400 border border-yellow-400 focus:outline-none",children:"Register"}),(0,l.jsxs)("p",{className:"text-sm mt-8",children:["Already have an account?"," ",(0,l.jsx)("a",{href:"/login",className:"text-yellow-400 font-semibold hover:underline ml-1",children:"Login here"})]})]})]})})]})})}},7907:function(e,s,t){"use strict";var l=t(5313);t.o(l,"redirect")&&t.d(s,{redirect:function(){return l.redirect}}),t.o(l,"useRouter")&&t.d(s,{useRouter:function(){return l.useRouter}})}},function(e){e.O(0,[123,971,69,744],function(){return e(e.s=6933)}),_N_E=e.O()}]);