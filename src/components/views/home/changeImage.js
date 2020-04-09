import React, { Component } from "react";

class ChangeImage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        };
        this.changeImage = this.changeImage.bind(this);
    }

    changeImage (e){
        let bigImages = document.getElementById("bigImages");
        bigImages.src = e.target.src
    }

    componentDidMount(){
        document.getElementsByClassName("bigImages")[0].src = "";
        document.getElementsByClassName("bigImages")[0].src = document.getElementsByClassName("sImages")[2].src;

        document.getElementById('number').value = document.getElementsByClassName("barem")[0].getAttribute("data-minimumquantity");
        document.getElementsByClassName("barem")[0].classList.add("baremChange");
    }

    render(){
        const { data } = this.state;
        return(
            <div>
                <div className="product-image">
                    <img id="bigImages" className="bigImages" src=""/>
                    <div className="images">
                        {
                            data.productVariants.map((attr) => {
                                return (
                                    <div className="smallImages">
                                        <img onClick={ this.changeImage }  className="sImages" src={ attr.images[0] }/>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default ChangeImage;