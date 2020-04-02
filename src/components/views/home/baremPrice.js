import React, { Component } from "react";
import './home.scss';
import productData from '../../../data/productdata.json';

class BaremPrice extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data: productData,
            totalPrice : 0,
            baremValue: '',
            baremPriceValue: '',
            selectedBarem : '',
            buttonStatus : false
        }
        this.baremPrice = this.baremPrice.bind(this);
    }


    baremPrice(e){
        const dataprice = e.target.getAttribute("data-price");
        this.setState((prevState) => {
            return {
                baremPriceValue: dataprice,
                selectedBarem : !prevState.selectedBarem
            }
        });

        let a = document.getElementsByClassName('barem');
        for (let i = 0; i < a.length; i++) {
            a[i].classList.remove('baremChange')
        }
        e.target.classList.add('baremChange');
    }

    render(){
        const { data } = this.state;
        return(
            <div>
                <div className="baremList">
                    <hr/>
                    <div className="baremDiv">
                        <p>Toptan Fiyat (Adet)</p>
                        {
                            data.baremList.map((barem) => {
                                return(
                                    <div className="barem" data-price={barem.price}
                                         onClick={this.baremPrice}>
                                        {barem.minimumQuantity} - {barem.maximumQuantity}
                                        <br />
                                        {barem.price} TL
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
                <div className="clearfix"></div>
                <div className="piece">Adet <input value={this.state.baremValue} onChange={ this.baremChange} placeholder="100"/> Adet</div>
                <div className="totalPrice">
                    <h5>TOPLAM : { this.props.state.totalPrice * this.state.baremPriceValue } TL</h5>
                </div>
                <div className="basketDiv">
                    <input id="basketBtn" type="button" className="basketBtn" value="SEPETE EKLE" disabled={ this.state.buttonStatus ? '' : 'disabled'}/>
                </div>

            </div>
        );
    }
}

export default BaremPrice;