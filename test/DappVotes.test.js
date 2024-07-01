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

  describe('Poll Management', () => {
    it('should confirm poll creation success', async () => {
        result = await contract.listPolls();
        expect(result).to.have.lengthOf(0);

        await contract.createPoll(name, info, startTime, endTime);

        result = await contract.listPolls();
        expect(result).to.have.lengthOf(1);

        result = await contract.getPollDetails(pollId);
        expect(result.name).to.be.equal(name);
        expect(result.creator).to.be.equal(deployer.address);
    });

    it('should confirm poll modify success', async () => {
      await contract.createPoll(name, info, startTime, endTime);

      result = await contract.getPollDetails(pollId);
      expect(result.name).to.be.equal(name);

      await contract.modifyPoll(pollId, 'New Title', info, startTime, endTime);

      result = await contract.getPollDetails(pollId);
      expect(result.name).to.be.equal('New Title');
    });

    it('should confirm poll deletion success', async () => {
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

});
