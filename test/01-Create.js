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

    describe('Create - owner', function () {
        it('check if creator is owner at create', async() => {
            /* */            
            var response = await ownerap.owner(owner1)
            console.log ('response: ' + response)
            assert.equal(response, true, 'owner is wrong at create')
        }) 

        //O que mais deve ser verificado com o owner na criação do contrato?
    });
   
    describe('Create - quant', function () {
        it('check if minApproval = 1 at create', async() => {
            var response = await ownerap.minApproval()
            assert.equal(response, 1, 'minApproval is wrong at create')            
        })
        
        it('check if quantOwner = 1 at create', async() => {  
            var response = await ownerap.quantOwner()
            assert.equal(response, 1, 'quantOwner is wrong at create') 
        })

        //O que mais deve ser verificado na criação do contrato? Se as aprovações estão zeradas
    });

    describe('Approval', function () {

        it('owner can approve', async() => {
            await truffleAssert.passes(ownerap.doApproval({from: owner1 }))
            // await truffleAssert.eventEmitted(ownerap.doApproval({from: owner1 }))
        })

        it('nononwer cannont doApproval', async() => {
            await truffleAssert.reverts(ownerap.doApproval({from: nonowner1 }))
        })        
        
    });
})