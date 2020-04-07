import React, { Component } from "react";

class BaremCalc extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            totalPrice : '',
            baremValue: '',
            baremPriceValue: '',
            selectedBarem : ''
        }
        this.baremChange = this.baremChange.bind(this);
        this.baremPrice = this.baremPrice.bind(this);
    }

    //barem araligi input
    baremChange(e){

        console.log(e.target.value)

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
                this.props.btnControl.baremSelectStatus = true;
                this.props.basketBtnVisible();

                //barem araligi girdiginde select ederken toplam fiyat da hesapla
                this.setState((prevState) => {
                    return {
                        baremPriceValue: getPrice.getAttribute("data-price"),
                        selectedBarem : !prevState.selectedBarem
                    }
                });
                let a = document.getElementsByClassName('barem');
                for (let i = 0; i < a.length; i++) {
                    a[i].classList.remove('baremChange');
                    getPrice.classList.add('baremChange');
                }
            }
            else{
                document.getElementsByClassName("barem")[i].classList.remove('baremChange');
                delete this.props.btnControl.baremSelectStatus;
                this.props.basketBtnVisible();

            }
        }
    }

    //barem araligi select
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

        this.props.btnControl.inputBaremStatus = true;
        this.props.basketBtnVisible();
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
                    <input className="myText"
                           placeholder="100"
                           value={this.state.baremValue}
                           onChange={ this.baremChange}/> Adet
                </div>

                <div className="totalPrice">
                    <h5>TOPLAM : { Number.parseFloat( this.state.totalPrice * this.state.baremPriceValue).toFixed(1) } TL</h5>
                </div>
            </div>
        );
    }
}

export default BaremCalc;