import React from 'react';
import { useNavigate } from 'react-router-dom';

import Alert from './Alert';
import { useGlobalContext } from '../context';
import { logoDDos, logoBattles, papayaBack, imgProfile, imgProfile2} from '../assets';
import CustomButton from './CustomButton';
import styles from '../styles';

const PageHOC = (Component, description) => () => {
  const { showAlert, updateCurrentWalletAddress, walletAddress } = useGlobalContext();
  const navigate = useNavigate();

  return (
    <div className={styles.hocContainer} >
      {showAlert?.status && <Alert type={showAlert.type} message={showAlert.message} />}
      {walletAddress && <div className='flex absolute top-[50px] left-[30px] items-end'>
        {walletAddress == '0x48186aF39A50BEee657d9955D60AD8a8A5fBc418' ? <img src={imgProfile} alt="papayaBack" className={"mr-4 max-w-[80px] rounded-full"}/>: <img src={imgProfile2} alt="papayaBack" className={"mr-4 max-w-[80px] rounded-full"}/>}
        <p className={`${styles.normalText} mb-5`}>{walletAddress}</p>
      </div>}
      <img src={papayaBack} alt="papayaBack" className={"mt-4 absolute bottom-0"}/>
      <img src={papayaBack} alt="papayaBack" className={"mt-4 rotate-180 absolute top-[-20px] right-0"}/>
      <div className={styles.hocContentBox + " bg-gradient-to-t from-orange-400 via-orange-600 to-orange-600"}>
      
        <div className={styles.hocBodyWrapper}>
          <img src={logoBattles} alt="logoBattles" className={"mt-4 w-[384.4px] mb-5"}/>
          {!walletAddress && <>
              <p className={`${styles.normalText} mb-5`}>{description}</p>
              <CustomButton
                  title="Conectar wallet"
                  handleClick={updateCurrentWalletAddress}/>
          </>}
          <Component />
        </div>

        <img src={logoDDos} alt="logo" className={styles.hocLogo} onClick={() => navigate('/')} />
      </div>
    </div>
  );
};

export default PageHOC;
