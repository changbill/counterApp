import {
  ConnectWallet,
  Web3Button,
  useAddress,
  useContract,
} from "@thirdweb-dev/react"
import styles from "../styles/Home.module.css"
import { NextPage } from "next"
import { useState } from "react"

const Home: NextPage = () => {
  const myAddress = useAddress() // 리액트 훅 : 메타마스크의 주소를 가져오는 함수
  const contractAddress = "0x069DFBCaBc5006A40ecC5Be3800eEec95BFDe245"
  const { contract } = useContract(contractAddress)
  const [counter, setCounter] = useState<string | undefined>()

  async function getCounter() {
    if (!contract) return
    const counter = await contract.call("getCounter")
    setCounter(counter.toString())
  }
  getCounter()

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.title}>
          <h3>My Counter DApp</h3>
        </div>

        <div className={styles.description}>
          contract address: {contractAddress} <br />
          your metamask address: {myAddress}
        </div>

        <h3 className={styles.title}>{counter}</h3>

        <div className={styles.grid}>
          <div className={styles.card}>
            <Web3Button
              contractAddress={contractAddress}
              action={(contract) => contract.call("decrementCounter")}
            >
              <h1> - </h1>
            </Web3Button>
          </div>

          <div className={styles.card}>
            <Web3Button
              contractAddress={contractAddress}
              action={() => getCounter()}
            >
              <h1> Refresh </h1>
            </Web3Button>
          </div>

          <div className={styles.card}>
            <Web3Button
              contractAddress={contractAddress}
              action={(contract) => contract.call("incrementCounter")}
            >
              <h1> + </h1>
            </Web3Button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
