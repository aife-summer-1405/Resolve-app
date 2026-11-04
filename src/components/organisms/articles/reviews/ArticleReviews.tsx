import AddArticleReview from "./AddArticleReview";
import ArticleReviewList from "./ArticleReviewList";


export default function ArticleReviews() {
  return (
    <section className="mt-16 flex flex-col gap-10">
      <div className="flex items-center justify-between rounded-[15px] bg-[#303030] px-5 py-3">
        <span className="text-sm font-medium text-white">
          پیام و نظرات کاربران
        </span>

        <span className="flex size-7 items-center justify-center rounded-full border border-white">
          ☰
        </span>
      </div>

      <AddArticleReview />

      <ArticleReviewList />
    </section>
  );
}