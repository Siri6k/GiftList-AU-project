const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";

async function main() {
  // TODO: how do we prove to the server we're on the nice list?
  // create the merkle tree for the whole nice list
  const merkleTree = new MerkleTree(niceList);

  // get the root
  const root = merkleTree.getRoot();
  console.log({ root });

  // find the proof that norman block is in the list
  const name = "Marshall Bauch";
  const index = niceList.findIndex((n) => n === name);
  console.log({ index });
  const proof = merkleTree.getProof(index);

  
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    name: name,
    proof: proof,
    root: root,
  });

  console.log({ gift });
}

main();
