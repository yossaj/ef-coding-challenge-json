import React from "react";

const WordCountTable = ({ tableContent }) => (
    <div className="table">
        <table className = "words">
            <thead>
                <tr>
                    <th>Word</th>
                    <th>Frequency</th>
                </tr>
            </thead>
            <tbody>
                {tableContent}
            </tbody>
        </table>
    </div>
);

export default WordCountTable;