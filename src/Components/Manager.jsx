// import React from 'react'
import { useEffect, useRef, useState } from "react";
//ya react tostify ki web say copy kiay hain import
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";


const Manager = () => {
  const ref = useRef();
  const refpassword = useRef();

  const [form, setform] = useState({ site: "", username: "", password: "" }); //useState say value bana li form ki

  const [passwordArray, setpasswordArray] = useState([]);

  // Get passwords
  const getPasswrods = async () => {
    let req = await fetch("http://localhost:3000");
    let passwords = await req.json();
    setpasswordArray(passwords);
    console.log(passwords);
  };

  // useEffect ko use karin gay ta kay bar bar reload na ho kuch change ho tab reload ho

  useEffect(() => {
    getPasswrods();
  }, []);

  const showPassword = () => {
    // alert('show the password');
    // useref ka use kar kay ham nay src change kar diay kay band ho to khol do varna band hi kar do
    console.log();
    //ya ab password ko toggle kay liay bana rahay hain
    refpassword.current.type = "text";

    if (ref.current.src.includes("/Icons/close_eye.png")) {
      ref.current.src = "/Icons/onpeneye.png";
    } else {
      ref.current.src = "/Icons/close_eye.png";
      //ya ham ais ko vapis text kar rahay hain same hay jasay auper src change kia tha ab type change ki hay
      refpassword.current.type = "password";
    }
  };
  //ya savepassword ka func hay jo kay button pay lagaya hay

  //uuid4 jo hay ya ak package hay jo kay ak unique id generate karta hay to jasay hi ham password save kartay hain to ya ak unique id bana kay aus may dalta hay jis ko use kar kay phir ham delete kar pain gay
  const savePassword = async() => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

      //if any such id exists in the db, delete it (ya karany say edit kam karna start karay ga )
      await fetch("http://localhost:3000/",{method:"DELETE",headers: {"Content-Type":"application/json"},body: JSON.stringify({ id: `${form.id}`})})

      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      await fetch("http://localhost:3000/",{method:"POST",headers: {"Content-Type":"application/json"},body:JSON.stringify({...form,id:uuidv4() })})
      //local storage may karny ka tarika 
      // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]) );

      console.log([...passwordArray, { ...form, id: uuidv4 }]);

      //ham nay ya yaha ais liay dala Q kay site ko re-render karna tha ais liay
      setform({ site: "", username: "", password: "" });

      toast("Password Saved"),
        {
          autoClose: 2000,
        };
    } else {
      toast("Error: please add at least 3 characters in all fields");
    }
  };

  // Delet password
  const deletePassword = async(id) => {
    //here we use confrim
    let c = confirm("Do you really want to delete this password");
    if (c) {
      setpasswordArray(passwordArray.filter((item) => item.id !== id));

       await fetch("http://localhost:3000/",{method:"DELETE",headers: {"Content-Type":"application/json"},body:JSON.stringify({id})})

      //ya below localstorage ka tarika hay 
      // localStorage.setItem(
      //   "passwords",
      //   JSON.stringify(passwordArray.filter((item) => item.id !== id))
      // );
      console.log("Deleting password with id", id);

      toast("Password Deleted SuccessFully !", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  // Edit password

  const eidtPassword = (id) => {
    console.log("Editing password with id", id);
    setform({...passwordArray.filter((i) => i.id === id)[0],id: id});
    setpasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value }); //yaha ham name ko lay kay value ko set kar rahay hain
  };

  //copy text ka function hay
  const copyText = (text) => {
    //ya yaha emmiter ka code paste karin gay container ais ka nichay return kay foran bad dala hay

    toast("🦄 Copy to ClipBorad !", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    navigator.clipboard.writeText(text);
  };

  return (
    <>
      {/* ya tostify ka container ka code hay jo kay alert ki jaga ham use kar rahay hain container ko yaha rakin hain aur emitter kay code ko jaha alert use karna hay aus function may dalin gay e.g copy valay function may
       */}

      <ToastContainer
        position="top-center"
        autoClose={2000}
        limit={2}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />

      <div className="absolute bottom-0 inset-0 -z-10 min-h-[100%] w-full items-center px-5 py-24 [background:radial-gradient(120%_125%_at_55%_10%,#010_50%,#63e_100%)]"></div>

      <div className="px-2 pt-3 md:pt-3 md:mycontainer min-h-[120vh] ">
        <h1 className="text-4xl text font-bold text-center text-white">
          <span className="text-green-500">&lt;</span>
          <span>Pass</span>
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-green-500 text-lg text-center py-1">
          Your own Password Manager
        </p>

        <div className=" flex flex-col  p-4 gap-6  items-center">
          <input
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name="site"
            id="site"
            placeholder="Enter website URL"
            onChange={handleChange}
            value={form.site}
          />
          <div className="flex flex-col md:flex-row w-full gap-6 relative">
            <input
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
              id="username"
              placeholder="Enter Username"
              onChange={handleChange}
              value={form.username}
            />
            <div className="relative ">
              <input
                className="rounded-full border border-green-500 w-full p-4 py-1"
                type="password"
                name="password"
                ref={refpassword}
                id="password"
                placeholder="Enter Password"
                onChange={handleChange}
                value={form.password}
              />
              <span className="absolute top-2 right-1">
                <img
                  ref={ref}
                  width={30}
                  src="/Icons/onpeneye.png"
                  alt="eye"
                  className="p-1 cursor-pointer"
                  onClick={showPassword}
                />
              </span>
            </div>
          </div>

          {/* Lordicons ko use kia hay yaha aus kay liay index.html may script add ki aur phir jo icon use karna tha aus ka link yaha dal dia  */}
          <button
            onClick={savePassword}
            className="flex text-white justify-center items-center bg-green-600 rounded-full px-4 py-2 w-fit hover:bg-green-500 gap-2"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
              colors="primary:#9cf4a7"
            ></lord-icon>
            Save Password
          </button>
        </div>
        <div className="passwords">
          <div className="text-white text-xl font-bold py-1">
            <h2>Your passwords</h2>
          </div>
          {/* ya ham nay likha kay ager password na ho local storage may to no passwords ay varna table puri ay  */}
          {passwordArray.length === 0 && (
            <div className="text-white ">No passwords to show</div>
          )}

          <div className="container flex justify-center items-center">
            {passwordArray.length != 0 && (
              <table className=" w-[90%]  table-auto text-white overflow-hidden rounded-md mb-5">
                <thead className="bg-green-700">
                  <tr className="py-2 ">
                    <th className="border border-white">Site</th>
                    <th className="border border-white">Username</th>
                    <th className="border border-white">Password</th>
                    <th className="border border-white">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-blue-900 bg-opacity-25">
                  {/* Ab table may apnay passwords saray dalnay thay to ham nay passwordArray jo banaya tha aus ko .map kia aur return kar dia tr ko puray ko  */}
                  {passwordArray.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="text-center border border-blue-700 flex justify-center items-center">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/xsqjakgm.json"
                              trigger="hover"
                              style={{ width: "25px", height: "25px" }}
                            ></lord-icon>
                          </div>
                        </td>
                        <td className="text-center border border-blue-700 ">
                          <div className="flex items-center justify-center">
                            <span>{item.username}</span>

                            <div
                              onClick={() => {
                                copyText(item.username);
                              }}
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/xsqjakgm.json"
                                trigger="hover"
                                style={{ width: "25px", height: "25px" }}
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="text-center border border-blue-700 flex items-center justify-center">
                          <div className="flex items-center justify-center mx-1">
                            <span>{"*".repeat(item.password.length)}</span>

                            <div
                              onClick={() => {
                                copyText(item.password);
                              }}
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/xsqjakgm.json"
                                trigger="hover"
                                style={{ width: "25px", height: "25px" }}
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="text-center border border-blue-700 ">
                          <div className="flex items-center justify-center">
                            <span
                              className="cursor-pointer mx-1 "
                              onClick={() => {
                                eidtPassword(item.id);
                              }}
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/ylvuooxd.json"
                                trigger="hover"
                                state="hover-line"
                                colors="primary:#ffffff,secondary:#f49cc8,tertiary:#30e849,quaternary:#000000"
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  mx: "1px",
                                }}
                              ></lord-icon>
                            </span>

                            <span
                              className="cursor-pointer mx-1 "
                              onClick={() => {
                                deletePassword(item.id);
                              }}
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/hjbrplwk.json"
                                trigger="hover"
                                colors="primary:#000000,secondary:#30e849,tertiary:#000000,quaternary:#3a3347"
                                style={{ width: "25px", height: "25px" }}
                              ></lord-icon>
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Manager;
