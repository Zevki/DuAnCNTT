const { expect } = require('chai');

describe('Contracts', () => {
  let contract, result;

  const info = 'Info';
  const name = 'name';
  const startTime = Date.now() - 10 * 60 * 1000;
  const endTime = Date.now() + 10 * 60 * 1000;
  const pollId = 1;
  const contestantId = 1;

  const avatar1 = 'https://avatar1.png';
  const name1 = 'Tien Dat';
  const avatar2 = 'https://avatar2.png';
  const name2 = 'Quang Thang';

  beforeEach(async () => {
    const Contract = await ethers.getContractFactory('DappVotes');
    [deployer, contestant1, contestant2, voter1, voter2, voter3] = await ethers.getSigners();

    contract = await Contract.deploy();
    await contract.deployed();
  });

  describe('Poll Test', () => {
    it('poll creation success', async () => {
        result = await contract.listPolls();
        expect(result).to.have.lengthOf(0);

        await contract.createPoll(name, info, startTime, endTime);

        result = await contract.listPolls();
        expect(result).to.have.lengthOf(1);

        result = await contract.getPollDetails(pollId);
        expect(result.name).to.be.equal(name);
        expect(result.creator).to.be.equal(deployer.address);
    });

    it('poll modify success', async () => {
      await contract.createPoll(name, info, startTime, endTime);

      result = await contract.getPollDetails(pollId);
      expect(result.name).to.be.equal(name);

      await contract.modifyPoll(pollId, 'New Title', info, startTime, endTime);

      result = await contract.getPollDetails(pollId);
      expect(result.name).to.be.equal('New Title');
    });

    it('poll deletion success', async () => {
      await contract.createPoll(name, info, startTime, endTime);

      result = await contract.listPolls();
      expect(result).to.have.lengthOf(1);

      result = await contract.getPollDetails(pollId);
      expect(result.isDeleted).to.be.equal(false);

      await contract.removePoll(pollId);

      result = await contract.listPolls();
      expect(result).to.have.lengthOf(0);

      result = await contract.getPollDetails(pollId);
      expect(result.isDeleted).to.be.equal(true);
    });
  });

  describe('Participant Test', () => {
    beforeEach(async () => {
      await contract.createPoll(name, info, startTime, endTime);
    });

    it('add participant success', async () => {
      result = await contract.getPollDetails(pollId);
      expect(result.contestantCount.toNumber()).to.be.equal(0);

      await contract.connect(contestant1).addContestant(pollId, name1, avatar1);
      await contract.connect(contestant2).addContestant(pollId, name2, avatar2);

      result = await contract.getPollDetails(pollId);
      expect(result.contestantCount.toNumber()).to.be.equal(2);

      result = await contract.listContestants(pollId);
      expect(result).to.have.lengthOf(2);
    });
  });

  describe('Voting Test', () => {
    beforeEach(async () => {
      await contract.createPoll(name, info, startTime, endTime);
      await contract.connect(contestant1).addContestant(pollId, name1, avatar1);
      await contract.connect(contestant2).addContestant(pollId, name2, avatar2);
    });


    it('voting success', async () => {
      result = await contract.getPollDetails(pollId);
      expect(result.voteCount.toNumber()).to.be.equal(0);

      await contract.connect(voter1).castVote(pollId, contestantId);
      await contract.connect(voter2).castVote(pollId, contestantId);

      result = await contract.getPollDetails(pollId);
      expect(result.voteCount.toNumber()).to.be.equal(2);
      expect(result.voters).to.have.lengthOf(2);
      expect(result.images).to.have.lengthOf(2);

      result = await contract.listContestants(pollId);
      expect(result).to.have.lengthOf(2);

      result = await contract.getContestantDetails(pollId, contestantId);
      expect(result.voters).to.have.lengthOf(2);
      expect(result.participant).to.be.equal(contestant1.address);
    });
  });
});
