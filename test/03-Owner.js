const truffleAssert = require('truffle-assertions');

const Ownerap = artifacts.require('Ownerap');

const {
    decimals,
    ether,
    addressZero,
    owner1,
    owner2,
    owner3,
    owner4,
    owner5,
    nonowner1,
    nonowner2,
    info1,
    info2
} = require('./dataTest');

  contract('Ownerap', function() {

    let ownerap
  
    beforeEach('setup for each test', async () => {
        ownerap = await Ownerap.new()
    })

    describe('Owner', function () {

        it('add owner', async() => {
            await truffleAssert.passes(ownerap.doApproval({from: owner1 }))
            await truffleAssert.passes(ownerap.addOwner(nonowner1))
        })
        it('the address is already owner', async() => {
            await truffleAssert.reverts(ownerap.addOwner(owner1))
        })
        it('address can not remove yourself', async() => {
            await truffleAssert.passes(ownerap.doApproval({from: owner1 }))
            await truffleAssert.reverts(ownerap.delOwner(owner1))
        })
        it('delete owner', async() => {
            await truffleAssert.passes(ownerap.doApproval({from: owner1 }))
            await truffleAssert.passes(ownerap.addOwner(owner2))
            await truffleAssert.passes(ownerap.doApproval({from: owner2 }))
            await truffleAssert.passes(ownerap.delOwner(owner2, {from: owner1}))
        })
    });
})