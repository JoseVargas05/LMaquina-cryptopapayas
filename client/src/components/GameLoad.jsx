import React from 'react';
import { useNavigate } from 'react-router-dom';

import CustomButton from './CustomButton';
import { useGlobalContext } from '../context';
import { player01, player02 } from '../assets';
import { imgProfile, imgProfile2} from '../assets';
import styles from '../styles';

const GameLoad = () => {
  const { walletAddress } = useGlobalContext();
  const navigate = useNavigate();

  return (
    <div className={`${styles.flexBetween} ${styles.gameLoadContainer}`}>
      {/*<div className={styles.gameLoadBtnBox}>
        <CustomButton
          title="Choose Battleground"
          handleClick={() => navigate('/battleground')}
          restStyles="mt-6"
        />
      </div>*/}

      <div className={`flex-1 ${styles.flexCenter} flex-col`}>
        <h1 className={`${styles.headText} text-center mb-5`}>
          Esperando oponentes<br /> dignos ...
        </h1>
        {/*<p className={styles.gameLoadText}>
          Protip: while you're waiting, choose your preferred battleground
        </p>*/}
        <div className={styles.gameLoadPlayersBox}>

          <div className={`${styles.flexCenter} flex-col m-3`}>
            <img src={walletAddress == '0x48186aF39A50BEee657d9955D60AD8a8A5fBc418' ? imgProfile : imgProfile2} className={styles.gameLoadPlayerImg} />
            <p className={styles.gameLoadPlayerText}>
              {walletAddress ? walletAddress.slice(0, 30) :  "??????????"}
            </p>
          </div>

          <div className={`${styles.flexCenter} flex-col m-3`}>
            <img src={walletAddress == '0x48186aF39A50BEee657d9955D60AD8a8A5fBc418' ? imgProfile : imgProfile2} className={styles.gameLoadPlayerImg} />
            <p className={styles.gameLoadPlayerText}>??????????</p>
          </div>

          <div className={`${styles.flexCenter} flex-col m-3`}>
            <img src={walletAddress == '0x48186aF39A50BEee657d9955D60AD8a8A5fBc418' ? imgProfile : imgProfile2} className={styles.gameLoadPlayerImg} />
            <p className={styles.gameLoadPlayerText}>??????????</p>
          </div>

          {/*<div className={`${styles.flexCenter} flex-col m-3`}>
            <img src={walletAddress == '0x48186aF39A50BEee657d9955D60AD8a8A5fBc418' ? imgProfile : imgProfile2} className={styles.gameLoadPlayerImg} />
            <p className={styles.gameLoadPlayerText}>??????????</p>
          </div>

          <div className={`${styles.flexCenter} flex-col m-3`}>
            <img src={walletAddress == '0x48186aF39A50BEee657d9955D60AD8a8A5fBc418' ? imgProfile : imgProfile2} className={styles.gameLoadPlayerImg} />
            <p className={styles.gameLoadPlayerText}>??????????</p>
          </div>

          <div className={`${styles.flexCenter} flex-col m-3`}>
            <img src={walletAddress == '0x48186aF39A50BEee657d9955D60AD8a8A5fBc418' ? imgProfile : imgProfile2} className={styles.gameLoadPlayerImg} />
            <p className={styles.gameLoadPlayerText}>??????????</p>
          </div>*/}

        </div>

        <div className="mt-10">
          <p className={`${styles.infoText} text-center mb-5`}>O</p>

          <CustomButton
            title="Únete a otras batallas"
            handleClick={() => navigate('/join-battle')}
          />
        </div>
      </div>
    </div>
  );
};

export default GameLoad;
