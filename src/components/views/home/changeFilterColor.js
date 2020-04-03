import React, { Component } from "react";
import productData from '../../../data/productdata.json';

class ChangeFilterColor extends Component{

    constructor(props) {
        super(props);
        this.state = {
            newProductArry : [],
            colorFilter : '',
            sizeFilter : '',
            filtered : null,
            a : false
        }
        this.changeFilterColor = this.changeFilterColor.bind(this);
    }

    changeFilterColor(e){
        this.state.filtered = null;
        const sizeName = e.target.getAttribute("data-name");
        const inputs = document.querySelectorAll(".sizeInput");

        //color her change oldugunda size checked sifirlanmali
        for (var i = 0; i < inputs.length; i++) { inputs[i].checked = false; }

        for (var i = 0; i < inputs.length; i++) { inputs[i].setAttribute("disabled",true); }

        const newProductArry = productData.productVariants.filter((item) => {
            return item.attributes[1].value === sizeName
        });

        //var first = true;
        newProductArry.map((item) => {
            for (var i = 0; i < inputs.length; i++) {
                if(item.attributes[0].value === inputs[i].value)
                //renk secildiginde beden icin ilkini checked
                //if(first)
                //inputs[i].checked = true;
                //first = false;
                    inputs[i].removeAttribute("disabled");
                    inputs[i].setAttribute("data-id", item.id);
            }
        });

        this.state.colorFilter = sizeName;
        this.state.sizeFilter = null;
        this.state.filtered = newProductArry;
        this.props.filterAll();
        this.props.basketBtnVisible(this.state.a = true);
    }


    render(){
        return(
            <div className="attributes">
                {
                    productData.selectableAttributes.map((item,i) => (
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
                                                    <label for="html"
                                                           className="color"
                                                           data-name={itemRadio}
                                                           a={this.state.a}
                                                           onClick={ this.changeFilterColor }
                                                           htmlFor={itemRadio+i}>
                                                        {itemRadio}
                                                    </label>
                                                    :
                                                    <label for="html" className="size" onClick={ this.props.changeSize.bind(this)} data-name={itemRadio}  htmlFor={itemRadio+i}>
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
        )
    }
}
export default ChangeFilterColor;