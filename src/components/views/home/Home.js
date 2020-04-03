import React, { Component } from "react";
import './home.scss';
import {Header} from '../header/header';
import productData from '../../../data/productdata.json';

import ChangeFilterColor from './changeFilterColor';

class Home extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data: productData,
            newProductArry : [],
            images : [],
            product : productData,
            imagesList: [],
            newSizeArry: [],
            totalPrice : 0,
            baremValue: '',
            baremPriceValue: '',
            selectedBarem : '',
            buttonStatus : false,
            colorFilter : '',
            sizeFilter : '',
            filtered : null,
            //a : this.props.state.a,
            b : false,
            c : false,
            d : false,
        }
        this.changeSize = this.changeSize.bind(this);
        this.baremChange = this.baremChange.bind(this);
        this.baremPrice = this.baremPrice.bind(this);
        this.filterAll = this.filterAll.bind(this);
        this.changeImage = this.changeImage.bind(this);
        this.basketBtnVisible = this.basketBtnVisible.bind(this);
        this.addBasket = this.addBasket.bind(this);
    }

    changeSize(e){
        this.state.filtered = null;
        const size = e.target.getAttribute("data-name");

        if(!e.target.checked){
            this.basketBtnVisible(this.state.b = true);
            this.state.sizeFilter = size;
        }
        else{
            this.basketBtnVisible(this.state.b = false);
            this.state.sizeFilter = null;
        }

        this.filterAll();
    }


    filterAll(){
        this.state.imagesList = [];
        if(this.state.filtered == null)
            this.state.filtered = productData.productVariants.filter((item) => {
                return item.attributes[1].value === this.state.colorFilter
            });

        var newSizeArry = [];
        if(this.state.sizeFilter==null)
            newSizeArry = [  this.state.filtered[0] ];
        else
            newSizeArry = this.state.filtered.filter((item) => {
                return item.attributes[0].value === this.state.sizeFilter
            });

        newSizeArry.map((item) => {
            this.state.imagesList.push( { images : item.images });
        });

        if(this.state.imagesList != null)
            this.state.imagesList.map((itemImg) => {
                Array.from(itemImg.images).map((sizeObj, index) => {
                    document.getElementsByClassName("sImages")[index].src = "";
                    document.getElementsByClassName("sImages")[index].src = sizeObj;
                    document.getElementsByClassName("bigImages")[0].src = "";
                    document.getElementsByClassName("bigImages")[0].src = sizeObj;
                });
            })
    }

    baremChange(e){

        this.setState({
            baremValue: e.target.value,
            totalPrice: this.state.baremValue,
        });

        var barem = [];
        barem.push(document.getElementsByClassName("barem"));
        barem.forEach(function(item, index){
            var minimumQuantity = barem[index][index].getAttribute("data-minimumquantity");
            var maximumQuantity = barem[index][index].getAttribute("data-maximumquantity");
            if( e.target.value >= minimumQuantity && e.target.value <= maximumQuantity )
                barem[index][index].classList.add('baremChange');
            else
                barem[index][index].classList.remove('baremChange');
        });

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

    changeImage (e){
        let bigImages = document.getElementById("bigImages");
        bigImages.src= e.target.src
    }

    basketBtnVisible(a, b, c, d) {
        if (a && this.state.b && this.state.c && this.state.d)
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
                    <div className="product-image">
                        <img className="bigImages" id="bigImages" src={data.productVariants[0].images.slice(0,1)}/>
                        <div className="images">
                            {
                                data.productVariants.map((attr) => {
                                    return (
                                        <div className="smallImages">
                                            <img onClick={this.changeImage}  className="sImages" src={attr.images[0]}/>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                    <div className="product-detail-content">
                        <div className="product-name">
                            <span className="productTitle">{data.productTitle}</span>
                        </div>
                        <hr/>
                        <ChangeFilterColor
                            filterAll={this.filterAll}
                            basketBtnVisible={this.basketBtnVisible}
                            changeSize={this.changeSize}
                            />
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
                        <div className="piece">Adet <input type="number" className="myText" placeholder="100" value={this.state.baremValue} onChange={ this.baremChange}/> Adet</div>
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