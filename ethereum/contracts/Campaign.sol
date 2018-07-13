pragma solidity ^0.4.17;

contract DocFactory {
    struct Item {
        address itemAddress;
        address owner;
        string description;
    }

    Item[] public deployedItems;

    function createItem(string description) public {
        address newAddress = new Doc(description, msg.sender);
        Item memory newItem = Item({
            itemAddress : newAddress,
            owner : msg.sender,
            description : description
        });
        deployedItems.push(newItem);
    }
    function getItemsCount() public view returns(uint) {
        return deployedItems.length;
    }
}

contract Doc {
    struct Document {
        string commitMessage;
        string documentTitle;
        string documentLocation;
        uint blockTimestamp;
        uint fileHash;
        address creator;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    
    Document[] public documents;
    address public owner;
    string public description;
    mapping(address => bool) public approvers;
    address[] public approversList;
    uint public approversCount;

    function Doc(string brief,address creator) public {
        owner = creator;
        description = brief;
    }
    
    function addApprover(address approver)  public {
        require(msg.sender == owner);
        approvers[approver] = true;
        approversCount++;
    }
    
    function createDoc(string message, string documentTitle, string documentLocation) public{
        require(msg.sender == owner);
        uint hash = uint(keccak256(documentTitle,documentLocation));
        Document memory newDocument = Document({
           commitMessage:message,
           documentTitle: documentTitle,
           documentLocation: documentLocation,
           blockTimestamp: block.timestamp,
           fileHash: hash,
           creator:msg.sender,
           complete: false,
           approvalCount: 0
        });

        documents.push(newDocument);
    }

    function approveRequest(uint index) public {
        Document storage document = documents[index];

        require(approvers[msg.sender]);
        require(!document.approvals[msg.sender]);

        document.approvals[msg.sender] = true;
        document.approvalCount++;
    }

    function finalizeRequest(uint index) public  {
        
        Document storage document = documents[index];

        require(document.approvalCount > (approversCount / 2));
        require(!document.complete);
        document.complete = true;
    }

    function getSummary() public view returns (
        address,string,uint
      ) {
        return (
          owner,
          description,
          approversCount
        );
    }
    
    function getRequestsCount() public view returns (uint) {
        return documents.length;
    }
}