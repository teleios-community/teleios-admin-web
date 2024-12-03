import { CloseCircle } from 'iconsax-react';
import React from 'react';
import ReactModal from 'react-modal';
import styles from './style.module.css';

function CustomModal({
  title,
  isOpen,
  onRequestClose,
  children,
  shouldCloseOnOverlayClick = true,
  width = '536px',
  sideView = false,
  controls,
  ...rest
}: {
  title?: string;
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
  shouldCloseOnOverlayClick?: boolean;
  width?: string;
  sideView?: boolean;
  controls?: React.ReactNode;
} & ReactModal.Props) {
  React.useEffect(() => {
    // Check if modal is open and prevent body from scrolling
    if (typeof window !== 'undefined') {
      const body = document.body;

      if (isOpen) {
        // Disable scroll
        body.style.overflow = 'hidden';
        body.style.height = '100vh';
      } else {
        body.style.overflowY = 'auto';
        body.style.height = 'auto';
      }
    }
  }, [isOpen]);

  React.useEffect(() => {
    ReactModal.setAppElement('#root');
  }, []);

  const customStyles: ReactModal.Styles = {
    content: {
      top: sideView ? 0 : '50%',
      left: sideView ? 'revert' : '50%',
      right: sideView ? 0 : 'auto',
      bottom: 'auto',
      marginRight: sideView ? 0 : '-50%',
      transform: sideView ? 'none' : 'translate(-50%, -50%)',
      overflow: 'auto',
      width: sideView ? '85vw' : '900px',
      maxWidth: '90vw',
      padding: 0,
      height: sideView ? '100vh' : 'auto',
      maxHeight: sideView ? '100vh' : '95vh',
      backgroundColor: sideView ? '#FBFBFB' : '#fff',
      color: 'var(--black)',
      transition: 'all 0.2s ease-in-out',
      border: 'none',
      borderRadius: sideView ? 0 : 12,
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      overscrollBehavior: 'contain',
      zIndex: 20,
    },
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      // appElement={document.getElementById('modals')!}
      style={{
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        content: {
          ...customStyles.content,
          width: !isOpen ? 0 : sideView ? '85vw' : width || customStyles.content?.width,
          opacity: isOpen ? 1 : 0,
        },
        overlay: customStyles.overlay,
      }}
      closeTimeoutMS={200}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      {...rest}
    >
      {/* Header */}
      <div
        className={styles.modalTitleContainer}
        style={{
          justifyContent: title ? 'space-between' : 'flex-end',
        }}
      >
        {title && <h1>{title}</h1>}
        <button
          onClick={onRequestClose}
          style={{
            backgroundColor: 'transparent',
          }}
        >
          <CloseCircle />
        </button>
      </div>

      {/* Body */}
      <div className='p-4'>{children}</div>

      {controls && (
        <>
          {/* Divider */}
          <div className='w-full bg-[#F0F2F5] h-[1px] mt-5' />

          {/* Controls */}
          <div className='px-4 py-2'>{controls}</div>
        </>
      )}
    </ReactModal>
  );
}

export default CustomModal;
