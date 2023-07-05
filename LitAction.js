import * as LitJsSdk from '@lit-protocol/lit-node-client-nodejs'; 

// Code for running on node 
const litActionCode = `
   const go = async () => {
    // all the params (toSign, publicKey, sigName) are passed in from the LitJsSdk.executeJs() function
    const sigShare = await Lit.Actions.signEcdsa({ toSign, publickey, sigName })
   }; 

   go(); 
` 

// Auth Sign for authenticating with the nodes 
const authSig = {
    sig: "0x2bdede6164f56a601fc17a8a78327d28b54e87cf3fa20373fca1d73b804566736d76efe2dd79a4627870a50e66e1a9050ca333b6f98d9415d8bca424980611ca1c",
    derivedVia: "web3.eth.personal.sign",
    signedMessage:
      "localhost wants you to sign in with your Ethereum account:\n0x9D1a5EC58232A894eBFcB5e466E3075b23101B89\n\nThis is a key for Partiful\n\nURI: https://localhost/login\nVersion: 1\nChain ID: 1\nNonce: 1LF00rraLO4f7ZSIt\nIssued At: 2022-06-03T05:59:09.959Z",
    address: "0x9D1a5EC58232A894eBFcB5e466E3075b23101B89",
}

const runLitAction = async () => {
    const litNodeClient = new LitJsSdk.LitNodeClientNodeJs({ litNetwork: "serrano" })
    await litNodeClient.connect(); 
    try {
        const signatures = await litNodeClient.executeJs({
            code: litActionCode, 
            authSig, 
            jsParams: {
                toSign: [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100], 
                publicKey: "0x0404e12210c57f81617918a5b783e51b6133790eb28a79f141df22519fb97977d2a681cc047f9f1a9b533df480eb2d816fb36606bd7c716e71a179efd53d2a55d1", 
                sigName: "sig1"
            }, 
        }); 
        console.log("Signatures are: ", signatures); 
    } catch (err) {
        console.error(err)
    }
}

runLitAction(); 

