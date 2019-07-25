import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ReviewWordCloud from './components/ReviewWordCloud'

test('Dummy Test', ()=>{
  expect(true).toBeTruthy();
})

test('<ReviewWordCloud> getReviewText short', () => {
  const reviewWordCloud = new ReviewWordCloud()
  const result = reviewWordCloud.getReviewText(["---...hey,,..    --   "])
  expect(result).toBe('hey');
})

test('<ReviewWordCloud> getReviewText long', () => {
  const reviewWordCloud = new ReviewWordCloud()
  const result = reviewWordCloud.getReviewText(['-th.,0809---,,,un-2der0 921m..,uf_-f.-_ler '])
  expect(result).toBe('thunder muffler');
})

test('<ReviewWordCloud> getReviewText actual json', () => {
  const reviewWordCloud = new ReviewWordCloud()
  const result = reviewWordCloud.getReviewText(["A great product for daily use", "Great price. Takes about 10days for delivery", "Excellent value - will buy again", "Fine, I always use this, was as expected", "Good value", "excellent product, good value", "good"])
  expect(result).toBe('a great product for daily use great price takes about days for delivery excellent value  will buy again fine i always use this was as expected good value excellent product good value good');
})

test('<ReviewWordCloud> filterReviews', () => {
  const reviewWordCloud = new ReviewWordCloud()
  const result = reviewWordCloud.getReviewText(["A great product for daily use", "Great price. Takes about 10days for delivery", "Excellent value - will buy again", "Fine, I always use this, was as expected", "Good value", "excellent product, good value", "good"])
  expect(result).toBe('a great product for daily use great price takes about days for delivery excellent value  will buy again fine i always use this was as expected good value excellent product good value good');
})

test('<ReviewWordCloud> filterReviews basic', () => {
  const reviewWordCloud = new ReviewWordCloud()
  const result = reviewWordCloud.filterReviews('a a a a a a a a a a b b b')
  expect(result).toStrictEqual([{ "text": "a", "value": 10 }, { "text": "b", "value": 3}]);
})

test('<ReviewWordCloud> filterReviews', () => {
  const reviewWordCloud = new ReviewWordCloud()
  const result = reviewWordCloud.filterReviews('good value excellent product good value good')
  expect(result).toStrictEqual([{ "text": "good", "value": 3 }, { "text": "value", "value": 2 }, { "text": "excellent", "value": 1 }, { "text": "product", "value": 1 }]);
})