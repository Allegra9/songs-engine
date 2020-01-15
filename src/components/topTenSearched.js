import React from "react";

const sortByFrequencyAndRemoveDuplicates = array => {
  let frequency = {},
    value;

  // compute frequencies of each value
  for (let i = 0; i < array.length; i++) {
    value = array[i];
    if (value in frequency) {
      frequency[value]++;
    } else {
      frequency[value] = 1;
    }
  }

  // make array from the frequency object to de-duplicate
  let uniques = [];
  for (value in frequency) {
    uniques.push(value);
  }

  // sort the uniques array in descending order by frequency
  const compareFrequency = (a, b) => {
    return frequency[b] - frequency[a];
  };

  const topSearches = uniques.sort(compareFrequency);

  if (topSearches.length > 10) {
    topSearches.length = 10;
  }

  return topSearches;
};

const TopTenSearched = ({
  searchQueryArray,
  handleTopTenSearched,
  showTopTenSearched
}) => {
  const topSearchesArray = sortByFrequencyAndRemoveDuplicates(searchQueryArray);
  return (
    <>
      {searchQueryArray.length >= 10 ? (
        <div>
          <button onClick={handleTopTenSearched} style={{ cursor: "pointer" }}>
            {showTopTenSearched
              ? "Close Top 10 searched"
              : "Show Top 10 searched"}
          </button>
          {showTopTenSearched
            ? searchQueryArray &&
              topSearchesArray.map(item => <div key={item}>{item}</div>)
            : null}
        </div>
      ) : null}
    </>
  );
};

export default TopTenSearched;
