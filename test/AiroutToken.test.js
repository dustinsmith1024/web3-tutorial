const AiroutToken = artifacts.require('./AiroutToken.sol');

contract('AiroutToken', (accounts) => {
    it ('initializes contract with correct values', async () => {
        const token = await AiroutToken.deployed();
        const name = await token.name();
        const symbol = await token.symbol();
        const standard = await token.standard();
        assert.equal(name, 'Airout');
        assert.equal(symbol, 'AIRO');
        assert.equal(standard, 'v2022-04-16');
    });

    it('allocates the initial supply', async () => {
        const tokenInstance = await AiroutToken.deployed();
        // console.log(tokenInstance);

        const supply = await tokenInstance.totalSupply();
        assert.equal(supply.toNumber(), 1_000_000_000);

        // console.log(accounts);
        const adminBalance = await tokenInstance.balanceOf(accounts[0]);
        // console.log(adminBalance);
        assert.equal(adminBalance.toNumber(), 1000000000);

    });

    it('transfer function', async() => {
        const token = await AiroutToken.deployed();
        const account = accounts[0];

        try {
            const x = await token.transfer.call(accounts[1], 1_999_999_999);
            console.log(x);
            assert.equal(true, false, 'should not pass');
        } catch (err) {
            console.log(err);
            // Failed transaction will trigger a revert event
            assert(err.message.indexOf('revert') >= 0);
        }

        // .call does NOT give us a transaction
        // no .call we get a "receipt"
        const receipt = await token.transfer(accounts[1], 250_000, { from: accounts[0]});

        // check the receipt
        const balance = await token.balanceOf(accounts[1]);
        assert.equal(balance.toNumber(), 250_000);
        const balance2 = await token.balanceOf(accounts[0]);
        assert.equal(balance2.toNumber(), 999750000);

        assert.equal(receipt.logs.length, 1);
        assert.equal(receipt.logs[0].event, 'Transfer');
        assert.equal(receipt.logs[0].args._from, accounts[0]);
        assert.equal(receipt.logs[0].args._to, accounts[1]);
        assert.equal(receipt.logs[0].args._value, 250_000);

        const success = await token.transfer.call(accounts[1], 250_000, { from: accounts[0]});
        assert.equal(success, true);
    });


    it('approves token for delegated transfer', async() => {
        const token = await AiroutToken.deployed();
        const approved = await token.approve.call(accounts[1], 100);
        assert.equal(approved, true);

        const receipt = await token.approve(accounts[1], 100, { from: accounts[0] });
        assert.equal(receipt.logs.length, 1);
        assert.equal(receipt.logs[0].event, 'Approve');
        assert.equal(receipt.logs[0].args._owner, accounts[0]);
        assert.equal(receipt.logs[0].args._spender, accounts[1]);
        assert.equal(receipt.logs[0].args._value, 100);

        const allowed = await token.allowance(accounts[0], accounts[1]);
        assert.equal(allowed.toNumber(), 100);
    })

    // it('sets initial supply', async () => {
    //     const x = await AiroutToken.deployed();
    //     console.log(x);

    //     const supply = await x.totalSupply();
    //     assert.equal(supply.toNumber(), 1_000_000_000);
    // })
})