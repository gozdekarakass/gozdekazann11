import React, { Component } from "react";
import './home.scss';
import {Header} from '../header/header';
import productData from '../../../data/productdata.json';

import BaremPrice from './baremPrice';

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
            filtered : null
        }
        this.changeFilterColor = this.changeFilterColor.bind(this);
        this.changeSize = this.changeSize.bind(this);
        this.baremChange = this.baremChange.bind(this);
        this.baremPrice = this.baremPrice.bind(this);
        this.filterAll = this.filterAll.bind(this);
    }

    changeFilterColor(e){
        this.state.filtered = null;
        const sizeName = e.target.getAttribute("data-name");
        const inputs = document.querySelectorAll(".sizeInput");

        //color her change oldugunda size checked sifirlanmali
        for (var i = 0; i < inputs.length; i++) { inputs[i].checked = false; }

        for (var a = 0; a < inputs.length; a++) { inputs[a].setAttribute("disabled",true); }

        const newProductArry = productData.productVariants.filter((item) => {
            return item.attributes[1].value === sizeName
        });

        var first = true;
        newProductArry.map((item) => {
            for (var i = 0; i < inputs.length; i++) {
                if(item.attributes[0].value === inputs[i].value)
                    //renk secildiginde beden icin ilkini checked
                    if(first)
                        inputs[i].checked = true;
                    first = false;
                    inputs[i].removeAttribute("disabled");
                    inputs[i].setAttribute("data-id", item.id);
            }
        });

        this.state.colorFilter = sizeName;
        this.state.sizeFilter = null;
        this.state.filtered = newProductArry;
        this.filterAll();
    }

    changeSize(e){
        this.state.filtered = null;
        const size = e.target.getAttribute("data-name");

        if(!e.target.checked)
            this.state.sizeFilter = size;
        else
            this.state.sizeFilter = null;

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
            this.state.imagesList.push(item.images);
        });

        if(this.state.imagesList != null)
            this.state.imagesList.map((itemImg) => {
                Array.from(itemImg).map((sizeObj, index) => {
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

    basketBtnVisible(){
        let colorInput = document.getElementsByClassName("colorInput")[1].checked;
        let sizeInput = document.getElementsByClassName("sizeInput")[1].checked;

        if(colorInput && sizeInput && (this.state.baremValue != 0) && (this.state.selectedBarem != null) ){
            document.getElementById('basketBtn').disabled = false;
            this.setState({buttonStatus : true})
        }
        else {
            document.getElementById('basketBtn').disabled = true;
            this.setState({ buttonStatus : false });
        }

        // seçili olan attribute’un id sini ve seçili baremi console’a basabilirsin
        console.log('secili id' +  document.querySelector('.sizeInput:checked').getAttribute('data-id'));
        console.log('secili barem' +  document.getElementsByClassName('baremChange')[0].getAttribute('data-price'));

    }

    componentDidUpdate() {
        console.log('componentDidUpdate');
        this.basketBtnVisible = this.basketBtnVisible.bind(this);
        return this.state.buttonStatus;
    }

    render(){
        const { data } = this.state;
        return(
            <div>
               <Header/>
                <div className="product">
                    <div className="product-image">
                        <img className="bigImages" src={data.productVariants[0].images.slice(0,1)}/>
                        <div className="images">
                        {
                            data.productVariants.map((attr) => {
                                return (
                                    <div className="smallImages">
                                        <img className="sImages" src={attr.images[0]}/>
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
                        <div className="attributes">
                            {
                                data.selectableAttributes.map((item,i) => (
                                    <div className="items" key={i}>
                                        <strong>
                                            {item.name}
                                        </strong>
                                        <ul>
                                            {
                                                item.values.map((itemRadio,i) => (
                                                    <div className="form-group">
                                                    <li key={i}>
                                                        <input className={item.name === "Renk" ? "colorInput" : "sizeInput"}
                                                               name={item.name} value={itemRadio}
                                                               disabled={item.name === "Beden" ? true : false}
                                                               id={itemRadio+i}
                                                               type="radio"
                                                        />
                                                        {item.name == "Renk" ?
                                                            <label for="html" className="color" data-name={itemRadio}  onClick={ this.changeFilterColor } htmlFor={itemRadio+i}>
                                                                {itemRadio}
                                                            </label>
                                                            :
                                                            <label for="html" className="size" onClick={ this.changeSize} data-name={itemRadio}  htmlFor={itemRadio+i}>
                                                                {itemRadio}
                                                            </label>
                                                        }
                                                    </li>
                                                </div>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                ))
                            }
                        </div>
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
                            <h5>TOPLAM : { this.state.totalPrice * this.state.baremPriceValue } TL</h5>
                        </div>
                        <div className="basketDiv">
                            <input id="basketBtn" type="button" className="basketBtn" value="SEPETE EKLE" disabled={ this.state.buttonStatus ? '' : 'disabled'}/>
                        </div>

                    </div>
                </div>
             </div>
        );
    }
}

export default Home;