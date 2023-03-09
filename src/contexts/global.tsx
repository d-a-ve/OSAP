/* eslint-disable react-hooks/rules-of-hooks */
import { ReactNode, createContext, useState, useEffect } from "react";
import { BrowserProvider, ethers } from "ethers";
import { CHAIN_ID } from "../utils/helpers/constants";
import {
  IGlobalContext,
  IPrimaryProfileCard,
  IPostCard,
  IAccountCard,
  IPostInput,
  IPosts,
} from "../utils/types";
import {
  ACCOUNTS,
  PRIMARY_PROFILE,
  PRIMARY_PROFILE_ESSENCES,
} from "../utils/graphql";
//import { useCancellableQuery } from "../hooks/useCancellableQuery";
import { extractCID, timeout } from "../utils/helpers/functions";
import { useCancellableQuery } from "../hooks/useCancellableQuery";

export const GlobalContext = createContext<IGlobalContext>({
  isSidebarOpen: false,
  setSidebarOpen: () => { },
  isRightPanelOpen: false,
  setisRightPanelOpen: () => { },
  isMoved: false,
  setisMoved: () => { },
  address: null,
  imageURL: null,
  setimageURL: () => { },
  accessToken: null,
  primaryProfile: null,
  indexingProfiles: [],
  indexingPosts: [],
  profileCount: 0,
  postCount: 0,
  posts: [],
  postList: null,
  setPostList: () => { },
  profiles: [],
  setAddress: () => { },
  setAccessToken: () => { },
  setPrimaryProfile: () => { },
  setIndexingProfiles: () => { },
  setIndexingPosts: () => { },
  setProfileCount: () => { },
  setPostCount: () => { },
  setPosts: () => { },
  setProfiles: () => { },
  postInput: {
    nftMedia: "",
    content: "",
    privacy: "",
    description: ""
  },
  setPostInput: () => { },
  connectWallet: async () => new Promise(() => { }),
  checkNetwork: async () => new Promise(() => { }),
});
GlobalContext.displayName = "GlobalContext";

export const GlobalContextProvider = ({ children }: { children: ReactNode }) => {

  const [isMoved, setisMoved] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isRightPanelOpen, setisRightPanelOpen] = useState(false);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [imageURL, setimageURL] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [primaryProfile, setPrimaryProfile] = useState<
    IPrimaryProfileCard | null
  >(null);
  const [profileCount, setProfileCount] = useState<number>(0);
  const [postCount, setPostCount] = useState<number>(0);
  const [indexingProfiles, setIndexingProfiles] = useState<IAccountCard[]>([]);
  const [indexingPosts, setIndexingPosts] = useState<IPostCard[]>([]);
  const [posts, setPosts] = useState<IPostCard[]>([]);
  const [profiles, setProfiles] = useState<IAccountCard[]>([]);
  const [postList, setPostList] = useState<IPosts[] | null>(null)
  const [postInput, setPostInput] =
    useState<IPostInput>({
      nftMedia: "",
      content: "",
      privacy: "public",
      description: ""
    });



  useEffect(() => {
    connectWallet();
  }, []);

  useEffect(() => {
    if (!accessToken) {
      const xx = localStorage.getItem("accessToken");
      if (xx) {
        //   console.log("my access Token", xx);
        setAccessToken(xx);
      }

    }
  }, [accessToken]);


  useEffect(() => {
    if (!(address && accessToken)) return;
    let query: any;

    const fetchProfile = async () => {
      try {
        /* Fetch primary profile */
        query = useCancellableQuery({
          query: PRIMARY_PROFILE,
          variables: {
            address: address,
            // chainID: CHAIN_ID,
            myAddress: address,
          },
        });
        const res = await query;

        /* Get the primary profile */
        const primaryProfile = res?.data?.address?.wallet?.primaryProfile;
        console.log(primaryProfile);

        /* Set the primary profile */
        setPrimaryProfile(primaryProfile);
      } catch (error) {
        /* Display error message */
        console.error(error);
      }
    };
    fetchProfile();

    return () => {
      query.cancel();
    };
  }, [address, accessToken]);



  useEffect(() => {
    /* Check if the user connected with wallet */
    if (!(provider && address)) return;
    try {
      /* Function to check if the network is the correct one */
      checkNetwork(provider);
    } catch (error: any) {
      /* Display error message */
      alert(error.message);
    }
  }, [provider, address]);


  useEffect(() => {
    if (!(address && accessToken)) return;
    let query: any;
    let timer: number = Date.now() + 1000 * 60 * 10;
    let mount = true;

    const fetch = async () => {
      try {
        /* Fetch all profiles */
        query = useCancellableQuery({
          query: ACCOUNTS,
          variables: {
            address: address,
            // chainID: CHAIN_ID,
          },
        });
        const res = await query;

        /* Get the profiles */
        const edges = res?.data?.address?.wallet?.profiles?.edges;
        const nodes = edges?.map((edge: any) => edge?.node) || [];

        /* Get the total count of posts */
        const count = nodes.length;
        /* Get primary profile */
        const primaryProfile = nodes?.find((node: any) => node?.isPrimary);
        /* Set the primary profile if exists (might be the first one) */
        if (primaryProfile) setPrimaryProfile(primaryProfile);
        if (indexingProfiles.length === 0) {
          /* Set the profiles */
          setProfiles([...nodes]);
          /* Set the initial number of profiles */
          setProfileCount(count);
        } else {
          if (profileCount + indexingProfiles.length === count) {
            /* Set the posts in the state variable */
            setProfiles([...nodes]);
            /* Set the posts count in the state variable */
            setProfileCount(count);

            /* Reset the indexingProfiles in the state variable */
            setIndexingProfiles([]);
          } else {
            /* Fetch again after a 2s timeout */
            if (Date.now() < timer) {
              /* Wait 2s before fetching data again */
              console.log("Fetching profiles again.");
              await timeout(2000);
              if (mount) fetch();
            } else {
              /* Reset the indexingProfiles in the state variable */
              setIndexingProfiles([]);
            }
          }
        }
      } catch (error) {
        /* Display error message */
        console.error(error);
        /* Reset the indexingProfiles in the state variable */
        setIndexingProfiles([]);
      }
    };
    fetch();

    return () => {
      mount = false;
      if (query) {
        query.cancel();
      }
    };
  }, [address, accessToken, indexingProfiles, profileCount]);

  useEffect(() => {
    if (!(address && accessToken)) return;

    let query: any;
    let timer: number = Date.now() + 1000 * 60 * 10;
    let mount = true;

    const fetch = async () => {
      try {
        /* Fetch primary profile posts */
        query = useCancellableQuery({
          query: PRIMARY_PROFILE_ESSENCES,
          variables: {
            address: address,
            // chainID: CHAIN_ID,
            myAddress: address,
          },
        });
        const res = await query;

        /* Get the primary profile */
        const primaryProfile = res?.data?.address?.wallet?.primaryProfile;

        /* Get the posts */
        const edges = primaryProfile?.essences?.edges;
        const nodes = edges?.map((edge: any) => edge?.node) || [];

        /* Get the total count of posts */
        const count = primaryProfile?.essences?.totalCount;

        if (indexingPosts.length === 0) {
          /* Set the initial posts */
          setPosts([...nodes]);

          /* Set the initial number of posts */
          setPostCount(count);
        } else {
          if (postCount + indexingPosts.length === count) {
            /* Set the posts in the state variable */
            setPosts([...nodes]);

            /* Set the posts count in the state variable */
            setPostCount(count);

            /* Reset the indexingPostd in the state variable */
            setIndexingPosts([]);
          } else {
            /* Fetch again after a 2s timeout */
            if (Date.now() < timer) {
              /* Wait 2s before fetching data again */
              console.log("Fetching posts again.");
              await timeout(2000);
              if (mount) fetch();
            } else {
              /* Reset the indexingPosts in the state variable */
              setIndexingPosts([]);
            }
          }
        }
      } catch (error) {
        /* Display error message */
        console.error(error);

        /* Reset the indexingPosts in the state variable */
        setIndexingPosts([]);
      }
    };
    fetch();

    return () => {
      mount = false;
      if (query) {
        query.cancel();
      }
    };
  }, [address, accessToken, indexingPosts, postCount]);


  useEffect(() => {
    if (posts) {
      console.log(posts);
    }
  }, [posts])


  async function fetchProfile(cid: any) {
    const res = await fetch(
      `https://ipfs.infura.io:5001/api/v0/cat?arg=${cid}`,
      {
        method: "POST",
        headers: {
          Authorization:
            "Basic " +
            btoa(
              "2M5MWb0YnyHo9UzoPcl8m6XnQKt:cdc90170d4fa13d0325870442ff11eeb"
            ),
        },
      }
    )
    const data = await res.text()
    return JSON.parse(data)

  }

  async function fetchEssenceDetail() {
    let b: any[] = [];
    for (let i = 0; i < posts.length; i++) {
      console.log(posts[i])
      const cid = extractCID(posts[i].tokenURI);
      const essenceID = posts[i].essenceID;
      const avatar = posts[i].createdBy.avatar;
      const { name, handle, bio } = await fetchProfile(posts[i].createdBy.metadata);
      const res = await fetch(
        `https://ipfs.infura.io:5001/api/v0/cat?arg=${cid}`,
        {
          method: "POST",
          headers: {
            Authorization:
              "Basic " +
              btoa(
                "2M5MWb0YnyHo9UzoPcl8m6XnQKt:cdc90170d4fa13d0325870442ff11eeb"
              ),
          },
        }
      )
      const data = await res.text()
      const { content, description, image_data, tags, issue_date }: any = JSON.parse(data);
      const postObj: IPosts = {
        content, description, image_data, tags, issue_date, name, handle, bio, avatar, essenceID
      }
      b.push(postObj);
    }
    setPostList(b)
  }

  useEffect(() => {
    if (!postList) {
      if (posts.length > 0) {
        fetchEssenceDetail()
      }
    }
  },)

  useEffect(() => {
    console.log(postList);
  }, [postList])



  /* Function to connect with MetaMask wallet */
  const connectWallet = async () => {
    try {
      const ethereum = (window as any).ethereum;
      await ethereum.request({ method: "eth_requestAccounts" });
      const web3Provider = new ethers.BrowserProvider(ethereum);
      /* Get the signer from the provider */
      const signer = web3Provider.getSigner();
      const address = await (await signer).getAddress();
      const oldAddress = localStorage.getItem("address");
      console.log("old address", oldAddress);
      console.log("address", address);
      if (!oldAddress) {
        localStorage.setItem("address", address);
      } else if (oldAddress !== address) {
        console.log("clearing local storage")
        localStorage.clear();
        window.location.reload();
      } else {
        console.log(signer);
        setProvider(web3Provider);
        setAddress(address);
      }
      return web3Provider;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  /* Function to check if the network is the correct one */
  const checkNetwork = async (provider: BrowserProvider) => {
    try {
      const network = await provider.getNetwork();
      if (network) {
        if (network.chainId !== BigInt(CHAIN_ID)) {
          /* Switch network if the chain id doesn't correspond to Goerli Testnet Network */
          await provider.send("wallet_switchEthereumChain", [
            { chainId: "0x" + CHAIN_ID.toString(16) },
          ]);
          /* Trigger a page reload */
          window.location.reload();
        }
      }




    } catch (error: any) {
      /* This error code indicates that the chain has not been added to MetaMask */
      if (error.code === 4902) {


        await provider.send('wallet_addEthereumChain', [
          {
            chainId: '0x61',
            chainName: 'Binance Smart Chain Testnet',
            nativeCurrency: {
              name: 'BNB',
              symbol: 'bnb',
              decimals: 18,
            },
            rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
            blockExplorerUrls: ['https://testnet.bscscan.com'],
          },
        ]);

        // await provider.send("wallet_addEthereumChain", [
        //   {
        //     chainId: "0x" + CHAIN_ID.toString(16),
        //     rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
        //   },
        // ]);

        /* Trigger a page reload */
        window.location.reload();
      } else {
        /* Throw the error */
        throw error;
      }
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        isSidebarOpen,
        setSidebarOpen,
        isRightPanelOpen,
        setisRightPanelOpen,
        isMoved,
        setisMoved,
        address,
        imageURL,
        setimageURL,
        accessToken,
        primaryProfile,
        profileCount,
        postCount,
        posts,
        postList,
        setPostList,
        profiles,
        indexingProfiles,
        indexingPosts,
        setAddress,
        setAccessToken,
        setPrimaryProfile,
        setProfileCount,
        setPostCount,
        setIndexingProfiles,
        setIndexingPosts,
        setPosts,
        setProfiles,
        checkNetwork,
        connectWallet,
        postInput,
        setPostInput
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};



// const getEssences = async () => {
//   const { data } = await getEssencesByFilter({
//     variables: {
//       address: routerAddress as string,
//       // chainID: 5,
//       myAddress:
//         accessToken && address
//           ? address
//           : "0x0000000000000000000000000000000000000000",
//     },
//   });

//   setFeaturedPosts(
//     data?.address.wallet.primaryProfile.essences.edges.map(
//       (item: any) => item.node
//     ) || []
//   );

//   setIsLoading(false);
// };