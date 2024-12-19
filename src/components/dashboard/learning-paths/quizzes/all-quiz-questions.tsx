import { Dispatch, SetStateAction } from 'react';
import Table from '../../../../common/table';
import { QuizQuestionType } from '../../../../types/learning-path';

const AllQuizQuestions = ({
  allData,
  loading,
  setSelected,
  setReviewModal,
}: {
  allData: [];
  loading: boolean;
  setSelected: Dispatch<SetStateAction<QuizQuestionType | undefined>>;
  setReviewModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const tableHeaders = ['content', 'correct_answer', 'options', 'status', 'tableAction'];

  return (
    <>
      <Table
        tableHeaders={tableHeaders}
        data={allData}
        loading={loading}
        menuItems={[
          {
            label: 'Review',
            onClick: (data) => {
              setSelected(data);
              setReviewModal(true);
            },
          },
        ]}
      />
    </>
  );
};

export default AllQuizQuestions;
