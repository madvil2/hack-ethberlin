import React, { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import { UserOutlined, BankOutlined, QrcodeOutlined, IdcardOutlined } from '@ant-design/icons';
import "./App.css";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Button } from "antd";
import UserProfile from './Components/UserProfile/UserProfile';
import UserCredentials from './Components/UserCredentials/UserCredentials';
import QRCodeScanner from './Components/QRCodeScanner/QRCodeScanner';
import logo from './Assets/logo.svg';
import logoWhite from './Assets/logoWhite.svg';
import UserOrganisations from "./Components/UserOrganisations/UserOrganisations";

export interface User {
  appState: string;
  email: string;
  aggregateVerifier: string;
  name: string;
  profileImage: string;
  typeOfLogin: string;
  verifier: string;
  verifierId: string;
  dappShare: string;
  oAuthIdToken: string;
  oAuthAccessToken: string;
  isMfaEnabled: boolean;
  idToken: string;
}

const clientId = "BNSH6KzA7VivCP2syAijOn8kh0AFQCXYXxM1Gwsv4EDzapMbCeXumtxQvgSg3VMojIvKommguucLpiVDu1trNBQ";

const chainConfig = {
  chainId: "0xaa36a7",
  rpcTarget: "https://rpc.ankr.com/eth_sepolia",
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  displayName: "Ethereum Sepolia Testnet",
  blockExplorerUrl: "https://sepolia.etherscan.io/",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig: chainConfig },
});

const web3auth = new Web3Auth({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider: privateKeyProvider,
});

function App() {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<string>("profile");

  useEffect(() => {
    const init = async () => {
      try {
        await web3auth.initModal();
        setProvider(web3auth.provider);

        if (web3auth.connected) {
          setLoggedIn(true);
          const userInfo = await web3auth.getUserInfo();
          setUserInfo(userInfo as User);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    if (web3auth.connected) {
      setLoggedIn(true);
      const userInfo = await web3auth.getUserInfo();
      setUserInfo(userInfo as User);
    }
  };

  const logout = async () => {
    await web3auth.logout();
    setProvider(null);
    setLoggedIn(false);
    setUserInfo(null);
    setCurrentView("profile");
  };

  const renderView = () => {
    switch (currentView) {
      case "profile":
        return userInfo && <UserProfile user={userInfo} onLogout={logout} />;
      case "credentials":
        return <UserCredentials />;
      case "organisations":
        return <UserOrganisations />;
      case "scanQR":
        return <QRCodeScanner />;
      default:
        return <div>Select an option from the menu</div>;
    }
  };

  const loggedInView = (
    <>
      <div className="header">
        <img src={logoWhite} alt="Cr3dential Logo" className="logo" />
      </div>
      {renderView()}
      <div className="menu">
        <Button ghost className="btn" onClick={() => setCurrentView("profile")} shape="circle" icon={<UserOutlined />} />
        <Button ghost className="btn" onClick={() => setCurrentView("credentials")} shape="circle" icon={<IdcardOutlined />} />
        <Button ghost className="btn" onClick={() => setCurrentView("organisations")} shape="circle" icon={<BankOutlined />} />
        <Button ghost className="btn" onClick={() => setCurrentView("scanQR")} shape="circle" icon={<QrcodeOutlined />} />
      </div>

    </>
  );

  const unloggedInView = (
    <div className="unloggedInContainer">
      <div className="unloggedInCard">
        <img src={logo} alt="Cr3dential Logo" className="unloggedInLogo" />
        <p>Unlock Your Student Life</p>
        <button onClick={login} className="unloggedInButton">
          Click to connect →
        </button>
      </div>
    </div>
  );

  return (
    <div className="main-container">
      <div className="content">
        {loggedIn ? loggedInView : unloggedInView}
      </div>
    </div>
  );
}

export default App;
