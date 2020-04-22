import React, { Component } from "react";

class BaremCalc extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            totalPrice : '',
            baremValue: 0,
            baremPriceValue: '',
            selectedBarem : ''
        }
        this.baremChange = this.baremChange.bind(this);
        this.baremPrice = this.baremPrice.bind(this);
        this.increaseValue = this.increaseValue.bind(this);
        this.decreaseValue = this.decreaseValue.bind(this);
    }

    //barem araligi input
    baremChange(value){
        this.setState({
            baremValue: value,
            totalPrice: this.state.baremValue
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
            if( value >= minimumQuantity && value <= BigInt(maximumQuantity) ){
                document.getElementsByClassName("barem")[i].classList.add('baremChange');
                this.props.btnControl.inputBaremStatus = true;
                this.props.btnControl.baremSelectStatus = true;
                this.props.basketBtnVisible();
            }
            else{
                document.getElementsByClassName("barem")[i].classList.remove('baremChange');
            }
        }
    }

    //barem araligi select
    baremPrice(e){
        document.getElementById('number').value =  e.target.getAttribute("data-minimumquantity");
        document.getElementById('total').textContent = e.target.getAttribute("data-minimumquantity") * e.target.getAttribute("data-price");

        let a = document.getElementsByClassName('barem');
        for (let i = 0; i < a.length; i++) {
            a[i].classList.remove('baremChange')
        }

        e.target.classList.add('baremChange');

        this.props.btnControl.inputBaremStatus = true;
        this.props.btnControl.baremSelectStatus = true;
        this.props.basketBtnVisible();
    }

    increaseValue() {
        var value = parseInt(document.getElementById('number').value, 10);
        value = isNaN(value) ? 0 : value;
        value++;
        document.getElementById('number').value = value;

        var mq = document.getElementsByClassName("barem")[0].getAttribute("data-minimumquantity");

        if(value < mq){
            delete this.props.btnControl.inputBaremStatus;
            delete this.props.btnControl.baremSelectStatus;
            this.props.basketBtnVisible();
            document.getElementsByClassName("baremError")[0].style.display = 'block';
        }else {
            this.baremChange(value);
            document.getElementsByClassName("baremError")[0].style.display = 'none';
        }

        var mqchange = document.getElementsByClassName("baremChange")[0].getAttribute("data-minimumquantity");
        this.setState({
            baremPriceValue: value,
            totalPrice: mqchange
        });
    }

     decreaseValue() {
        var value = parseInt(document.getElementById('number').value, 10);
        value = isNaN(value) ? 0 : value;
        value < 1 ? value = 1 : '';
        value--;
        document.getElementById('number').value = value;

         var mq = document.getElementsByClassName("barem")[0].getAttribute("data-minimumquantity");

         if(value < mq){

             delete this.props.btnControl.inputBaremStatus;
             delete this.props.btnControl.baremSelectStatus;
             this.props.basketBtnVisible();
             document.getElementsByClassName("baremError")[0].style.display = 'block';
             document.getElementsByClassName("barem")[0].classList.remove('baremChange');
         }else {

             this.baremChange(value);
             document.getElementsByClassName("barem")[0].classList.add('baremChange');
             document.getElementsByClassName("baremError")[0].style.display = 'none';
         }

         var mqchange = document.getElementsByClassName("baremChange")[0].getAttribute("data-minimumquantity");
         this.setState({
             baremPriceValue: value,
             totalPrice: mqchange
         });
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
                <div class="baremError">Girilen adet barem aralığında değil.</div>
                <div className="piece">
                    Adet
                    <div class="value-button" id="decrease" onClick={ this.decreaseValue } value="Decrease Value">-</div>
                    <input type="number" id="number" value={this.state.baremValue} />
                    <div class="value-button" id="increase" onClick={ this.increaseValue } value="Increase Value">+</div>
                </div>

                <div className="totalPrice">
                    <h5>TOPLAM : <span id="total">{ Number.parseFloat( this.state.totalPrice * this.state.baremPriceValue).toFixed(1) }</span> TL</h5>
                </div>
            </div>
        );
    }
}

export default BaremCalc;