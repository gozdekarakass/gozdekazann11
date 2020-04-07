import React, { Component } from "react";
import './home.scss';
import {Header} from '../header/header';
import productData from '../../../data/productdata.json';

import ChangeFilter from './changeFilter.js';
import ChangeImage from './changeImage.js';
import BaremCal from './baremCalc.js';

class Home extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data: productData,
            buttonStatus : false,
            btnControl : {}

        }
        this.addBasket = this.addBasket.bind(this);
        this.basketBtnVisible = this.basketBtnVisible.bind(this);

    }

    basketBtnVisible() {
        console.log(this.state.btnControl);

        if (
            this.state.btnControl.colorStatus && this.state.btnControl.sizeStatus
            && this.state.btnControl.inputBaremStatus && this.state.btnControl.baremSelectStatus
        )
            this.setState({ buttonStatus : true})
        else
            this.setState({ buttonStatus : false})

        //console.log(delete this.state.btnControl.colorStatus);

    }


    addBasket(){
        // seçili olan attribute’un id sini ve seçili baremi console’a basabilirsin
        console.log('secili ID : ' + document.querySelector('.sizeInput:checked').getAttribute('data-id'));
        console.log('secili barem : ' + document.getElementsByClassName('baremChange')[0].getAttribute('data-price'));
        console.log('toplam fiyat : ' + this.state.totalPrice * this.state.baremPriceValue );
    }

    render(){
        const { data, btnControl } = this.state;
        return(
            <div>
                <Header/>
                <div className="product">
                    <ChangeImage data={data} />
                    <div className="product-detail-content">
                        <ChangeFilter
                            data={data}
                            btnControl={btnControl}
                            basketBtnVisible={this.basketBtnVisible}
                        />
                        <BaremCal
                            data={data}
                            btnControl={btnControl}
                            basketBtnVisible={this.basketBtnVisible}
                        />

                        <div className="basketDiv">
                            <input onClick={ this.addBasket }
                                   id="basketBtn"
                                   type="button"
                                   className="basketBtn"
                                   value="SEPETE EKLE"
                                   disabled={ this.state.buttonStatus ? '' : 'disabled'}/>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Home;