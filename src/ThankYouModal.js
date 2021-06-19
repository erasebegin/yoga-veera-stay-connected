import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';

export default function Modal({ modalOpen, setModalOpen, text }) {
  const close = (e) => {
    if (e.target.classList.contains('outer-container')) {
      setModalOpen(false);
    }
  };

  return (
    <Container
      modalOpen={modalOpen}
      className="outer-container"
      onClick={(e) => close(e)}
    >
      <div className="modal-body">
        <button onClick={() => setModalOpen(false)} className="close-button">
          <FaTimes />
        </button>
        <div className="modal-text">
          <h1>{text.thanks1 || ''}</h1>
          <p>
            {text.thanks2 || ''}
            <br />
            <br />
            <span className="icon">💌</span>
          </p>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 50;
  opacity: ${(props) => (props.modalOpen ? '1' : '0')};
  pointer-events: ${(props) => (props.modalOpen ? 'initial' : 'none')};
  transition: opacity 400ms ease-in-out;
  text-align: center;

  .modal-body {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--offWhite);
    padding: 3rem;
    border-radius: 5px;

    @media (max-width: 700px) {
      padding: 2rem 1rem;
    }

    .modal-text {
      max-width: 350px;
    }

    .close-button {
      position: absolute;
      right: 0;
      top: 0;
      padding-top: 1em;
      padding-right: 1em;
      background: none;
      border: none;
      font-size: 1.2rem;
      cursor: pointer;
    }

    h1 {
      font-family: 'Merriweather', serif;
      font-weight: 600;
      letter-spacing: 0.05rem;
      font-size: 2rem;
      margin: 0;
      margin-bottom: 1.5rem;
      line-height: 3.1rem;
      color: var(--blueDarker);

      @media (max-width: 700px) {
        text-align: center;
        font-size: 1.4rem;
      }
    }

    .icon {
      font-size: 3rem;
    }

    p {
      line-height: 1.7rem;
      font-size: 1.3rem;

      @media (max-width: 700px) {
        text-align: center;
        font-size: 1rem;
      }

      a {
        color: blue;
      }
    }
  }
`;
