/* eslint-disable react/jsx-no-bind */
import { useState, useEffect } from 'react';
import Modal from 'react-modal';

import styles from '../styles';
import CustomButton from './CustomButton';
import { useGlobalContext } from '../context';
import { GetParams, SwitchNetwork } from '../utils/onboard.js';

const OnboardModal = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { updateCurrentWalletAddress } = useGlobalContext();
  const [step, setStep] = useState(-1);

  async function resetParams() {
    const currentStep = await GetParams();
    setStep(currentStep.step);
    setIsOpen(currentStep.step !== -1);
  }

  useEffect(() => {
    resetParams();

    window?.ethereum?.on('chainChanged', () => {
      resetParams();
    });

    window?.ethereum?.on('accountsChanged', () => {
      resetParams();
    });
  }, []);

  const generateStep = (st) => {
    switch (st) {
      case 0:
        return (
          <>
            <p className={styles.modalText}>
              ¡No has instalado tu Core Wallet!
            </p>
            <CustomButton
              title="Descagar Core"
              handleClick={() => window.open('https://core.app/', '_blank')}
            />
          </>
        );

      case 1:
        return (
          <>
            <p className={styles.modalText}>
              ¡No te has conectado a tu cuenta de Core Wallet!
            </p>
            <CustomButton
              title="Conectar wallet"
              handleClick={updateCurrentWalletAddress}
            />
          </>
        );

      case 2:
        return (
          <>
            <p className={styles.modalText}>
              Estás en una red diferente. Cambie a Fuji C-Chain.
            </p>
            <CustomButton title="Cambiar" handleClick={SwitchNetwork} />
          </>
        );

      case 3:
        return (
          <>
            <p className={styles.modalText}>
              Oops, no tienes tokens AVAX en tu cuenta
            </p>
            <CustomButton
              title="Obtener algunos tokens de prueba"
              handleClick={() => window.open('https://faucet.avax.network/', '_blank')}
            />
          </>
        );

      default:
        return <p className={styles.modalText}>Good to go!</p>;
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      className={`absolute inset-0 ${styles.flexCenter} flex-col ${styles.glassEffect}`}
      overlayClassName="Overlay"
    >
      {generateStep(step)}
    </Modal>
  );
};

export default OnboardModal;
