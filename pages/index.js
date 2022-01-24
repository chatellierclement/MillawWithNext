import * as React from "react";
import { Tab, Tabs, TabList, TabPanel, resetIdCounter } from "react-tabs";
import Link from "next/link";
import Card from "components/Card";
import Layout from "components/Layout";
import Image from 'next/image';
import { spacing, colors, typography } from "theme";

resetIdCounter();

export default function Index() {
  return (
      <>
      <Layout>
      <main>
        <div className="hero">
          <h1 className="title">Un espace de travail pour votre barreau</h1>

          <p className="description">
            Perdu dans les tâches administratives ? 
            Il est temps d'organiser votre barreau.
          </p>
          
          <p className={true ? "centered" : ""}>
            <button className="btn btn-primary" type="button">
              Demander un accès &rarr;
            </button>
          </p>
          
          <div className="screenshot-wrapper">
            <img
              className="screenshot"
              src="/hero.png"
              style={{
                maxWidth: "1140",
                maxHeight: "800"
              }}
            />
          </div>
        </div>

        <h1 className="subtitle">Pourquoi vous allez aimer Millaw ?</h1>

        <section className="feature">
          <div className="pure-g container">
            <div className="pure-u-1 pure-u-md-3-5 feature-left">
              <div className="lil-wrapper video">
                <video
                  width="386"
                  height="344"
                  className="video"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source
                    src="/videos/slash-menu.mp4"
                    type="video/mp4"
                  ></source>
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            <div className="pure-u-1 pure-u-md-2-5 feature-right">
              <h2>
                <em>Gérer vos permanences</em>
                Une nouvelle permanence ? Créez la rapidement et vous n'avez plus qu"à générer le planning.
              </h2>
            </div>
          </div>
        </section>

        <section className="feature">
          <div className="pure-g container reverse">
            <div className="pure-u-1 pure-u-md-2-5 feature-left">
              <h2>
                <em>Générer vos plannings.</em>
                Gagnez du temps en générant les plannings de vos permanences.
                Notre algorithme prend en charge divers critères pour qu'aucun avocat ne soit laisé. 
              </h2>
            </div>
            <div className="pure-u-1 pure-u-md-3-5 feature-right">
              <div className="lil-wrapper slack">
                <Image
                  src="/images/screenshot.png"
                  alt="Millaw screenshot"
                  width={558}
                  height={294}
                />
              </div>
            </div>
          </div>
        </section>

        {/* <section className="feature">
          <div className="pure-g container">
            <div className="pure-u-1 pure-u-md-3-5 feature-left">
              <img
                src="/images/dark-mode.png"
                style={{
                  maxWidth: "785px",
                  maxHeight: "615px",
                  marginLeft: "-32px",
                }}
              />
            </div>
            <div className="pure-u-1 pure-u-md-2-5 feature-right">
              <h2>
                <em>Structured &amp; instantly searchable.</em>
                app.
              </h2>
            </div>
          </div>
        </section> */}

        <section className="use-cases">
          <Tabs defaultIndex={1}>
            <div className="container">
              <TabList>
                <Tab disabled>
                  <h2 className="for">Millaw pour :</h2>
                </Tab>
                <Tab>
                  <h3>Barreau</h3>
                </Tab>
                <Tab>
                  <h3>Avocat</h3>
                </Tab>
              </TabList>

              <TabPanel />
              <TabPanel>
                <div className="pure-g">
                  <div className="pure-u-1 pure-u-md-3-5">
                    <h3 className="heading">Intégrations</h3>
                    <p className="content">
                    L'intégration de nouveaux avocats et de nouvelles permanences n'a jamais été aussi facile
                    </p>
                    <h3 className="heading">Planning</h3>
                    <p className="content">
                      Générer vos plannings pour le mois un par un ou d'un coup. Notre algorithme prend en charge divers critères pour qu'aucun avocat ne soit laisé 
                    </p>
                  </div>
                  <div className="pure-u-1 pure-u-md-2-5">
                    <p className="hero">
                      Millaw facilite grandement les tâches administratives liés aux permanences des avocats. N'attendez plus et gagnez en éfficacité.
                    </p>
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="pure-g">
                  <div className="pure-u-1 pure-u-md-3-5">
                    <h3 className="heading">Planning</h3>
                    <p className="content">
                      Votre planining et vos désignations sont à porté de main. Ne perdez pas de temps et retrouvez les informations dont vous avez besoin n'importe ou et n'importe quand.
                    </p>
                  </div>
                  <div className="pure-u-1 pure-u-md-2-5">
                    <p className="hero">
                    Millaw facilite la recherche des informations dont les avocats ont besoin pour répondre. Ils n'ont plus qu'à se concentrer sur leur intervention.
                    </p>
                  </div>
                </div>
              </TabPanel>
            </div>
          </Tabs>
        </section>

        <section className="container">
          <div className="pure-g cards">
            <div className="pure-u-1 pure-u-md-1-3">
              <Card
                title={
                  <>
                    &nbsp;Ultra-réactive
                  </>
                }
                description="Millaw est réactive, vraiment réactive. Nous avons travaillé dur pour garantir des temps de réponse de l'ordre de la milliseconde. Les informations se chargent instantanément, la recherche est rapide et la navigation dans l'interface utilisateur est rapide."
              />
            </div>
            <div className="pure-u-1 pure-u-md-1-3">
              <Card
                title={
                  <>
                    &nbsp;Mobile
                  </>
                }
                description="Téléchargez notre application pour iOS et Android pour retrouver votre planning depuis n'importe où"
              />
            </div>
            
            <div className="pure-u-1 pure-u-md-1-3">
               <Card
                title={
                  <>
                    &nbsp;Security &amp; permissions
                  </>
                }
                description=" and more…"
              /> 
            </div>
           
        
          </div>
        </section>

        <p className={true ? "centered" : ""}>
          <h3>Demandez un accès</h3>
          <p>Millaw est un espace de travail optimisé pour les barreaux ! Intégré, généré et restez organisé.</p>
            <button className="btn btn-primary" type="button">
              Demander un accès &rarr;
            </button>
          </p>
      </main>

      <style jsx>{`
          .centered {
            text-align: center;
          }
          .note {
            display: block;
            font-size: 0.75em;
            margin-top: 1em;
            color: ${colors.textSecondary};
          }
        .screenshot {
          max-width: 1140px;
          width: 90vw;
          box-shadow: 0px 10px 26px 0px rgba(0, 0, 0, 0.25);
          border-radius: 8px;
        }
        .screenshot-wrapper {
          padding: 24px 24px 48px;
          margin-bottom: 0;
          border-radius: 12px;
          max-width: 100vw;
          margin-left: 6em;
          margin-right: 6em;
        }
        `}
      </style>
      <style jsx>{`
        .feature {
          width: 95vw;
          padding: ${spacing.large};
          margin: ${spacing.xlarge} 0;
        }
        .feature-left,
        .feature-right {
          display: flex;
          align-items: center;
        }
        .feature-right {
          justify-content: flex-end;
        }
        .feature h2 {
          font-size: 2.2em;
          letter-spacing: 0.01em;
          font-weight: 500;
          line-height: 1.2;
        }
        .feature h2 em {
          font-weight: 600;
          font-style: normal;
          display: block;
          margin-bottom: 0.25em;
        }
        .lil-wrapper {
          display: inline-block;
          box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.1);
          background: white;
          padding: ${spacing.medium};
          border-radius: 8px;
        }
        img {
          display: block;
          width: 100%;
        }
        .lil-wrapper.video {
          padding-top: 0;
          padding-bottom: 0;
          border-left: 30px solid #edf2f7;
        }
        .lil-wrapper.slack {
          border-left: 30px solid ${colors.brand.marine};
        }
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .hero {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          background: linear-gradient(180deg, #fff, ${colors.lightGrey});
        }
        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
          font-weight: 600;
        }
        .subtitle {
          text-align: center;
          margin: 100px 0 -16px;
          line-height: 1.15;
          font-weight: 600;
        }
        .title,
        .description {
          text-align: center;
        }
        .description {
          line-height: 1.5;
          font-size: 1.5rem;
          max-width: 900px;
          color: ${colors.textSecondary};
        }
        .video {
          max-width: 100%;
        }
        .for {
          font-family: ${typography.fontFamilyMono};
          font-weight: 500;
          font-size: 1em;
          color: ${colors.textSecondary};
        }
        .use-cases {
          width: 100%;
          min-height: 520px;
          background: ${colors.lightGrey};
          margin: ${spacing.xlarge} 0;
          padding: ${spacing.xlarge} 0;
        }
        .content {
          margin-right: ${spacing.xlarge};
          margin-left: ${spacing.medium};
        }
        .heading {
          position: relative;
          margin-top: ${spacing.large};
          margin-left: ${spacing.medium};
        }
        .heading:before {
          content: "";
          display: block;
          width: 8px;
          height: 8px;
          border-radius: 2px;
          background: ${colors.almostBlack};
          position: absolute;
          left: -16px;
          top: 4px;
        }
        .cards {
          margin: 4em -1rem;
        }
        @media (max-width: 48em) {
          .title {
            font-size: 2.8rem;
            max-width: 90vw;
          }
          .subtitle {
            font-size: 2.1rem;
            max-width: 90vw;
          }
          .description {
            font-size: 1.3rem;
            max-width: 90vw;
          }
          .reverse .feature-left {
            order: 2;
          }
          .screenshot {
            width: 150vw;
          }
          .feature {
            padding: 0;
          }
          .feature-left,
          .feature-right {
            justify-content: center;
          }
          .content {
            margin-right: 0;
          }
        }
      `}</style>
      <style jsx global>
        {`
        body{
          background-color: white !important;
        }
          .pull-icon {
            margin-left: -4px;
          }
          .react-tabs {
            -webkit-tap-highlight-color: transparent;
          }
          .react-tabs__tab-list {
            margin: 0;
            padding: 0;
          }
          .react-tabs__tab {
            display: inline-block;
            border-bottom: 2px solid transparent;
            bottom: -1px;
            position: relative;
            list-style: none;
            padding: 6px 12px;
            cursor: pointer;
            user-select: none;
            text-align: center;
            white-space: nowrap;
          }
          .react-tabs__tab--selected {
            border-bottom: 2px solid ${colors.almostBlack};
          }
          .react-tabs__tab:focus {
            box-shadow: 0 0 5px hsl(208, 99%, 50%);
            border-color: hsl(208, 99%, 50%);
            outline: none;
          }
          .react-tabs__tab:focus:after {
            content: "";
            position: absolute;
            height: 5px;
            left: -4px;
            right: -4px;
            bottom: -5px;
            background: #fff;
          }
          .react-tabs__tab-panel {
            display: none;
          }
          .react-tabs__tab-panel--selected {
            display: block;
            padding: ${spacing.large} ${spacing.medium};
          }
          @media (max-width: 48em) {
            .react-tabs__tab {
              width: 50%;
            }
            .react-tabs__tab:first-child {
              display: none;
            }
          }
        `}
        </style>
      </Layout>
    </>
  );
}