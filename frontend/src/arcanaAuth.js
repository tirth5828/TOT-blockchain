import {AuthProvider} from "@arcana/auth";

function createAuthService(){
    const appID = "088f7bcaf4cdef82c1a53ec4b0f9a07dcf9736f3";
    const auth = new AuthProvider(`${appID}`);

    function getInstance() {
        return auth;
    }

    const addNetwork = async(network) => {
        try{
            await auth.provider.request({
                method: 'wallet_addEthereumChain',
                params: [{
					chainId: network.chainId,
					chainName: network.name,
					nativeCurrency: {
						name: "BIT",
						symbol: "BIT", // 2-6 characters long
						decimals: 18,
					},
					rpcUrls: [network.rpc]
                }]
            })
			console.log("Network added")
        }
        catch(error){
            console.log("addNetwork Error: ", error);
        }
    }

    const switchNetwork = async(network) => {
        try {
            await auth.provider.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: network.chainId }],
            });

            console.log("Network switched")
        } 
        catch(error) {
            console.log("switchNetwork Error: ", error);
        }
    }

    return { getInstance, addNetwork, switchNetwork };
}

const AuthService = Object.freeze(createAuthService());

export default AuthService;
