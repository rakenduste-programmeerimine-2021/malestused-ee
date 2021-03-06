import "./CollagesCatalog.css"
import React, { useState } from 'react';
import HeartInMiddleCollage from "../images/Collages-catalog/BlackPicFrameWithHeartMiddle (1).png"
import ClassicCollageBlackFrame from "../images/Collages-catalog/BlackFrameClassic.png"
import HeartShapedCollage from "../images/Collages-catalog/NewDesign.png"
import CollageList from '../components/Collages-components/CollageList';
import FadeIn from "react-fade-in/lib/FadeIn";
import SelfDesign from "../components/Self-design-components/SelfDesign.js"
import { If, Else } from 'react-if';
import DesignService from "../components/Design-service/DesignService"

function CollagesCatalog(){
    const [selectedProduct, setSelectedProduct] = useState("");
    const [Continue, setContinue] = useState(false);
    const [Kujundusteenus, setKujundusteenus] = useState(false);
    const [IseKujundus, setIseKujundus] = useState(false);

    const CollageStyles = [
        {img: HeartInMiddleCollage, title: "Südamega kollaaž", price: 3.49, A3price: 6.99, id: 1, test: selectedProduct},
        {img: HeartShapedCollage, title: "Südame kujuline kollaaž", price: 3.49, A3price: 6.99, id: 2, test: selectedProduct},
        {img: ClassicCollageBlackFrame, title: "Klassikaline kollaaž", price: 2.99, A3price: 5.99, id: 3, test: selectedProduct},
    ];

    //Getting the selected product ID
    const setSelected=(data)=>{
        setSelectedProduct(data);
        
        if(data !== 3){
            setKujundusteenus(true);
            setIseKujundus(false);
            setContinue(false);
        }else{
            setContinue(true);
        }
    }

    //Once pressing "Kujundusteeus" button, show kujundusteenus "lehte"
    function funcKujundusteenus(){
        setKujundusteenus(true);
        setIseKujundus(false);
        setContinue(false);
    }

    function funcIseKujundus(){
        setIseKujundus(true);
        setKujundusteenus(false);
        setContinue(false);
    }

    function funcBackFromContinue(){
        setKujundusteenus(false);
        setIseKujundus(false);
        setContinue(false);
        setSelectedProduct("");
    }

    function funcBackFromKujundusteenus(){
        if(selectedProduct !== 3){
            setKujundusteenus(false);
            setIseKujundus(false);
            setContinue(false);
            setSelectedProduct("");
        }else{
            setKujundusteenus(false);
            setIseKujundus(false);
            setContinue(true);
        }
    }

    return(
        <div>
            <hr id="header-line" />

            {!Continue && IseKujundus && 
            
                <div>
                    <button id="navigation-button" style={{marginLeft: "64px", marginTop: "16px"}} onClick={funcBackFromContinue}>&larr; Tagasi</button>
                    <FadeIn>
                        <SelfDesign SelfDesignSelectedCollage={CollageStyles[selectedProduct-1]}></SelfDesign>
                    </FadeIn>
                </div>
        
            }

            {!Continue && Kujundusteenus && 

            <div>
                <FadeIn>
                    <button id="navigation-button" style={{marginLeft: "64px", marginTop: "16px"}} onClick={funcBackFromKujundusteenus}>&larr; Tagasi</button>
                    <DesignService SelectedProduct={selectedProduct} SelfDesignSelectedCollage={CollageStyles[selectedProduct-1]}/>
                    {/*<button id="button" style={{marginTop: "50px"}} onClick={funcBackFromKujundusteenus}>Tagasi</button>*/}
                </FadeIn>
            </div>
            
            }

            {Continue && 
                <div>
                    <FadeIn>
                        <button id="navigation-button" style={{marginLeft: "64px", marginTop: "16px"}} onClick={funcBackFromContinue}>&larr; Tagasi</button>

                        <h1 id="header">Kas kujundad kollaaži ise või kasutad kujundusteenust?</h1>
                        
                        <div className="center">
                            {/*eslint-disable-next-line*/ }
                            <If condition={selectedProduct == 3}>
                                <button id="button" style={{marginTop: "268px", width: "540px"}} onClick={funcIseKujundus}>Kujundan ise iseteeninduses</button>
                                <Else>
                                    
                                </Else>
                            </If>
                            <button id="button" style={{marginTop: "268px", width: "540px"}} onClick={funcKujundusteenus}>Soovin kujundusteenust</button>
                        </div>               
                    </FadeIn>
                </div>
            }

            {!Continue && !Kujundusteenus && !IseKujundus &&
                <div>
                    <FadeIn>
                        <h1 id="header">Kollaažide stiilid</h1>
                        <p id="description">Et alustada tellimust palun valige üks kollaaži stiil.</p>
                        
                        <CollageList collages={CollageStyles} selectedCollage={selectedProduct} funcSelect={setSelected}/>
                    </FadeIn>
                </div>
            }
        </div>
    )
}   

export default CollagesCatalog;