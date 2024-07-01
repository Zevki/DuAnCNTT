//SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import '@openzeppelin/contracts/utils/Counters.sol';

contract DappVotes {
    using Counters for Counters.Counter;
    Counters.Counter private pollCounter;
    Counters.Counter private contestantCounter;

    struct Poll {
        uint id;
        string name;
        string info;
        uint voteCount;
        uint contestantCount;
        bool isDeleted;
        address creator;
        uint startTime;
        uint endTime;
        uint createdTime;
        address[] voters;
        string[] images;
    }

    struct Contestant {
        uint id;
        string picture;
        string contestantName;
        address participant;
        uint voteCount;
        address[] voters;
    }

    mapping(uint => bool) pollExists;
    mapping(uint => Poll) polls;
    mapping(uint => mapping(address => bool)) hasVoted;
    mapping(uint => mapping(address => bool)) hasContested;
    mapping(uint => mapping(uint => Contestant)) contestants;

    event VoteCast(address indexed voter, uint time);

    function createPoll(
        string memory name,
        string memory info,
        uint startTime,
        uint endTime
    ) public {
        require(bytes(name).length > 0, "Name cannot be empty");
        require(bytes(info).length > 0, "Description cannot be empty");
        require(startTime > 0, "Start time must be greater than 0");
        require(endTime > startTime, "End time must be greater than start time");

        pollCounter.increment();

        Poll memory newPoll;
        newPoll.id = pollCounter.current();
        newPoll.name = name;
        newPoll.info = info;
        newPoll.startTime = startTime;
        newPoll.endTime = endTime;
        newPoll.creator = msg.sender;
        newPoll.createdTime = getCurrentTime();

        polls[newPoll.id] = newPoll;
        pollExists[newPoll.id] = true;
    }

    function modifyPoll(
        uint id,
        string memory name,
        string memory info,
        uint startTime,
        uint endTime
    ) public {
        require(pollExists[id], "Poll does not exist");
        require(polls[id].creator == msg.sender, "Not authorized");
        require(bytes(name).length > 0, "Name cannot be empty");
        require(bytes(info).length > 0, "Description cannot be empty");
        require(!polls[id].isDeleted, "Poll already deleted");
        require(polls[id].voteCount < 1, "Poll already has votes");
        require(endTime > startTime, "End time must be greater than start time");

        polls[id].name = name;
        polls[id].info = info;
        polls[id].startTime = startTime;
        polls[id].endTime = endTime;
    }

    function removePoll(uint id) public {
        require(pollExists[id], "Poll does not exist");
        require(polls[id].creator == msg.sender, "Not authorized");
        require(polls[id].voteCount < 1, "Poll already has votes");
        polls[id].isDeleted = true;
    }

    function listPolls() public view returns (Poll[] memory availablePolls) {
        uint activeCount;
        for (uint i = 1; i <= pollCounter.current(); i++) {
            if (!polls[i].isDeleted) activeCount++;
        }

        availablePolls = new Poll[](activeCount);
        uint idx;

        for (uint i = 1; i <= pollCounter.current(); i++) {
            if (!polls[i].isDeleted) {
                availablePolls[idx++] = polls[i];
            }
        }
    }


    function getPollDetails(uint id) public view returns (Poll memory) {
        return polls[id];
    }

    function getCurrentTime() internal view returns (uint256) {
        return (block.timestamp * 1000) + 1000;
    }
}
