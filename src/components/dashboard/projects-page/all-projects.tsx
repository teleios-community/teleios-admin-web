import { Dispatch, lazy, SetStateAction, useEffect, useState } from 'react';
import { appAxios } from '../../../api/axios';
import Pagination from '../../../common/pagination';
import SearchInput from '../../../common/search-input';
import TabSwitch from '../../../common/tab-switch';
import Table from '../../../common/table';
import { sendCatchFeedback } from '../../../functions/feedback';
import { useDebounce } from '../../../hooks/useDebounce';
import { ProjectType } from '../../../types/data';
import { LearningPathType } from '../../../types/learning-path';
import ProjectTotal from './project-total';

const ProjectDetailsModal = lazy(
  () => import('../../../components/dashboard/projects-page/project-details-modal')
);
const DeleteProjectModal = lazy(
  () => import('../../../components/dashboard/projects-page/delete-project-modal')
);
const AddProjectModal = lazy(
  () => import('../../../components/dashboard/projects-page/add-project-modal')
);

const tableHeaders = [
  'name',
  'category',
  'maximum_xp_assignable',
  'updated_at',
  'created_at',
  'tableAction',
];
const AllProjects = ({
  addModal,
  setAddModal,
}: {
  addModal: boolean;
  setAddModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [selectedTab, setSelectedTab] = useState<string>('All');
  const [detailsModal, setDetailsModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selected, setSelected] = useState<ProjectType | undefined>(undefined);
  const [allData, setAllData] = useState<[]>([]);
  const [learningPaths, setLearningPaths] = useState<LearningPathType[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const debouncedSearchQuery = useDebounce(searchQuery, 1000);

  const getLearningPaths = async () => {
    try {
      const response = await appAxios.get(
        `/curriculum/learning-paths?page=1&page_size=${20}`
      );
      setLearningPaths(response.data.data.items);
    } catch (error) {
      sendCatchFeedback(error);
    }
  };
  useEffect(() => {
    getLearningPaths();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);

      const queryParams: Record<string, string> = {
        page: String(page),
      };

      if (selectedTab !== 'All') {
        const learningPathId = learningPaths.find(
          (item) => item.title === selectedTab
        )?.id;

        if (learningPathId) {
          queryParams.learning_path_id = String(learningPathId);
        }
      }

      if (debouncedSearchQuery?.trim()) {
        queryParams.search = debouncedSearchQuery.trim();
      }

      const response = await appAxios.get(
        `/projects/admins?${new URLSearchParams(queryParams).toString()}`
      );

      setAllData(response.data.data.items);
      setTotalResults(response.data.data.total);
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, selectedTab, debouncedSearchQuery]);

  return (
    <>
      <TabSwitch
        tabs={['All', ...(learningPaths ? learningPaths.map((item) => item.title) : [])]}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />

      <ProjectTotal loading={loading} total={totalResults} />
      <div className='my-5'>
        <SearchInput
          value={searchQuery}
          onChange={(value) => setSearchQuery(value)}
          placeholder='Search by title or category'
        />
      </div>
      <Table
        tableHeaders={tableHeaders}
        data={allData}
        loading={loading}
        menuItems={[
          {
            label: 'View details',
            onClick: (data) => {
              setSelected(data);
              setDetailsModal(true);
            },
          },
          {
            label: 'Edit',
            onClick: (data) => {
              setSelected(data);
              setEditModal(true);
            },
          },

          {
            label: 'Delete Project',
            onClick: (data) => {
              setSelected(data);
              setDeleteModal(true);
            },
            style: {
              color: 'var(--error)',
            },
          },
        ]}
      />
      <Pagination page={page} setPage={setPage} totalResults={totalResults} />

      {/* Modals */}
      <ProjectDetailsModal
        closeModal={() => setDetailsModal(false)}
        open={detailsModal}
        selected={selected}
      />
      <DeleteProjectModal
        closeModal={() => setDeleteModal(false)}
        open={deleteModal}
        reload={getData}
        selected={selected}
      />

      <AddProjectModal
        open={addModal}
        closeModal={() => setAddModal(false)}
        reload={getData}
      />
    </>
  );
};

export default AllProjects;
