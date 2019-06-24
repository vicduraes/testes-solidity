pragma solidity ^0.5.1;

contract Ownerap {

    mapping (address => bool) public owner;
    uint8 public quantOwner;
    mapping (address => uint256) public mapApproval;
    address[] public arrayApproval;
    uint8 public minApproval;

    constructor() public {
        arrayApproval.push(address(0x0));        //O indice zero do array não será utilizado
        minApproval = 1;
        owner[msg.sender] = true;
        quantOwner = 1;
    }

    /*
    * @dev Modifiers
    */
    modifier onlyApproved() {
        require((arrayApproval.length - 1) >= minApproval, "current approvals is less then minimum");
        _;
    }
    modifier notApproved() {
        require(mapApproval[msg.sender] <= 0, "address already approved");
        _;
    }
    modifier isApproved() {
        require(mapApproval[msg.sender] > 0, "address not approved yet");
        _;
    }
    modifier onlyOwner() {
        require(owner[msg.sender], "address must be owner");
        _;
    }
    modifier ownerExist(address _address) {
        require(owner[_address] == true, "owner not exists"); // owner exists 
        _;
    }
    modifier ownerNotExist(address _address) {
        require(owner[_address] == false, "owner exists"); // owner not exists
        _;
    }

    /*
    * @dev MinApproval functions
    */

    event MinApprovalChanged(uint8 _minBefore, uint8 _minActual);

    function changeMinApproval(uint8 _minApproval) public onlyOwner onlyApproved {
        require(_minApproval <= quantOwner, "minApproval must be equal or greater than quantOwner");
        uint8 _minBefore = minApproval;
        minApproval = _minApproval;
        emit MinApprovalChanged(_minBefore, _minApproval);
        _clearAllApproval();
    }

    /*
    * @dev Owner functions
    */
    
    event OwnerAdded(address indexed _address);
    event OwnerDeleted(address indexed _address);
    function addOwner(address _address) public onlyOwner onlyApproved ownerNotExist(_address) {
        owner[_address] = true;
        quantOwner += 1;
        emit OwnerAdded(_address);
        _clearAllApproval();
    }

    function delOwner(address _address) public onlyOwner onlyApproved ownerExist(_address) {
        require(quantOwner >= minApproval, "quantOwner must be equal or greater than minApproval");
        require(msg.sender != _address, "address can not remove yourself");
        owner[_address] = false;
        quantOwner -= 1;
        emit OwnerDeleted(_address);
        _clearAllApproval();
    }
    /*
    * @dev Address approvals
    */
    function doApproval() public onlyOwner notApproved {
        uint256 index = arrayApproval.push(msg.sender) - 1;
        mapApproval[msg.sender] = index;
    } 

    function cancelApproval() public onlyOwner isApproved {
        uint rowToDelete = mapApproval[msg.sender];
        mapApproval[msg.sender] = 0;
        address keyToMove = arrayApproval[arrayApproval.length-1];
        arrayApproval[rowToDelete] = keyToMove;
        mapApproval[keyToMove] = rowToDelete;
        arrayApproval.length--;
        mapApproval[msg.sender] = 0;
    } 

    //Limpa as aprovações
    function resetAllApproval() public onlyOwner onlyApproved {
        _clearAllApproval();
    } 

    function _clearAllApproval() internal {
        uint256 length_ = arrayApproval.length;
        if (length_ > 1) {
            for (uint256 i = 1; i < length_; i++) {
                mapApproval[arrayApproval[i]] = 0;
            }
        }
        delete arrayApproval;
        arrayApproval.push(address(0x0));
    }
    
    //Verifica se determinado endereço aprovou, retorna o indice no array
    function checkApproval(address _address) public view returns (uint256) {
        uint256 index = mapApproval[_address];
        return index;
    } 

    //Lista endereços que aprovaram
    function listApproval() public view returns (address[] memory) {
        return arrayApproval;
    }

    //Retorna quantidade de aprovações
    function countApproval() public view returns (uint256) {
        return arrayApproval.length - 1;
    }

    string public info;

    function setInfo(string memory _info) public onlyApproved  {
        info = _info;
        _clearAllApproval();
    }
    
}