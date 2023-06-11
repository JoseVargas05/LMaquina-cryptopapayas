import React from 'react';
import Tilt from 'react-parallax-tilt';

import styles from '../styles';
import { allCards, portalPapaya1, cofre, calaca } from '../assets';


const Portal = ({ card, title, restStyles, cardRef, playerTwo, playerNumber, type }) => (
    <div className='flex flex-col items-center mb-2'>
        <p className={`${styles.normalText} mb-5 text-center text-3xl font-semibold`}>{"P" + playerNumber }</p>
        <Tilt>
            <div ref={cardRef} className={`${styles.cardContainer} ${restStyles}`}>
            <img className={`${styles.cardImg} ${type ? " w-[100px] ml-auto mr-auto": "w-[100%]"} `} src={type ?  type == "calaca" ? calaca: cofre : portalPapaya1} alt="ace_card"/>
            </div>
        </Tilt>
    </div>

);

export default Portal;
