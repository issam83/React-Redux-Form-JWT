import { createSelector } from 'reselect'
import lodash from 'lodash'

export function getIntegerList(state) {
    return state.ressource.ressourceList
}

export function getContainsOneList(state) {
    return state.ressource.ressourceList.filter( r => r.toString().indexOf('1') > -1)
}

export function getPrimeNumberList(state) {
    return state.ressource.ressourceList.filter(r => isPrimeNumber(r))
}

function isPrimeNumber(value){
    for (let i = 2; i < value; i++){
        if(value % i === 0){
            return false
        }
    }
    return value > 1
}

export const getSpecialNumberList = createSelector(
    getContainsOneList,
    getPrimeNumberList,
    (containsOneList, primeNumberList) => {
        return lodash.intersection(containsOneList,primeNumberList)
    }
)