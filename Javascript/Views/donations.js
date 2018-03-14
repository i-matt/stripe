import React from 'react';
import axios from 'axios';
import Stripe from '../components/donations/Stripe';

class Donations extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    //makes email dynamic- get from database
    componentDidMount(){
        axios.get('api/donations/ppEmail')
            .then(data =>{
                let ppEmail = data.data.item;
                this.setState({
                    email: ppEmail
                })
            })
    }

    render(){
        return(
            <div id="wrapper" className="gray-bg">
                <div className="text-center donation-top">
                    <img src="LOGO" />
                    <i className="fa fa-rocket mid-icon donations-rocket"></i>
                </div>
                <div className="forum-content">
                    <div className="media ibox-content forum-container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="ibox-content m-b-sm border-bottom">
                                    <div className="p-xs">
                                        <div className="pull-left m-r-md">
                                        </div>
                                        <h1>Donate to me</h1>
                                        <p>If able, we're asking you to help support me. We're a nonprofit that relies on support from people like you. Your
                                            contribution can help me continue to thrive for years. Please help keep me
                                            free, for anyone, anywhere forever.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="wrapper wrapper-content">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="ibox">
                                <div className="ibox-title">
                                    Payment method
                                </div>
                                <div className="ibox-content">
                                    <div className="panel-group payments-method" id="accordion">
                                        <div className="panel panel-default">
                                            <div className="panel-heading">
                                                <div className="pull-right">
                                                    <i className="fa fa-cc-paypal text-success"/>
                                                </div>
                                                <h5 className="panel-title">
                                                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne">PayPal</a>
                                                </h5>
                                            </div>
                                            <div id="collapseOne" className="panel-collapse collapse">
                                                <div className="panel-body">
                                                    <div className="row">
                                                        <div className="col-md-4">
                                                            <h2>Summary</h2>
                                                            <strong>My</strong>: <span className="text-navy">Donation</span><br/>
                                                            <p className="m-t">
                                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                                                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                                                nisi ut aliquip ex ea commodo consequat.
                                                            </p>
                                                            <p>
                                                                Duis aute irure dolor
                                                                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                                                                nulla pariatur. Excepteur sint occaecat cupidatat.
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <form id="paypalForm" name="_xclick" action="YOUR PAYPAL ACC" method="post">
                                                                <input type="hidden" name="cmd" value="_donations"/>
                                                                <input id="donation-amount" type="hidden" name="amount" value=""/>
                                                                <input type="hidden" name="business" value={this.state.email}/>
                                                                <input type="hidden" name="item_name" value="My Donation"/>
                                                                <input type="hidden" name="return" value="THANK YOU PAGE"/>
                                                                <input type="hidden" name="cancel_return" value="DONATION PAGE"/>
                                                                <input type="hidden" name="currency_code" value="USD"/>
                                                                <div className= "form-group col-md-4">
                                                                    <label>Amount</label>
                                                                    <br/>
                                                                    <select className = "amount form-control" name="amount" id="amount">
                                                                        <option value=""> Please Select an Amount</option>
                                                                        <option value="3.00">$3.00</option>
                                                                        <option value="10.00">$10.00</option>
                                                                        <option value="20.00">$20.00</option>
                                                                        <option value="50.00">$50.00</option>
                                                                        <option value="100.00">$100.00</option>
                                                                        <option value="0.00">Other</option>
                                                                    </select>
                                                                    <br/>
                                                                    <button type="image" className= "btn btn-success fa fa-cc-paypal" name="PP-submit" alt="Make a donation with PayPal">  Donate
                                                                    </button>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="panel panel-default">
                                            <div className="panel-heading">
                                                <div className="pull-right">
                                                    <i className="fa fa-cc-amex text-success"></i>
                                                    <i className="fa fa-cc-mastercard text-warning"></i>
                                                    <i className="fa fa-cc-discover text-danger"></i>
                                                </div>
                                                <h5 className="panel-title">
                                                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">Credit Card</a>
                                                </h5>
                                            </div>
                                            <div id="collapseTwo" className="panel-collapse collapse in">
                                                <div className="panel-body">
                                                    <div className="row">
                                                        <div className="col-md-4">
                                                            <h2>Summary</h2>
                                                            <strong>My</strong>: <span className="text-navy">Donation</span><br/>
                                                            <p className="m-t">
                                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                                                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                                                nisi ut aliquip ex ea commodo consequat.
                                                            </p>
                                                            <p>
                                                                Duis aute irure dolor
                                                                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                                                                nulla pariatur. Excepteur sint occaecat cupidatat.
                                                            </p>
                                                        </div>
                                                        <div className="col-md-8">
                                                            <Stripe onClick= {this.stripeChargeToken}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Donations