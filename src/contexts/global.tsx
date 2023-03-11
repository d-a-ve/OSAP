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
  IEssenceMwCard,
} from "../utils/types";
import {
  ACCOUNTS,
  ADDRESS,
  PRIMARY_PROFILE,
  PRIMARY_PROFILE_ESSENCES,
} from "../utils/graphql";
//import { useCancellableQuery } from "../hooks/useCancellableQuery";
import { extractCID, timeout } from "../utils/helpers/functions";
import { useCancellableQuery } from "../hooks/useCancellableQuery";
import OSAP from "../utils/abi/OSAP.json"
import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";


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
  ranking: [],
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
  const [postList, setPostList] = useState<IPosts[] | null>(null);
  const [getProfile] = useLazyQuery(PRIMARY_PROFILE);
  const [postInput, setPostInput] =
    useState<IPostInput>({
      nftMedia: "",
      content: "",
      privacy: "public",
      description: ""
    });
  const [essences, setEssences] = useState<IEssenceMwCard[]>([])
  const [suggestedPosts, setSuggestedPosts] = useState<any[]>([]);
  const [ranking, setRanking] = useState<any[] | null>(null)
  const [getAddress] = useLazyQuery(ADDRESS)
  const router = useRouter();
  let query: any;
  // Function to any fetchprofile from metadatahash
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

  // Function to fetch posts from essences
  async function fetchEssenceDetail(posts: any) {
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

  //Function to fetch default profile from connected wallet
  const fetchDefaultProfile = async () => {
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

  // Check that a connected wallet is in the write network
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



  // fetch accesstoken from local storage
  useEffect(() => {
    const xx: null | string = localStorage.getItem("accessToken");
    if (xx) {
      if (!accessToken) {
        //   console.log("my access Token", xx);
        setAccessToken(xx);
      }
    }
  }, [accessToken]);


  // Fetch primaryprofile of from connected wallet
  useEffect(() => {
    if (!(address && accessToken)) return;

    if (!primaryProfile) {
      fetchDefaultProfile();
    }
    return () => {
      if (query) {
        query.cancel();
      }
    };
  }, [address, accessToken, primaryProfile, fetchDefaultProfile, query]);


  // Fetch all  profiles associated with connected wallet
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


  //fetch all the posts for just the primary profile
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

  //Fetch suggested posts for empty feeds
  useEffect(() => {
    // Function to get first 10 members of OSAP for suggested contents
    async function getFirst10TokenHolders() {

      const ethereum = (window as any)
        .ethereum
      const provider =
        new ethers.BrowserProvider(
          ethereum
        )
      const signer = provider.getSigner()
      const contract =
        new ethers.Contract(
          process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
          OSAP.abi,
          await signer
        )
      const totalSupply = await contract.totalSupply();

      const promises: any[] = [];

      for (let i = 0; i < totalSupply; i++) {
        const currentTokenId = await contract.tokenByIndex(i);
        promises.push(contract.ownerOf(currentTokenId));

      }

      const tokenHolders: any = await Promise.all(promises);
      console.log(tokenHolders)
      // Return the first 10 unique token holder addresses
      return tokenHolders;
    }

    getFirst10TokenHolders().then(async (holders) => {
      let man = []
      for (let i = 0; i < holders.length; i++) {

        const res = await getAddress({
          variables: {
            address: holders[i],
          },
        });
        const primaryProfile =
          res?.data?.address?.wallet?.primaryProfile;
        const _essences =
          primaryProfile?.essences?.edges?.map(
            (edge: any) => edge?.node
          ) || []
        /* Set the essences */
        if (_essences.length > 0) {
          // just take one post from each user
          console.log("mmmmmmmmm", _essences)
          man.push(..._essences)
        }
        setEssences(man);
      }


    }).catch((error) => {
      console.error('Error:', error);
    });

  }, [])

  //populate the user's feed with posts
  useEffect(() => {
    if (!postList) {
      //Fetch some suggested posts
      if (essences.length > 0) {
        console.log("esssss", essences);
        fetchEssenceDetail(essences)
      }
    }
  },)

  //Fetch Ranking for the scoreboard
  useEffect(() => {
    async function fetchRanking() {
      const ethereum = (window as any)
        .ethereum
      const provider =
        new ethers.BrowserProvider(
          ethereum
        )
      const signer = provider.getSigner()
      const contract =
        new ethers.Contract(
          process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
          OSAP.abi,
          await signer
        )

      const totalSupply = await contract.totalSupply();

      const promises = [];
      for (let i = 0; i < totalSupply; i++) {
        const currentTokenId = await contract.tokenByIndex(i);
        promises.push(contract.ownerOf(currentTokenId));
      }

      const tokenHolders = await Promise.all(promises);

      const ownerDetails: { owner: any; totalVotes: number; }[] = [];

      for (const holder of tokenHolders) {
        const balance = await contract.balanceOf(holder);
        let totalVotes = BigInt(0);
        for (let i = 0; i < balance; i++) {
          //  const tokenId = await contract.tokenOfOwnerByIndex(holder, i);
          const tokenDetails = await contract.tokenDetailsByIndex(holder, i);
          totalVotes += BigInt(tokenDetails.totalVotes);
        }



        ownerDetails.push({ owner: holder, totalVotes: parseInt(totalVotes.toString()) });
      }

      ownerDetails.sort((a, b) => b.totalVotes - a.totalVotes); // sort owners based on total votes
      ownerDetails.forEach((owner, index) => {
        function getTopOwners(n: number) {
          const topOwners = ownerDetails.slice(0, n);
          return topOwners;
        }
        function getOwnerIndex(address: string) {
          const index = ownerDetails.findIndex(owner => owner.owner === ethers.getAddress(address));
          return index;
        }
        const topOwners = getTopOwners(3);
        const userIndex = getOwnerIndex(address!);
        setRanking([...topOwners, {
          owner
            : "0x75bD5a94c5a727d1B458b26f546b728159587968",
          position:
            userIndex
        }]);
      });
    }

    if (!ranking && address) {
      fetchRanking();
    }
  },);


  // useEffect(() => {
  //   if (address) {
  //     router.push("/home")
  //   }
  // }, [address]);

  useEffect(() => {
    connectWallet()
  }, [])




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
        ranking,
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
