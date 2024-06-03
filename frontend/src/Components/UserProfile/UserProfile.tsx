import React from 'react';
import { User } from '../../App';
import styles from './styles.module.scss';
import { Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

interface UserProfileProps {
  user: User;
  onLogout: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onLogout }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.profileTitle}>Profile</h2>
      <div className={styles.profileCard}>
        <img src={user.profileImage} alt="Profile" className={styles.profileImage} />
        <h3>{user.name}</h3>
        <div className={styles.ethereumAddress}>
          0xD56BB2...2654A31322F7FD020
        </div>
      </div>
      <Button
        type="primary"
        icon={<LogoutOutlined />}
        className={styles.logoutButton}
        onClick={onLogout}
      >
        Logout
      </Button>
    </div>
  );
};

export default UserProfile;
