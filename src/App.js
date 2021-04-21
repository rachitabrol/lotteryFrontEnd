import React ,{Component} from 'react';
import {Button} from 'react-bootstrap';
import './App.css';
import web3 from './web3';
import lottery from './lottery'

class App extends Component {
  state = {
    manager:'',
    players:[],
    balance:'',
    value:'',
    message:''
  };
    async componentDidMount(){
      const manager= await lottery.methods.manager().call();
      const players = await lottery.methods.returnPlayers().call();
      const balance = await web3.eth.getBalance(lottery.options.address);
      console.log(players);

      this.setState({manager,players,balance});
    }

    onSubmit = async (event) => {
      event.preventDefault();
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });

      this.setState({message:'Waiting on transaction success...'})

      await lottery.methods.enter().send({
        from : accounts[0],
        value : web3.utils.toWei(this.state.value, 'ether')
      });

      this.setState({message:'You have been entered!'})
    };
    onClick = async (event) => {
      event.preventDefault();
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      this.setState({message:'Waiting on transaction success...'})
      try{
      await lottery.methods.pickWinner().send({
        from : accounts[0]
      });

      this.setState({message:'You have Won the lottery'});
    }catch(err){
      this.setState({message:err});
      console.log(err);
    }
    };
  render(){
    return (
      <div className='Body'>
        <h2>Lottery Contract</h2>
        <p>This contract is managed by {this.state.manager}</p>
        <p>Total number of players:{this.state.players.length} </p>
        <p>Prize Pool {web3.utils.fromWei(this.state.balance,'ether')} ether!</p>
        <hr/>

        <form onSubmit = {this.onSubmit}>
          <h4>Wanna Try your luck ? </h4>
          <div>
            <label> Amount of ether to enter: </label>
            <input
              value={this.state.value}
              onChange={event => this.setState({value:event.target.value})}
            />
          </div>
          <button onClick={this.onSubmit}>Enter</button>
        </form>
        <hr/>
        <h4>Ready to pick a winner?</h4>
        <button onClick={this.onClick}>Pick winner</button>
        <hr/>
        <h1>{this.state.message}</h1>

      </div>
    );
  }
}

export default App;
