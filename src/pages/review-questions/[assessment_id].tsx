import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ReviewQuestionsPage = () => {
  const router = useRouter();
  const { assessment_id } = router.query;

  useEffect(() => {
    if (assessment_id) {
      // Redirect to assessment page with query parameters
      router.replace({
        pathname: '/assessment',
        query: {
          assessment_id,
          tab: 'review-questions',
        },
      });
    }
  }, [assessment_id, router]);

  // Return null or loading state while redirecting
  return (
    <div className="flex justify-center items-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-800"></div>
      <span className="ml-2">Redirecting...</span>
    </div>
  );
};

export default ReviewQuestionsPage;
