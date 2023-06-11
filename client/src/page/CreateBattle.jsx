import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../styles';
import { useGlobalContext } from '../context';
import { CustomButton, CustomInput, GameLoad, PageHOC } from '../components';

const CreateBattle = () => {
  const { contract, gameData, battleName, walletAddress, setBattleName, setErrorMessage } = useGlobalContext();
  const [waitBattle, setWaitBattle] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (gameData?.activeBattle?.battleStatus === 1) {
      navigate(`/battle/${gameData.activeBattle.name}`);
    } else if (gameData?.activeBattle?.battleStatus === 0) {
      setWaitBattle(true);
    }
  }, [gameData]);

  const handleClick = async () => {
    
    if (battleName === '' || battleName.trim() === '') return null;
    console.log(battleName);
    try {
      const response = await contract.createBattle(battleName);
      console.log("PASS");
      console.log(response);
      setWaitBattle(true);
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (
    <>
      {waitBattle && <GameLoad />}
      {walletAddress && <p className={`${styles.normalText} mt-5 mb-2`}>{"Crear una nueva batalla y espera a que otros jugadores se unan."}</p>}
      {
        
        walletAddress && <div className="flex flex-col mb-5 items-center">
            <CustomInput
              label="Battalla"
              placeHolder="Ingresa un nombre"
              value={battleName}
              handleValueChange={setBattleName}
            />
            <CustomButton
              title="Crear una Battalla"
              handleClick={handleClick}
              restStyles="mt-6"
            />
        </div>
      }
      {walletAddress && <p className={styles.infoText} onClick={() => navigate('/join-battle')}>
        O únete a batallas existentes
      </p>}
    </>
  );
};

export default PageHOC(
  CreateBattle,
);
