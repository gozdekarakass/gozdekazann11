import React, { Component } from "react";

class ChangeFilter extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            newProductArry : [],
            imagesList: [],
            newSizeArry: [],
            colorFilter : '',
            sizeFilter : '',
            filtered : null
        };
        this.changeFilterColor = this.changeFilterColor.bind(this);
        this.changeSize = this.changeSize.bind(this);
        this.filterAll = this.filterAll.bind(this);
    }

    //color change
    changeFilterColor(e){
        this.state.filtered = null;
        const sizeName = e.target.getAttribute("data-name");
        const inputs = document.querySelectorAll(".sizeInput");

        //color her change oldugunda size checked sifirlanmali
        for (var i = 0; i < inputs.length; i++) { inputs[i].checked = false; }

        for (var i = 0; i < inputs.length; i++) { inputs[i].setAttribute("disabled",true); }

        const newProductArry = this.props.data.productVariants.filter((item) => {
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
        this.filterAll();

        //her renk degistiginde
        delete this.props.btnControl.sizeStatus;
        this.props.btnControl.colorStatus = true;
        this.props.basketBtnVisible()
    }

    changeSize(e){
        this.state.filtered = null;
        const size = e.target.getAttribute("data-name");

        if(!e.target.checked){
            this.state.sizeFilter = size;
            //her size degistiginde button kontrol
            this.props.btnControl.sizeStatus = true;
            this.props.basketBtnVisible();
        }
        else{
            this.state.sizeFilter = null;
        }
        this.filterAll();
    }

    filterAll(){
        this.state.imagesList = [];
        if(this.state.filtered == null)
            this.state.filtered = this.props.data.productVariants.filter((item) => {
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
                });
            });
        document.getElementsByClassName("bigImages")[0].src = "";
        document.getElementsByClassName("bigImages")[0].src = document.getElementsByClassName("sImages")[0].src;
    }

    render(){
        const { data } = this.state;
        return(
            <div>
                <div className="product-name">
                    <span className="productTitle">{data.productTitle}</span>
                </div>
                <hr/>
                <div>
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
                </div>
            </div>
        );
    }
}

export default ChangeFilter;