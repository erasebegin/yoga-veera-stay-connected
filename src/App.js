import { useState, useEffect } from 'react';
import styled from 'styled-components';
import TEXT from './text';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './global.css';
import countryList from './countryList';

// IMAGES
import sadhguruDesktop from './images/sadhguru_desktop.webp';
import wheatMountain from './images/wheat-mountain.svg';
import divider from './images/divider-yoga.svg';
import android from './images/android.webp';
import apple from './images/apple.webp';
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
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const lng = queryData?.lang;
    if (lng === 'es' || lng === 'it' || lng === 'ru') {
      setShowForm(false);
    }
  }, []);

  return (
    <>
      <MainContainer bannerImageDesktop={sadhguruDesktop}>
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
                  <Col>
                    <Form.Control
                      type="text"
                      placeholder="Full Name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type="email"
                      placeholder="Email Address"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      as="select"
                      onChange={(e) => setCountry(e.target.value)}
                    >
                      {countryList.map((country) => (
                        <option value={country}>{country}</option>
                      ))}
                    </Form.Control>
                  </Col>
                </Row>
                <Row>
                  <Col className="d-flex justify-content-center my-3">
                    <Button type="submit" disabled={loading}>
                      Join Now
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
            <p>{text.p4}</p>
          </div>
          <div className="download-buttons">
            <a href="https://play.google.com/store/apps/details?id=com.ishafoundation.app&hl=en">
              <img
                src={android}
                alt="play store logo next to text that reads get it on google play"
              />
            </a>
            <a href="https://apps.apple.com/us/app/sadhguru-yoga-meditation/id537568757">
              <img
                src={apple}
                alt="apple logo next to text that reads download on the app store"
              />
            </a>
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
              href="https://isha.sadhguru.org/inner-engineering-online"
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

  .divider {
    margin: 2rem 0;
  }

  .main-button {
    background: var(--orangeDark3);
    font-size: 1.25rem;
    padding: 0.625rem 1.875rem;
    border-radius: 10px;
    color: white;
  }

  header {
    min-height: 500px;
    background-image: url(${(props) => props.bannerImageDesktop});
    max-width: 1440px;

    .header-body {
      width: 50%;
      padding: 4vw 0 0 3vw;

      h1 {
        font-family: 'Fedra Serif', serif;
        font-weight: 400;
        font-size: 3.375rem;
        line-height: 3.75rem;
      }

      h3 {
        font-family: 'Fedra Sans', sans-serif;
        font-weight: 500;
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
        font-family: 'Fedra Sans', sans-serif;
        font-weight: 400;
        font-size: 1.125rem;
        padding-bottom: 2rem;
        line-height: 1.7rem;
      }
    }

    h2 {
      color: var(--blueDark);
      font-family: 'Fedra Serif', serif;
      font-weight: 500;
      font-size: 1.875rem;
      line-height: 2.7rem;
      text-align: center;
      margin-bottom: 1rem;
    }
  }

  form {
    margin: 4rem 0;

    .form-inputs {
      display: flex;
      align-items: center;
    }

    .btn {
      background-color: var(--orangeDark3);
      border-radius: 10px;
      padding: 0.625rem 1.875rem;
      font-size: 1.25rem;
      font-family: 'Fedra Sans', sans-serif;
      font-weight: 600;
      border: none;
      margin-top: 2rem;
    }
  }

  .download-buttons {
    display: flex;
    gap: 1rem;
    margin-bottom: 3rem;
  }

  .button-bottom {
    align-self: center;
  }

  .bottom-banner {
    width: 100%;
  }
`;

export default App;
