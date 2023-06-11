import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGlobalContext } from '../context';
import { CustomButton, PageHOC } from '../components';
import styles from '../styles';

const JoinBattle = () => {
  const navigate = useNavigate();
  const { contract, gameData, setShowAlert, setBattleName, setErrorMessage, walletAddress } = useGlobalContext();

  useEffect(() => {
    if (gameData?.activeBattle?.battleStatus === 1) navigate(`/battle/${gameData.activeBattle.name}`);
  }, [gameData]);

  const handleClick = async (battleName) => {
    setBattleName(battleName);

    try {
      await contract.joinBattle(battleName);

      setShowAlert({ status: true, type: 'success', message: `Uniendose a la batalla: ${battleName}` });
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (
    <>
      {gameData.pendingBattles.length > 0 && <h2 className={styles.joinHeadText}>Batallas disponibles:</h2>}

      <div className={styles.joinContainer}>
        {gameData.pendingBattles.length
          ? gameData.pendingBattles
            .filter((battle) => !battle.players.includes(walletAddress) && battle.battleStatus !== 1)
            .map((battle, index) => (
              <div key={battle.name + index} className={styles.flexBetween}>
                <p className={styles.joinBattleTitle+ " mr-2"}>{index + 1}. {battle.name}</p>
                <CustomButton
                  title="¡Pelear!"
                  handleClick={() => handleClick(battle.name)}
                />
              </div>
            )) : (
              <p className={styles.joinLoading}>No hay battallas... Espera unos segundos y recarga la página para ver nuevas batallas.</p>
          )}
      </div>

      <p className={styles.infoText} onClick={() => navigate('/create-battle')}>
        O crea una nueva batalla
      </p>
    </>
  );
};

export default PageHOC(
  JoinBattle, 
  <>Únete a <br /> una batalla</>,
  <>Únete a batallas ya existentes</>,
);
