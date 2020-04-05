import React, { Component } from "react";
import './home.scss';
import {Header} from '../header/header';
import productData from '../../../data/productdata.json';

import ChangeFilter from './changeFilter.js';
import ChangeImage from './changeImage.js';

class Home extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data: productData,
            totalPrice : 0,
            baremValue: '',
            baremPriceValue: '',
            selectedBarem : '',
            buttonStatus : false,
            a : false,
            b : false,
            c : false,
            d : false,
        }
        this.baremChange = this.baremChange.bind(this);
        this.baremPrice = this.baremPrice.bind(this);
        this.basketBtnVisible = this.basketBtnVisible.bind(this);
        this.addBasket = this.addBasket.bind(this);
    }

    baremChange(e){

        this.setState({
            baremValue: e.target.value,
            totalPrice: this.state.baremValue,
        });

        let baremChange = [];
        //inputtan deger girerken barem araligi bulmadan once secilen aralik sifirla
        if(document.getElementsByClassName("baremChange").length > 0){
            baremChange.push(document.getElementsByClassName("baremChange"));
            baremChange.map((itm, ind) => {
                itm[ind].classList.remove('baremChange');
            });
        }

        for (var i = 0; i < document.getElementsByClassName("barem").length; i++) {

            let minimumQuantity = document.getElementsByClassName("barem")[i].getAttribute("data-minimumquantity");
            let maximumQuantity = document.getElementsByClassName("barem")[i].getAttribute("data-maximumquantity");
            let getPrice = document.getElementsByClassName("barem")[i];

            if( e.target.value >= minimumQuantity && e.target.value <= BigInt(maximumQuantity) ){
                document.getElementsByClassName("barem")[i].classList.add('baremChange');

                //barem araligi girdiginde select ederken toplam fiyat da hesapla
                this.setState((prevState) => {
                    return {
                        baremPriceValue: getPrice.getAttribute("data-price"),
                        selectedBarem : !prevState.selectedBarem
                    }
                });
                let a = document.getElementsByClassName('barem');
                for (let i = 0; i < a.length; i++) { a[i].classList.remove('baremChange') }
                getPrice.classList.add('baremChange');
                this.basketBtnVisible(this.state.c = true);
            }
            else{
                document.getElementsByClassName("barem")[i].classList.remove('baremChange');

            }
        }
        this.basketBtnVisible(this.state.d = true);
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

        this.basketBtnVisible(this.state.c = true);

    }

    basketBtnVisible() {
        if (this.state.a && this.state.b && this.state.c && this.state.d)
            this.state.buttonStatus = true;
        else
            this.state.buttonStatus = false;
    }

    addBasket(){
        // seçili olan attribute’un id sini ve seçili baremi console’a basabilirsin
        console.log('secili ID : ' + document.querySelector('.sizeInput:checked').getAttribute('data-id'));
        console.log('secili barem : ' + document.getElementsByClassName('baremChange')[0].getAttribute('data-price'));
        console.log('toplam fiyat : ' + this.state.totalPrice * this.state.baremPriceValue );
    }

    render(){
        const { data } = this.state;
        return(
            <div>
                <Header/>
                <div className="product">

                    <ChangeImage data={data} />

                    <div className="product-detail-content">

                        <ChangeFilter data={data} basketBtnVisible={this.basketBtnVisible} />

                        <div className="baremList">
                            <hr/>
                            <div className="baremDiv">
                                <p>Toptan Fiyat (Adet)</p>
                                {
                                    data.baremList.map((barem) => {
                                        return(
                                            <div className="barem"
                                                 data-price={barem.price}
                                                 data-minimumquantity={barem.minimumQuantity}
                                                 data-maximumquantity={barem.maximumQuantity}
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

                        <div className="piece">
                            Adet
                            <input type="number"
                                   className="myText"
                                   placeholder="100"
                                   value={this.state.baremValue}
                                   onChange={ this.baremChange}/> Adet
                        </div>

                        <div className="totalPrice">
                            <h5>TOPLAM : { this.state.totalPrice * this.state.baremPriceValue } TL</h5>
                        </div>

                        <div className="basketDiv">
                            <input onClick={this.addBasket}
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