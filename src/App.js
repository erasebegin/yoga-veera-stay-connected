import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import TEXT from './text';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './global.css';
import countryList from './countryList';
import ThankYouModal from './ThankYouModal';

// IMAGES
import sadhguruDesktop from './images/sadhguru_desktop.webp';
import sadhguruMobile from './images/sadhguru_mobile.jpg';
import wheatMountain from './images/wheat-mountain.svg';
import divider from './images/divider-yoga.svg';
import flyingYogi from './images/footer-flying-yogi.jpg';

function App() {
  const parseParams = (querystring) => {
    // parse query string
    const params = new URLSearchParams(querystring);

    const obj = {};

    // iterate over all keys
    for (const key of params.keys()) {
      if (params.getAll(key).length > 1) {
        obj[key] = params.getAll(key);
      } else {
        obj[key] = params.get(key);
      }
    }

    return obj;
  };

  const queryData = parseParams(window.location.search);
  const text = TEXT[queryData.lang] || TEXT.en;
  const [country, setCountry] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `https://v1.nocodeapi.com/erasebegin/google_sheets/${process.env.REACT_APP_GOOGLE_SHEETS_KEY}?tabId=emails`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify([[name, email, country]])
        }
      );
      await response.json();
      setLoading(false);
      setEmail('');
      setName('');
      setCountry('');
      setShowModal(true);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const lng = queryData?.lang;
    if (lng === 'es' || lng === 'it') {
      setShowForm(false);
    }
  }, []);

  return (
    <>
      <MainContainer
        $bannerImageDesktop={sadhguruDesktop}
        $bannerImageMobile={sadhguruMobile}
        $lang={queryData?.lang}
      >
        <ThankYouModal
          modalOpen={showModal}
          setModalOpen={setShowModal}
          text={text}
        />
        <header>
          <Col lg={6} md={8} sm={9} xs={12} className="header-body">
            <h1>{text.h1}</h1>
            <h3>{text.quote}</h3>
            <a
              href={showForm ? '#email-form' : '#ie-section'}
              className="main-button"
            >
              {text.btn1}
            </a>
          </Col>
        </header>
        <main className="col-md-8 mx-auto">
          <img
            src={wheatMountain}
            alt="outline of a mountain behind a stem of wheat"
            className="wheat-mountain"
          />
          <div className="text-block">
            <p>{text.p1}</p>
            <p>{text.p2}</p>
            <p>{text.p3}</p>
          </div>
          {showForm && (
            <>
              <h2>{text.h2}</h2>
              <img
                src={divider}
                alt="leaf-print page divider"
                className="divider"
              />
              <Form onSubmit={handleSubmit} id="email-form">
                <Row className="form-inputs">
                  <Col xs={12} md={4} className="my-2">
                    <Form.Control
                      type="text"
                      placeholder={text.form1}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Col>
                  <Col xs={12} md={4} className="my-2">
                    <Form.Control
                      type="email"
                      placeholder={text.form2}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Col>
                  <Col xs={12} md={4} className="my-2">
                    <Form.Control
                      as="select"
                      onChange={(e) => setCountry(e.target.value)}
                      value={country}
                    >
                      <option value={text.form3}>{text.form3}</option>
                      {countryList.map((country) => (
                        <option value={country}>{country}</option>
                      ))}
                    </Form.Control>
                  </Col>
                </Row>
                <Row>
                  <Col className="d-flex justify-content-center my-3">
                    <Button type="submit" disabled={loading}>
                      {text.btn2}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </>
          )}
          <h2>{text.h3}</h2>
          <img
            src={divider}
            alt="leaf-print page divider"
            className="divider"
          />
          <div className="text-block">
            <p dangerouslySetInnerHTML={{ __html: text.p4 }} />
            <p>{text.p5}</p>
            <p>{text.p6}</p>
            <div className="download-buttons">
              <a href={text.link1} className="main-button">
                {text.btn3}
              </a>
              <a href={text.link2} className="main-button">
                {text.btn4}
              </a>
            </div>
          </div>
          <h2 id="ie-section">{text.h4}</h2>
          <img
            src={divider}
            alt="leaf-print page divider"
            className="divider"
          />
          <div className="text-block">
            <p>{text.p5}</p>
            <a
              href={
                text.link3
                  ? text.link3
                  : 'https://isha.sadhguru.org/inner-engineering-online'
              }
              target="_blank"
              rel="noopener noreferrer"
              className="main-button button-bottom"
            >
              {text.btn1}
            </a>
          </div>
        </main>
      </MainContainer>
      <img
        src={flyingYogi}
        alt="tapestry depicting flying yogi"
        className="bottom-banner mt-4"
      />
    </>
  );
}

const MainContainer = styled(Container)`
  padding: 0;
  width: 100%;
  font-family: 'Noto Sans', sans-serif;

  @media (max-width: 700px) {
    margin: 0;
    max-width: 100%;
  }
  .divider {
    margin: 2rem 0;
  }

  .main-button {
    background: var(--orangeDark3);
    padding: 0.625rem 1.875rem;
    border-radius: 10px;
    color: white;
    font-size: 1.25rem;
    font-family: 'Noto Sans', sans-serif;
    font-weight: 700;

    &:hover {
      text-decoration: none;
      opacity: 0.9;
    }
  }

  header {
    min-height: 500px;
    background-image: url(${(props) => props.$bannerImageDesktop});
    max-width: 1440px;

    @media (max-width: 1000px) {
      background-position: 50% 0%;
    }
    @media (max-width: 700px) {
      background-image: url(${(props) => props.$bannerImageMobile});
      background-position: 50% -60%;
      background-repeat: no-repeat;
      min-height: 800px;
      display: flex;
      align-items: flex-end;
      background-color: #f8f5f0;
      padding-bottom: 2rem;
    }

    .header-body {
      width: 50%;
      padding: 4vw 0 0 3vw;

      @media (max-width: 700px) {
        padding: 4vw 2rem 3vw;
        width: 100%;
      }

      h1 {
        font-family: 'Noto Serif', serif;
        font-weight: 700;
        font-size: 3.375rem;
        line-height: 3.75rem;

        @media (max-width: 1000px) {
          font-size: 2rem;
          line-height: 2.5rem;
        }

        @media (max-width: 700px) {
          font-size: 1.5rem;
          line-height: 2rem;
        }
      }

      h3 {
        font-family: 'Noto Sans', sans-serif;
        font-weight: 700;
        font-size: 1.25rem;
        color: var(--orangeDark2);
        padding: 2rem 0;
        line-height: 2rem;
      }
    }
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;

    .wheat-mountain {
      margin: 3rem 0;
    }

    .text-block {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding-bottom: 3rem;

      p {
        font-family: 'Noto Sans', sans-serif;
        font-weight: 400;
        font-size: 1.125rem;
        padding-bottom: 2rem;
        line-height: 1.7rem;
      }
    }

    h2 {
      color: var(--blueDark);
      font-family: 'Noto Serif', serif;
      font-weight: 700;
      font-size: 1.875rem;
      line-height: 2.7rem;
      text-align: center;
      margin-bottom: 1rem;

      @media (max-width: 700px) {
        font-size: 1.5rem;
        line-height: 2.5rem;
      }
    }
  }

  form {
    margin: 4rem 0;

    .form-inputs {
      display: flex;
      align-items: center;

      ${(props) =>
        props.$lang === 'ru' &&
        css`
          input,
          select {
            max-width: 90%;
            margin: auto;
          }
        `}
    }

    .btn {
      background-color: var(--orangeDark3);
      border-radius: 10px;
      padding: 0.625rem 1.875rem;
      font-size: 1.25rem;
      font-family: 'Noto Sans', sans-serif;
      font-weight: 700;
      border: none;
      margin-top: 2rem;

      ${(props) =>
        props.$lang === 'ru' &&
        css`
          font-size: 1rem;
        `}
    }
  }

  .download-buttons {
    display: flex;
    width: 100%;
    justify-content: center;
    margin: 2rem 0 2rem;

    a {
      margin-left: 1rem;

      &:first-child {
        margin-left: 0;
      }
      
      @media (max-width: 600px) {
        margin: 0;
        margin-bottom: 1rem;
      }
    }

    ${(props) =>
      props.$lang === 'ru' &&
      css`
        a {
          font-size: 1rem;
        }
      `}

    @media (max-width: 600px) {
      flex-direction: column;
      align-items: center;
    }
  }

  .button-bottom {
    align-self: center;
  }
`;

export default App;
