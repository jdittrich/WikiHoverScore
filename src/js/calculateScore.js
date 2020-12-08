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

export default hooverFromEditCounts;    
export {
    hooverFromEditCounts,
    getSumOfArray,
    getAverageOfArray,
    getSumDifferencesToMean
}       
