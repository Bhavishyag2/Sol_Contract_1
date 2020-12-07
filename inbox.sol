pragma solidity ^0.4.17;
contract Inbox{
    string public message;
    function Inbox(string initial) public{
        message=initial;
    }
    function setMsg(string i) public{
        message =i;
    }
    function getMsg() public view returns (string){
        return message;
    }

}
