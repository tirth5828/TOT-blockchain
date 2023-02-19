const BACKEND_BASE_URL = "http://localhost:8000"
const headers = {
    "Content-Type": "application/json"
};

const registerUser = async (username, email, metamaskid) => {
        try {
            const response = await fetch(BACKEND_BASE_URL + "/api/users/register", {
                method: "POST",
                headers: headers,
                body: JSON.stringify({
                    username: username,
                    email: email,
                    metamaskid: metamaskid
                })
            });

            if (!response.ok) {
                throw new Error("Failed to register user");
            }
            console.log("User registerd successfully")
          
        } catch (error) {
            console.error(error);
        }
};


const getUser = async (metamaskid) => {
        try {
            const response = await fetch(BACKEND_BASE_URL + "/api/users/getUser", {
                method: "POST",
                headers: headers,
                body: JSON.stringify({
                    metamaskid: metamaskid
                })
            });

            if (!response.ok) {
                throw new Error("Failed to get user");
            }

            const data = await response.json();
            console.log("Got user", data);
            return data;
          
        } catch (error) {
            console.error(error);
        }
};

export {registerUser, getUser};

// (async ()=> {
//     // registerUser(
//     //     "dsouzajovian123",
//     //     "dsouzajovian123@gmail.com",
//     //     "0x635731b28e6967179aA399e023ada196cad22BbA"
//     //     );

//     const data = await getUser("0x635731b28e6967179aA399e023ada196cad22BbA");
//     console.log(data);
// })();