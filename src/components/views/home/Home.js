import React, { Component } from "react";
import './home.scss';
import {Header} from '../header/header';
import productData from '../../../data/productdata.json';

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
            buttonStatus : false
        }
        this.changeFilter = this.changeFilter.bind(this);
        this.changeSize = this.changeSize.bind(this);
        this.baremChange = this.baremChange.bind(this);
        this.baremPrice = this.baremPrice.bind(this);
    }

    changeFilter(e){

        const sizeName = e.target.getAttribute("data-name");
        const inputs = document.querySelectorAll(".sizeInput");

        //color her change oldugunda size checked sifirlanmali
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].checked = false;
        }

        for (var i = 0; i < inputs.length; i++) {
            inputs[i].setAttribute("disabled",true);
        }
        const newProductArry = productData.productVariants.filter((item) => {
            return item.attributes[1].value === sizeName
        });

        newProductArry.map((item) => {
            for (var i = 0; i < inputs.length; i++) {
                if(item.attributes[0].value === inputs[i].value) {
                    inputs[i].removeAttribute("disabled");
                }
            }
        });
       // console.log(this.state.imagesList);
    }

    changeSize(e){
        const size = e.target.getAttribute("data-name");

        const newSizeArry = productData.productVariants.filter((item) => {
            console.log('newProductArry' + item.attributes[0].value);

            return item.attributes[0].value === size
        });

        newSizeArry.map((item) => {
            console.log('--' + item.images);

            this.state.imagesList.push(item.images);

            if(this.state.imagesList != null){
                this.state.imagesList.map((itemImg) => {
                    Array.from(itemImg).map((sizeObj, index) => {
                        document.getElementsByClassName("sImages")[index].src = "";
                        document.getElementsByClassName("sImages")[index].src = sizeObj;
                        //console.log('1' + sizeObj);

                        document.getElementsByClassName("bigImages")[0].src = "";
                        document.getElementsByClassName("bigImages")[0].src = sizeObj;

                    });

                })
            }
        });

    }

    baremChange(e){
        this.setState({
            baremValue: e.target.value,
            totalPrice: this.state.baremValue,
        });
    }

    baremPrice(e){
        const dataprice = e.target.getAttribute("data-price");

        //e.target.classList.add('baremChange');
        console.log('dataprice :' + dataprice);


        this.setState((prevState) => {
            return {
                baremPriceValue: dataprice,
                selectedBarem : !prevState.selectedBarem
            }
        });


        var a = document.getElementsByClassName('barem');
        for (let i = 0; i < a.length; i++) {
            a[i].classList.remove('baremChange')
        }
        e.target.classList.add('baremChange');
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
                                                            <label for="html" className="color" data-name={itemRadio}  onClick={ this.changeFilter } htmlFor={itemRadio+i}>
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
                            <input type="button" className="basketBtn" value="SEPETE EKLE" disabled={ this.state.buttonStatus ? '' : 'disabled'}/>
                        </div>

                    </div>
                </div>
             </div>
        );
    }
}

export default Home;