import React, { useContext, createContext } from 'react';

import { useAddress, useContract, ConnectWallet,, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';

import { createThirdwebClient, getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";

// create the client with your clientId, or secretKey if in a server environment
const client = createThirdwebClient({ 
  clientId: "YOUR_CLIENT_ID"
 });

// connect to your contract
const contract = getContract({ 
  client, 
  chain: sepolia, 
  address: "0xf3E73CAC7F5d5D0f3489E975FeBfeC221F2F2FFC"
});
const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract('0x3a8fdEC3a68abE4b6DC18e5AC79c3e3B80dd3F4a');
  const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');

  const address = useAddress();
  const connect = connect();

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign({
				args: [
					address, // owner
					form.title, // title
					form.description, // description
					form.target,
					new Date(form.deadline).getTime(), // deadline,
					form.image,
				],
			});

      console.log("contract call success", data)
    } catch (error) {
      console.log("contract call failure", error)
    }
  }


return (
    <StateContext.Provider
      value={{ 
        address,
        contract,
        connect,
        ConnectWallet,
        createCampaign: publishCampaign,
      
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);

