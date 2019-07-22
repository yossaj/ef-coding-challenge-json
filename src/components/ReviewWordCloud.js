import React, { Fragment } from 'react';
import { render } from 'react-dom';
import WordCloud from 'react-d3-cloud';
import WordCountTable from './WordCountTable'
const HTMLParser = require('fast-html-parser');


class ReviewWordCloud extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            reviews: []
        }
        this.filterReviews = this.filterReviews.bind(this)
        this.getReviewText = this.getReviewText.bind(this)
        this.sortByCount = this.getReviewText.bind(this)
    }

    componentDidMount() {
        fetch("https://raw.githubusercontent.com/Jordanddick/ef-coding-challenge/master/reviews.json")
            .then(res => res.json())
            .then((data) => {
                const reviews = this.getReviewText(data.reviews)
                const reviewData = this.filterReviews(reviews)
                this.setState({ reviews: reviewData })
            })
    }

    getReviewText(reviewsArray) {
        console.log(reviewsArray)
        let reviews = ""
        for (let review of reviewsArray) {
            let rev = review.replace(".", "")
            rev = rev.replace(/,|!|_|&#39;|-|10/g,'')
            reviews += " " + rev.toLowerCase()
        }
        console.log(reviews)
        return reviews
    }

    filterReviews(reviews) {
        const reviewArray = reviews.split(" ")
        const wordOccurrence = []
        for (let word of reviewArray) {
            if (wordOccurrence[word] == undefined) {
                wordOccurrence[word] = 1
            } else {
                wordOccurrence[word] += 1
            }
        }
        const uniqueWords = Object.keys(wordOccurrence)
        const uniqueWordAndValue = []
        for (let word of uniqueWords) {
            uniqueWordAndValue.push({ text: word, value: wordOccurrence[word] })
        }
        return uniqueWordAndValue
    }


    render() {
        const data = this.state.reviews
        const fontSizeMapper = word => Math.log2(word.value) * 40;
        const rotate = word => word.value % 360;

        const tableData = data.map((wordVal, index) => {
            if (wordVal.text !==''){
            return (
                < tr key={index}>
                    <td>{wordVal.text}</td>
                    <td>{wordVal.value}</td>
                </tr >
            )
            }
        })


        return (
            <Fragment>
                <WordCountTable tableContent={tableData} />
                <WordCloud
                    data={data}
                    fontSizeMapper={fontSizeMapper}
                />
            </Fragment>
        );
    }
}

export default ReviewWordCloud;

