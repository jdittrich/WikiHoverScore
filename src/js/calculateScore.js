
// we probably could do some fun meomization here, which would spare us caching?
// best to do it implicity: if called without parameter, it is calculated?

const getSumOfArray = (list) => list.reduce((prev,curr) => prev + curr)
const getAverageOfArray = (list) => getSumOfArray(list) / list.length;
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


export {
    hooverFromEditCounts,
    getSumOfArray,
    getAverageOfArray,
    getSumDifferencesToMean
}       
