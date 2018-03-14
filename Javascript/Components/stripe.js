import React from 'react';
import axios from 'axios';
import ReactStripeElements from 'react-stripe-elements';
import {StripeProvider} from 'react-stripe-elements';
import Checkout from '../donations/Checkout'

class Stripe extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            apiKey: ""
        }
    }

    //grab api key from backend
    componentDidMount(){
        axios.get(STRIPEKEY)
            .then(data =>{
                let stripeKey = data.data.item;
                this.setState({
                    apiKey: stripeKey
                })
            })
    }

    render(){
        if (this.state.apiKey === ""){
            return null;
        }
        return(
        <StripeProvider apiKey={this.state.apiKey}>
            <Checkout />
        </StripeProvider>
        )
    }
}
export default Stripe

