/**
 * @param {number[]} list 
 * @returns {number} sum of array
 */
const getSumOfArray = (list) => list.reduce((prev,curr) => prev + curr)

/**
 * @param {number[]} list 
 * @returns {number} average of array
 */
const getAverageOfArray = (list) => getSumOfArray(list) / list.length;

/**
 * @param {number[]} list 
 * @param {number} [cachedMean] - optional: provide mean, so it does not need to be recalculated
 * @returns {number} sum of all   differences of list entries to the mean of the whole list. 
 */
const getSumDifferencesToMean = (list, cachedMean) => {
    let mean = cachedMean || getAverageOfArray(list);
    return list.reduce((prev,curr)=> prev + Math.abs(curr-mean),0)  
};

/**
 * @param {number[]} editCounts - array of edit counts of different users 
 * @returns {number} the hoover score
 * 
 * As we do not need to know the names of the acounts that made the edits
 * this can be just an array of edit counts
 */
const hooverFromEditCounts = function(editCounts){

    const averageEditCount = getAverageOfArray(editCounts);
    const sumOfEdits = getSumOfArray(editCounts);
    const sumOfDifferencesToMean = getSumDifferencesToMean(editCounts,averageEditCount);
    
    const hoover = 0.5*(sumOfDifferencesToMean/sumOfEdits)

    return hoover;
}


/**
 * @param {object[]} aggregatedCounts - array of edit counts, aggregated by frequency
 * @param {number} aggregatedCounts[].edits - the edit count
 * @param {number} aggregatedCounts[].frequency - how often that edit count is.
 * @returns {number} the hoover score
 * 
 * This function processes the aggregated and shorter form to 
 * store edit count data: a certain edit count (edits) and how many accounts have this edit count (frequency)
 * 
 */
const hooverFromAggregatedCounts = function (aggregatedCounts) {
    const sumOfAccounts = aggregatedCounts.reduce((prev, curr) => prev + (curr.frequency), 0);
    const sumOfEdits = aggregatedCounts.reduce((prev, curr) => prev + (curr.edits * curr.frequency),0);
    const averageEditCount = sumOfEdits / sumOfAccounts;
    const sumOfDifferencesToMean = aggregatedCounts.reduce((prev, curr) => prev + ((Math.abs(curr.edits - averageEditCount)) * curr.frequency),0);

    const hoover = 0.5 * (sumOfDifferencesToMean / sumOfEdits);

    return hoover;
}


export {
    hooverFromAggregatedCounts,
    hooverFromEditCounts,
    getSumOfArray,
    getAverageOfArray,
    getSumDifferencesToMean
}       
