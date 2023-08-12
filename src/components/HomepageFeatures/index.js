import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Value',
    Svg: require('@site/static/img/undraw_investing.svg').default,
    description: (
      <>
       We care about value creation, and that is why we are pasionate on how to deliver quality value.
      </>
    ),
  },
  {
    title: 'Grow',
    Svg: require('@site/static/img/undraw_gardening.svg').default,
    description: (
      <>
        We want to share and learn from others to improve the industry and its practices.
      </>
    ),
  },
  {
    title: 'Innovate',
    Svg: require('@site/static/img/undraw_innovative.svg').default,
    description: (
      <>
        We also have fun as breaking the glass sealing and creating new thingsis part of evolution.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
