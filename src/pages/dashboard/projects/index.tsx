import { AddCircle } from 'iconsax-react';
import { useState } from 'react';
import Button from '../../../common/button';
import PageHeader from '../../../common/page-header';
import AllProjects from '../../../components/dashboard/projects-page/all-projects';

const ProjectsPage = () => {
  const [addModal, setAddModal] = useState(false);

  return (
    <div>
      <PageHeader
        pageTitle='Projects'
        pageActions={
          <Button onClick={() => setAddModal(true)}>
            <AddCircle />
            Create new project
          </Button>
        }
      />
      <AllProjects addModal={addModal} setAddModal={setAddModal} />
    </div>
  );
};

export default ProjectsPage;
