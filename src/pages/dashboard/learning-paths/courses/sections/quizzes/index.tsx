import { AddCircle } from 'iconsax-react';
import { lazy, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { appAxios } from '../../../../../../api/axios';
import Breadcrumb from '../../../../../../common/breadcrumb';
import Button from '../../../../../../common/button';
import LoadingIndicator from '../../../../../../common/loading-indicator';
import NoDataComponent from '../../../../../../common/no-data-component';
import PageHeader from '../../../../../../common/page-header';
import AllQuizQuestions from '../../../../../../components/dashboard/learning-paths/quizzes/all-quiz-questions';
import { sendCatchFeedback } from '../../../../../../functions/feedback';
import { RoutePaths } from '../../../../../../routes/route-paths';
import { QuizQuestionType, SectionType } from '../../../../../../types/learning-path';

const GenerateQuizQuestionsModal = lazy(
  () =>
    import(
      '../../../../../../components/dashboard/learning-paths/quizzes/generate-quiz-questions'
    )
);
const ReviewQuizQuestionModal = lazy(
  () =>
    import(
      '../../../../../../components/dashboard/learning-paths/quizzes/review-quiz-question'
    )
);

const SectionQuizzesPage = () => {
  const [generateModal, setGenerateModal] = useState(false);
  const [allData, setAllData] = useState<[]>([]);
  const [loading, setLoading] = useState(true);
  const params = useParams<{ courseId: string; sectionId: string }>();
  const [reviewModal, setReviewModal] = useState(false);
  const [selected, setSelected] = useState<QuizQuestionType | undefined>(undefined);
  const [infoDetails, setInfoDetails] = useState<SectionType | undefined>(undefined);

  const getData = async () => {
    try {
      setLoading(true);

      const response = await appAxios.get(`/quiz/questions/pending-review?limit=100`);

      setAllData(response.data);
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };

  const getInfoDetails = async () => {
    try {
      setLoading(true);

      const response = await appAxios.get(
        `/curriculum/courses/${params.courseId}/sections/${params.sectionId}`
      );

      setInfoDetails(response.data.data);
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
    getInfoDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Breadcrumb
        links={[
          {
            label: 'Learning paths',
            link: RoutePaths.LEARNING_PATHS,
          },
          {
            label: loading
              ? '...'
              : infoDetails?.title
              ? `${infoDetails.title} Quiz Questions`
              : 'Section Quiz Questions',
          },
        ]}
      />
      <PageHeader
        pageTitle={
          loading
            ? '...'
            : infoDetails?.title
            ? `${infoDetails.title} Quiz Questions`
            : 'Section Quiz Questions'
        }
        pageActions={
          <Button onClick={() => setGenerateModal(true)}>
            <AddCircle />
            Generate new questions
          </Button>
        }
      />
      {loading ? (
        <LoadingIndicator />
      ) : allData && allData.length > 0 ? (
        <AllQuizQuestions
          allData={allData}
          loading={loading}
          setSelected={setSelected}
          setReviewModal={setReviewModal}
        />
      ) : (
        <NoDataComponent
          title='No Questions Yet'
          description='All questions added would appear here'
          buttonText='Generate new questions'
          onClickAction={() => setGenerateModal(true)}
        />
      )}

      <GenerateQuizQuestionsModal
        open={generateModal}
        closeModal={() => setGenerateModal(false)}
        reload={getData}
      />

      <ReviewQuizQuestionModal
        open={reviewModal}
        closeModal={() => setReviewModal(false)}
        reload={getData}
        selected={selected}
      />
    </>
  );
};

export default SectionQuizzesPage;
