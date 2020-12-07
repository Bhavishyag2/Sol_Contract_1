const assert=require('assert');
const ganache=require('ganache-cli');
const Web3=require('web3');


const {interface,bytecode}=require('../compile');

const provider=ganache.provider();
const web3=new Web3(provider);

let accounts;
let inbox;

beforeEach(async () => {

  // get a list of all accounts
  accounts=await web3.eth.getAccounts(); // using instance of web3 and not with capital W(we get them with the help of ganache-cli)
    /*.then(fetchedAccounts=>{
      console.log(fetchedAccounts);
    });*/
  //use one of those accounts to deploy the contract
  inbox=await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments: ['Hi there!'] })
    .send({from:accounts[0],gas:'1000000'});

    inbox.setProvider(provider);
});//Capital C since it is a constructor
        //deploy is a method that we are chaining on that is returned from contract constructor, data is actual bytecode, arguments is some initail msg
describe('inbox',()=>{
  it('deploys a contract',()=>{
  //console.log(inbox);
  assert.ok(inbox.options.address); // this contains address of wherever this contracrt is deployed to; ok method assures that the value is not null
  });

  it('has a default message', async ()=>{
    const message= await inbox.methods.message().call();
    assert.equal(message,'Hi there!');
  });

  it('can change the message', async ()=>{
    await inbox.methods.setMessage('bye').send({ from:account[0] });
    const message=await inbox.methods.message().call();
    assert.equal(message,'bye');

  });
});


// mocha testing examples


/*
class Car{
park(){
  return 'stopped';
}
drive(){
  return 'vroom';
}
}

let car;
beforeEach(()=>{
  car=new Car();
});

describe('Car',()=>{
  it('can park', ()=>{
    //const car= new Car();
    assert.equal(car.park(),'stopped');  // assert.equal makes sure that these two values are equal
  });

  it('can drive',()=>{
    //const car=new Car();
    assert.equal(car.drive(),'vroom');
  });
});
*/
