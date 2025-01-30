// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol"; 
import "./IERC4907.sol";
contract ERC4907 is ERC721, IERC4907 {
    struct UserInfo 
    {
        address user;   // address of user role
        uint64 expires; // unix timestamp, user expires
    }

    mapping (uint256  => UserInfo) internal _users;

    constructor(string memory name_, string memory symbol_)
     ERC721(name_, symbol_)
     {
        _mint(tx.origin,0);
        _mint(tx.origin,1);
        _mint(tx.origin,2);
        _mint(tx.origin,3);
        _mint(tx.origin,4);
        _mint(tx.origin,5);
        _mint(tx.origin,6);
     }

    function _baseURI() internal pure override returns (string memory) {
        return "https://raw.githubusercontent.com/wuzhong-zhu/ERC4907_demo/refs/heads/main/space%20weapon%20collections/";
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireOwned(tokenId);

        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? string.concat(baseURI, Strings.toString(tokenId),".png") : "";
    }
    
    /// @notice set the user and expires of an NFT
    /// @dev The zero address indicates there is no user
    /// Throws if `tokenId` is not valid NFT
    /// @param user  The new user of the NFT
    /// @param expires  UNIX timestamp, The new user could use the NFT before expires
    function setUser(uint256 tokenId, address user, uint64 expires) public virtual{
        require(_isAuthorized(ownerOf(tokenId),msg.sender, tokenId), "ERC4907: transfer caller is not owner nor approved");
        UserInfo storage info =  _users[tokenId];
        info.user = user;
        info.expires = expires;
        emit UpdateUser(tokenId, user, expires);
    }

    /// @notice Get the user address of an NFT
    /// @dev The zero address indicates that there is no user or the user is expired
    /// @param tokenId The NFT to get the user address for
    /// @return The user address for this NFT
    function userOf(uint256 tokenId) public view virtual returns(address){
        if( uint256(_users[tokenId].expires) >=  block.timestamp){
            return  _users[tokenId].user;
        }
        else{
            return address(0);
        }
    }

    /// @notice Get the user expires of an NFT
    /// @dev The zero value indicates that there is no user
    /// @param tokenId The NFT to get the user expires for
    /// @return The user expires for this NFT
    function userExpires(uint256 tokenId) public view virtual returns(uint256){
        return _users[tokenId].expires;
    }

    /// @dev See {IERC165-supportsInterface}.
    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(IERC4907).interfaceId || super.supportsInterface(interfaceId);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal{
        if (from != to && _users[tokenId].user != address(0)) {
            delete _users[tokenId];
            emit UpdateUser(tokenId, address(0), 0);
        }
    }
} 