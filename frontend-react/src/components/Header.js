import "./Header.css"
import { Link } from "react-router-dom"
import Logo from "../LogoTest.PNG"
import Cross from "../images/icons/cross.svg"
import History from "./History"
import CartItems from "./CartItems"
import Login from "./Login"

import { useState, useReducer } from "react";
//import Account from "../images/icons/account.svg"

function Navbar(props){

    const [products, setProducts] = useState([]);
    const [test, setTest] = useState(false);

    //Used to force cart to update when new product added
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    //CART
    function CartToggleOn(){
        //Delete previous array
        products.splice(0, 20);

        //Read products from local storage and push them to array
        for (var i = 0; i < 20; i++) {
            const Item = "Product" + i;
            const output = JSON.parse(localStorage.getItem(Item));

            if(output !== null){
                products.push(output);
            }
        }

        //If products is empty
        if (products[0] == null) {
            setTest(false);
        }else{
            forceUpdate();
            setTest(true);
        }

        //Show Cart
        document.getElementById("cart-overlay").style.width = "600px";
        document.getElementById("exit-cart").style.marginRight = "35px";
        //Need if because otherwise might get weird react errors
        if (document.getElementById('bottom-button') ){
            document.getElementById('bottom-button').style.marginRight = "50%";
        }
    }

    function CartToggleOff(){
        document.getElementById("cart-overlay").style.width = "0px";
        document.getElementById("exit-cart").style.marginRight = "-635px";
        if (document.getElementById('bottom-button') ){
            document.getElementById('bottom-button').style.marginRight = "-50%";
        }
    }

    //ACCOUNT
    function AccountToggleOn(){
        document.getElementById("account-overlay-background").style.display = "block";
    }

    function AccountToggleOff(){
        document.getElementById("account-overlay-background").style.display = "none";
    }

    //Redirect to kollaažid
    function RedirectToCollagesCatalog(){
        History.push('/kollaažid');
        CartToggleOff();
    }

    //Redirect to Checkout
    function RedirectToCheckout(){
        History.push('/tellimus');
        CartToggleOff();
    }

    return(
        <div>
            <div className="header">
                <Link to="/">
                    <img onClick={CartToggleOff} id="logo" src={Logo} alt="Logo" />
                </Link>

                <div className="header-buttons">
                    <Link to="/kollaažid">
                        <a onClick={CartToggleOff}>Kollaazid</a>
                    </Link>

                    <Link to="/meist">
                        <a onClick={CartToggleOff}>Meist</a>
                    </Link>
                    
                    <a onClick={CartToggleOn}>Ostukorv</a>

                    <a onClick={AccountToggleOn}>Konto</a>
					
					<Link to="/register">
                        <a onClick={CartToggleOff}>Register</a>
                    </Link>                                      
                    {/* //Ilmselt peaks, logini voi registeri kohugi mujale panema, et müra veits vähemaks headeris  */}
                    {props.user ?
                    <Link to="/login"><a onClick={CartToggleOff}>{props.user.firstName} </a></Link>:
                    <Link to="/login"><a onClick={CartToggleOff}>Log in</a></Link>
                    }
                    
                </div>
                
            </div>

            {/* Shopping cart overlay */}
            <div id="cart-overlay">
                <div id="cart-header">Ostukorv</div>
                <img id="exit-cart" src={Cross} alt="Lahkuge ostukorvist" onClick={CartToggleOff}></img>
                <hr class="cart-underline" />


                {!test && 

                  <div onClick={RedirectToCollagesCatalog} className="cart-empty">
                      <p>Hmm...Tundub et teie ostukorv on tühi 🤔</p>
                      <p>Ei tea kust kollaaže leida? Vajuta siia</p>
                  </div>
                }

                {test && 
                <div>
                    <div id="cart-item">
                        <CartItems items={products}/>
                    </div>
                    
                    <hr style={{margin: "0px", border: "1px solid white"}} />
                    
                    <button id="bottom-button" onClick={RedirectToCheckout}>Vormista tellimus</button>
                </div>
                }

            </div>

            {/* Account Overlay */}
            <div id="account-overlay-background">
                <div id="account-overlay">
                    <div id="account-header">Sisse logimine</div>
                    
                    <img id="exit-account" src={Cross} alt="Lahkuge" onClick={AccountToggleOff}></img>

                    <Login />

                    {/*}
                    <div className="row">
                        <label for="email" id="account-label">Email</label>
                        <input type="text" id="email" placeholder="Teie email..."></input>
                    </div>
                    */}
                </div>
            </div>
        </div>
    );
}

export default Navbar;