import React from 'react';
import { Card } from 'antd';
import styles from './styles.module.scss';

const UserOrganisations = () => {
  const organisations = [
    { school: '42 Berlin', id: '0x0330..D020' },
    { school: 'Technische Universität München', id: '0x3234..A50D' },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.profileTitle}>Organisations</h2>
      <div className={styles.cardContainer}>
        {organisations.map((organisation, index) => (
          <Card key={index} className={styles.card}>
            <div className={styles.textContainer}>
              <span className={styles.school}>{organisation.school}</span>
              <span className={styles.id}>({organisation.id})</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserOrganisations;
