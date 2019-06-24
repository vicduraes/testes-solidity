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

    describe('Approval', function () {
        it('owner can approve', async() => {
            await truffleAssert.passes(ownerap.doApproval({from: owner1 }))
        })
        it('nononwer cannont doApproval', async() => {
            await truffleAssert.reverts(ownerap.doApproval({from: nonowner1 }))
        })        
        it('owner can cancel approve', async() => {
            await truffleAssert.passes(ownerap.doApproval({from: owner1 }))
            await truffleAssert.passes(ownerap.cancelApproval({from: owner1 }))
        })
        it('nononwer cannot cancel approve', async() => {
            await truffleAssert.passes(ownerap.doApproval({from: owner1 }))
            await truffleAssert.reverts(ownerap.cancelApproval({from: nonowner2 }))
        })
        // it('owner can reset all approvals', async() => {
        //     await truffleAssert.passes(ownerap.doApproval({from: owner1 }))
        //     await truffleAssert.passes(ownerap.doApproval({from: owner3 }))
        //     await truffleAssert.passes(ownerap.resetAllApproval({from: owner1 }))
        // })
    });
})