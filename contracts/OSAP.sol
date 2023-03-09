// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract OSAP is ERC721Enumerable {
    struct Contributor {
        uint256 contributorId;
        string cid;
        uint256 totalVotes;
    }

    mapping(uint256 => Contributor) contributors;
    uint256 public freeTokens;
    uint256 public totalMinted;
    uint256 public lastMintedTokenId;

    event Mint(address indexed to, uint256 indexed tokenId, string cid);
    event VoteAdded(uint256 indexed contributorId, uint256 votes);

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _freeTokens
    ) ERC721(_name, _symbol) {
        freeTokens = _freeTokens;
    }

    function mint(address _to, string memory _cid) public {
        uint256 _contributorId = lastMintedTokenId + 1;
        require(!_exists(_contributorId), "ID already taken");
        require(balanceOf(_to) == 0, "Address already exists");
        _safeMint(_to, _contributorId);
        contributors[_contributorId] = Contributor(_contributorId, _cid, 0);
        totalMinted++;
        lastMintedTokenId = _contributorId;
        emit Mint(_to, _contributorId, _cid);
    }

    function addVote(uint256 _contributorId, uint256 _votes) public {
        require(_exists(_contributorId), "Contributor does not exist");
        contributors[_contributorId].totalVotes += _votes;
        emit VoteAdded(_contributorId, _votes);
    }

    function getContributor(
        uint256 contributorID
    ) public view returns (string memory cid, uint256 totalVotes) {
        require(_exists(contributorID), "Contributor does not exist");
        Contributor storage tt = contributors[contributorID];
        return (tt.cid, tt.totalVotes);
    }

    function totalSupply() public view override returns (uint256) {
        return totalMinted;
    }

    function getLastMintedContributorId() public view returns (uint256) {
        return lastMintedTokenId;
    }

    function tokensOfOwner(
        address owner
    ) external view returns (TokenDetails[] memory) {
        uint256 tokenCount = balanceOf(owner);
        TokenDetails[] memory result = new TokenDetails[](tokenCount);
        for (uint256 i = 0; i < tokenCount; i++) {
            (
                uint256 contributorID,
                string memory cid,
                uint256 totalVotes
            ) = tokenDetailsByIndex(owner, i);
            result[i] = TokenDetails(contributorID, cid, totalVotes);
        }
        return result;
    }

    function tokenDetailsByIndex(
        address owner,
        uint256 index
    )
        public
        view
        returns (uint256 contributorID, string memory cid, uint256 totalVotes)
    {
        require(index < balanceOf(owner), "Owner index out of bounds");
        contributorID = tokenOfOwnerByIndex(owner, index);
        Contributor storage contributorDetails = contributors[contributorID];
        cid = contributorDetails.cid;
        totalVotes = contributorDetails.totalVotes;
    }

    struct TokenDetails {
        uint256 contributorID;
        string cid;
        uint256 totalVotes;
    }
}
