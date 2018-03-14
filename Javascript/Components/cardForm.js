import React from 'react';
import {injectStripe} from 'react-stripe-elements';
import {CardElement} from 'react-stripe-elements';
import axios from 'axios';
import {withRouter} from 'react-router'

const createOptions = (fontSize) => {
  return {
    style: {
      base: {
        fontSize,
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, Menlo, monospace',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };
};

class _CardForm extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      value: "",
      manualInput: "",
      newAmount: ""
    };
  }
  handleSubmit = ev => {
    ev.preventDefault();
    this.props.stripe.createToken().then(payload => {
    //if 'other' was selection, grab input value and set state
      if(this.state.value == '0.00'){
        var newAmount = this.state.manualInput *100;
        this.setState({
          newAmount: newAmount
        })
      }
      else{
        var newAmount = $("#stripeAmount").val() *100;
        this.setState({
          newAmount: newAmount
        })
      }
      axios.post(STRIPE_ENDPOINT, {
        //send required object to backend
        receipt_email: this.stripeEmail,
        amount: this.state.newAmount,
        currency: 'usd',
        description: 'Donation',
        source: payload.token.id
      })
      .then((response) => {
        var newEmail = $("#stripeEmail").val();
        var newName = $("#stripeName").val();
        axios.post(STORE_DATA_ENDPOINT, {
          email: newEmail,
          donationAmount: this.state.newAmount/100,
          name: newName
        })
        .then((response) => {
        //route to a thank you page
          this.props.router.push('/donations/thankyou');
      })
        .catch(function (error) {
          console.log(error);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    });
  };

  handleChange = ev => {
    this.setState({
      value: ev.target.value
    });
  }

  inputChange = ev => {
    this.setState({
      manualInput: ev.target.value
    });
  }

  handleBlur = ev => {
    var num = parseFloat(this.state.manualInput);
    var cleanNum = num.toFixed(2);
    this.setState({
      manualInput: cleanNum
    });
  }

  render() {
    const chosen = this.state.value;
    return (
      <form onSubmit={this.handleSubmit}>
          <div>
              <h4>
                  *All fields are required
              </h4>
              <br/>
              <label>
              Card Holder's Name
              </label>
              <br/>
              <input type="name" id = "stripeName" placeholder="Name" className= "form-control stripe-manual-input" required/>
          </div>
          <div>
              <label>
              E-mail
              </label>
              <br/>
              <input type="email" id = "stripeEmail" placeholder="Email Address" className= "form-control stripe-manual-input" required/>
          </div>
          <div className= "form-group">
              <label>
              Amount
              </label>
              <br/>
              <select name="amount" value= {this.state.value} id="stripeAmount" className= "form-control stripe-manual-input" onChange = {this.handleChange} required>
                  <option value="" disabled> Please Select an Amount</option>
                  <option value="3.00">$3.00</option>
                  <option value="10.00">$10.00</option>
                  <option value="20.00">$20.00</option>
                  <option value="50.00">$50.00</option>
                  <option value="100.00">$100.00</option>
                  <option value="0.00">Other</option>
              </select>
              {chosen == '0.00' &&
              <input type="number" value = {this.state.manualInput} name="myDecimal" 
              className="form-control stripe-manual-input" min="1.00" placeholder="1.00" step="0.01" pattern="/^[0-9]+(\.[0-9]{1,2})?$/" 
              onChange = {this.inputChange} onBlur = {this.handleBlur}/>
              }
          </div>
          <label>
          Card details 
          </label>
              <CardElement
              {...createOptions(this.props.fontSize)}
          />
          <button className="btn btn-primary">Donate</button>
      </form>
    );
  }
}
const CardForm = injectStripe(_CardForm);
  
export default withRouter(CardForm)