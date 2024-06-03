import React, { useState } from 'react';
import { Card, Collapse } from 'antd';
import styles from './styles.module.scss';

const { Panel } = Collapse;

const UserCredentials = () => {
  const credentials = [
    { school: '42 Berlin', projects: ['Libft', 'ft_printf', 'get_next_line', 'Born2beroot', 'minitalk', 'push_swap', 'so_long', 'Exam Rank 02', 'Exam Rank 03'] },
    { school: 'Technische Universität München', projects: ['Credential 1', 'Credential 2', 'Credential 3'] },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.profileTitle}>Credentials</h2>
      <Card className={styles.card}>
        <Collapse>
          {credentials.map((credential, index) => (
            <Panel header={credential.school} key={index}>
              <ul>
                {credential.projects.map((project, idx) => (
                  <li key={idx}>{project}</li>
                ))}
              </ul>
            </Panel>
          ))}
        </Collapse>
      </Card>
    </div>
  );
};

export default UserCredentials;
