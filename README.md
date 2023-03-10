# OSAP Social Hub - Connected 2023 Hackathon

## Designed to foster collaborative problem-solving and community building across Africa.

OSAP (Open source African progress) is a gamified social media where individuals, organisations, and communities can meet, share ideas, and work towards solutions that are inspired by challenges peculiar in our world.

[Try it out](https://osap-black.vercel.com)

## Cyberconnect and web3 Integrations

OSAP is built on top of ccprofiles created via cyberconnect for users. The profiles hold essense nfts which are posts that can be shared publicly, or conditionally with lit protocol.

<ul>
                  <li>
                    Build Social Connections and
                    subscribe to ccProfiles{" "}
                    <span
                      style="color: yellow"
                    >
                      (Cyberconnect
                      create-profile, twitter
                      auth, erc-721 )
                    </span>
                  </li>
                  <li>
                    Post about any pecuilar
                    challenge or theme for
                    discussion
                    <span
                           style="color: yellow"
                    >
                      (Cyberconnect
                      create-essence)
                    </span>
                  </li>
                  <li>
                    Allow public (OSAP members),
                    or only subscribers to discuss
                    contibute solutions &nbsp;
                    <span
                          style="color: yellow"
                    >
                      (Lit
                      access-control-conditions)
                    </span>
                  </li>
                  <li>
                    Members can vote on solutions
                    <span
                    style="color: yellow"
                    >
                      ( Custom nft contract)
                    </span>
                  </li>
                  <li>
                    Contributors are challenged to
                    top the voting scoreboard,
                    perhaps to win weekly prizes
                    and sbt badges
                  </li>
                  <span
                    style="color: yellow"
                  >
                    ( Custom nft contract)
                  </span>
                </ul>

## Frontend

The web3 frontend is built on React, Nextjs, and ethers for contract interaction

- [Cyberconnect]()
- [Lit SDK]()

With Lit we're able to allow users set access control for their post (essense NFT), by default, lit uses an access control, that encrypts and decrypts the content, if the user has at least 1 OSAP Nft in their balacnce

- [Pinata]()
- [Infura]()

### Smart Contract

| Contract | Standard | Address                                    |
| -------- | -------- | ------------------------------------------ |
| OSAP     | ERC721   | 0xDfA982cB1A5bDa0ad62dFfd416bABBfab02D6ba8 |

[View Contract in Explorer](https://testnet.bscscan.com/address/0xDfA982cB1A5bDa0ad62dFfd416bABBfab02D6ba8)

## Contributors

- D-a-ve
- Tinybird
- Emmanuel

## Links

- [Website](https://osap-black.vercel.com)
- [Youtube Demo]()
- [Smart Contracts]()
- [Express Server]()

