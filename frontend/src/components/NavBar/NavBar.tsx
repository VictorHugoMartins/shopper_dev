import React from "react";

//Import components
import Flexbox from "~/components/Flexbox/Flexbox";

import styles from './navBar.module.scss';

interface LocalNavBarProps {
  title: string;
}

const LocalNavBar: React.FC<LocalNavBarProps> = ({ title }) => {
  return (
    <nav
      className={`${styles.siteNavbar} ${styles.noFixed}`}
    >

      <Flexbox flexDirection="column">
        <Flexbox align="center" spacing="m">
          <h2>{title}</h2>
        </Flexbox>
      </Flexbox>
    </nav >
  );
};

export default LocalNavBar;
