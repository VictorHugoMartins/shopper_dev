import React from "react";

import styles from "./pageStructure.module.scss";
import LocalNavBar from "~/components/NavBar/NavBar";
import Flexbox from "~/components/Flexbox/Flexbox";
import Head from 'next/head'

interface PageStructureProps {
  children: React.ReactNode;
  title: string;
}

const PageStructure: React.FC<PageStructureProps> = ({
  children,
  title,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Flexbox flexDirection="row" justify="space-between">
        <main className={`${styles.pageContent} `} >
          <div className={`${styles.navBarContent}`}>
            <LocalNavBar title={title} />
          </div>

          <section className={styles.content} >
            {children}
          </section>
        </main>
      </Flexbox>
    </>
  );
};

export default PageStructure;
