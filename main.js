var _ = require('lodash');

var deepObject = {
  prop1: 1,
  prop2: '2',
  prop3: false,
  prop4: {
    prop5: [5, 6, { id: 7, other: [8, 9]}]
  },
  prop6: [6, 7, 8, 9, 10]
};

const copyWithEquals = deepObject;
console.log(copyWithEquals.prop6 === deepObject.prop6); // true -- Not a copy (same reference)

const copyWithJSONStringify = JSON.parse(JSON.stringify(deepObject));
console.log(deepObject.prop6 === copyWithJSONStringify.prop6); // false -- Deep copy (different references)

const copyWithLodashClone = _.clone(deepObject)
console.log(copyWithLodashClone.prop6 === deepObject.prop6); // false -- Deep copy (different reference)

deepObject.prop1 = 2;
copyWithJSONStringify.prop6[0] = 1; // Only this copied array will be changed

copyWithLodashClone.prop6[0] = 2; // Only this copied array will be changed

console.log('Original object:');
console.log(deepObject);
console.log('Copy with equals:');
console.log(copyWithEquals);
console.log('Deep copy with JSON Stringify:');
console.log(copyWithJSONStringify);
console.log('Deep copy with Lodash clone:');
console.log(copyWithLodashClone); 

//b si c


const deepCopyRecursively = (inObject) => {
  let outObject, value, key;

  if (typeof inObject !== "object" || inObject === null) {
    return inObject;
  }

  outObject = Array.isArray(inObject) ? [] : {};

  for (key in inObject) {
    value = inObject[key];

    // Recursively (deep) copy for nested objects, including arrays
    outObject[key] = deepCopyRecursively(value);
  }

  return outObject;
}

const deepCopiedRecursively = deepCopyRecursively(deepObject);

deepObject.prop2 = '3'; // Will affect the original only
console.log(`deepObject.prop2 = '3' // Will affect the original only`)

console.log('Recursively (deep) copy for nested objects, including arrays:');
console.log(deepCopiedRecursively);
