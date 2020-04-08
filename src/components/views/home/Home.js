import React, { Component } from "react";
import './home.scss';
import {Header} from '../header/header';
import { Button } from 'reactstrap';
import productData from '../../../data/productdata.json';

import ChangeFilter from './changeFilter.js';
import ChangeImage from './changeImage.js';
import BaremCal from './baremCalc.js';

class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: productData,
            btnControl : {}
        };
        this.addBasket = this.addBasket.bind(this);
        this.basketBtnVisible = this.basketBtnVisible.bind(this);
    }

    basketBtnVisible() {
        if (this.state.btnControl.colorStatus && this.state.btnControl.sizeStatus && this.state.btnControl.inputBaremStatus && this.state.btnControl.baremSelectStatus)
            document.getElementsByClassName("basketBtn")[0].classList.remove('disabled');
        else
            document.getElementsByClassName("basketBtn")[0].classList.add('disabled');
    }

    addBasket(){
        // seçili olan attribute’un id sini ve seçili baremi console’a basabilirsin
        console.log('secili ID : ' +  document.querySelector('.sizeInput:checked').getAttribute('data-id'));
        console.log('secili barem : ' + document.getElementsByClassName('baremChange')[0].getAttribute('data-price'));
        console.log('toplam fiyat : ' + document.getElementById('total').textContent);
    }

    componentDidMount(){
        document.getElementsByClassName("bigImages")[0].src = "";
        document.getElementsByClassName("bigImages")[0].src = document.getElementsByClassName("sImages")[2].src;

        document.getElementById('number').value = document.getElementsByClassName("barem")[0].getAttribute("data-minimumquantity");
        document.getElementsByClassName("barem")[0].classList.add("baremChange");
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
                            <Button className="basketBtn disabled" onClick={() => this.addBasket()}  >
                                SEPETE EKLE
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;