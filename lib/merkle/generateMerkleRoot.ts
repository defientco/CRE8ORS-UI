import keccak256 from "keccak256"
import MerkleTree from "merkletreejs"

function generateMerkleRoot(bytes32Array) {
  const tree = new MerkleTree(bytes32Array, keccak256, { sortPairs: true })
  const root = tree.getHexRoot()
  return root
}

export default generateMerkleRoot
