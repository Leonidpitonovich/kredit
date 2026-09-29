import photo1 from "./assets/reviews/1.jpg";
import photo2 from "./assets/reviews/2.jpg";
import photo3 from "./assets/reviews/3.jpg";
import photo4 from "./assets/reviews/4.jpg";
import photo5 from "./assets/reviews/5.jpg";

const REVIEW_PHOTOS = {
  1: photo2,
  2: photo1,
  3: photo3,
  4: photo4,
  5: photo5,
};

export function photoForReview(id) {
  return REVIEW_PHOTOS[id] ?? null;
}
