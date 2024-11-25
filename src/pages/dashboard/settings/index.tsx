import PageHeader from 'common/page-header';
import TabSwitch from 'common/tab-switch';
import ProfileView from 'components/dashboard/settings/profile-view';
import { useState } from 'react';

const SettingsPage = () => {
  const [selectedTab, setSelectedTab] = useState<string>('Profile');

  return (
    <>
      <PageHeader pageTitle='Settings' />
      <TabSwitch
        tabs={['Profile']}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      {selectedTab === 'Profile' && <ProfileView />}
    </>
  );
};

export default SettingsPage;
